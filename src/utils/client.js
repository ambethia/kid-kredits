import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { observable, autorun } from 'mobx'
import { GRAPHQL_ENDPOINT } from './config'
import gql from 'graphql-tag'
import auth from './auth'

class Client {
  @observable userId

  constructor () {
    const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT })
    networkInterface.use([{
      applyMiddleware (req, next) {
        if (!req.options.headers) { req.options.headers = {} }
        if (auth.isSignedIn) {
          req.options.headers.authorization = `Bearer ${auth.token}`
        }
        next()
      }
    }])

    this.apollo = new ApolloClient({
      dataIdFromObject: o => o.id,
      networkInterface
    })

    autorun(() => {
      if (auth.isSignedIn) {
        // After authenticating with Auth0 check in with Graphcool
        this.apollo.query({
          forceFetch: true,
          query: gql`
            query {
              user {
                id
            } }
          `
        }).then(({ data }) => {
          // If this user hasn't signed in before, store them in Graphcool:
          if (!data.user) {
            this.apollo.mutate({
              mutation: gql`
                mutation ($token: String!, $name: String!, $email: String, $image: String!){
                  createUser(authProvider: { auth0: { idToken: $token } }, name: $name, email: $email, image: $image) {
                    id
                } }
              `,
              variables: {
                token: auth.token,
                name: auth.profile.name,
                email: auth.profile.email,
                image: auth.profile.picture
              }
            }).then(({ data }) => {
              this.userId = data.id
            })
          } else {
            this.userId = data.user.id
          }
        })
      } else {
        this.userId = null
        // We logged out, so clear the store.
        if (this.apollo.queryManager) this.apollo.resetStore()
        // `client.resetStore()` sometimes throws errors, so we might need to reload instead:
        //   https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj#3.2-handling-authenticated-status
        // window.location.reload()
      }
    })
  }
}

const client = new Client()
export default client
