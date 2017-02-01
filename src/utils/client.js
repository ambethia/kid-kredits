import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { GRAPHQL_ENDPOINT } from './config'
import { auth } from './auth'
import gql from 'graphql-tag'

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

const client = new ApolloClient({ networkInterface })

auth.on('change', () => {
  if (auth.isSignedIn) {
    // After authenticating with Auth0 check in with Graphcool
    client.query({
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
        client.mutate({
          mutation: gql`
            mutation ($token: String!, $name: String!, $email: String!){
              createUser(authProvider: { auth0: { idToken: $token } }, name: $name, email: $email) {
                id
            } }
          `,
          variables: {
            token: auth.token,
            name: auth.profile.name,
            email: auth.profile.email
          }
        })
      }
    })
  } else {
    // We logged out, so clear the store.
    // `client.resetStore()` sometimes throws errors, so we reload:
    //   https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj#3.2-handling-authenticated-status
    window.location.reload()
  }
})

export default client
