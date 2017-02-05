import Auth0Lock from 'auth0-lock'
import IdTokenVerifier from 'idtoken-verifier'
import { browserHistory } from 'react-router'
import { observable, autorun, computed } from 'mobx'
import { AUTH0 } from './config'

class Auth {
  @observable token
  @observable profile

  constructor () {
    const options = {
      // TODO: Customize Auth0 Widget
      auth: {
        redirectUrl: `${window.location.protocol}//${window.location.host}/`,
        responseType: 'token'
      }
    }

    // Re-hydrate session on browser load/reload
    this.token = window.localStorage.getItem('auth:token')
    this.profile = JSON.parse(window.localStorage.getItem('auth:profile'))

    this.lock = new Auth0Lock(AUTH0.CLIENT_ID, AUTH0.CLIENT_DOMAIN, options)
    this.lock.on('authenticated', ({ idToken }) => {
      this.token = idToken
      this.lock.getProfile(idToken, (error, profile) => {
        if (error) {
          this.lock.show({
            flashMessage: {
              type: 'error',
              text: error.error_description
            }
          })
        }
        this.profile = profile
      })

      // Return to the URL they were on before authenticating.
      const returnTo = window.localStorage.getItem('auth:returnTo')
      if (returnTo) {
        browserHistory.push(returnTo)
        window.localStorage.removeItem('auth:returnTo')
      }
    })

    autorun(() => {
      this.checkExpiration()
      if (this.isSignedIn) {
        window.localStorage.setItem('auth:token', this.token)
        window.localStorage.setItem('auth:profile', JSON.stringify(this.profile))
      } else {
        window.localStorage.removeItem('auth:token')
        window.localStorage.removeItem('auth:token')
      }
    })
  }

  checkExpiration () {
    if (this.token) {
      const jwt = new IdTokenVerifier().decode(this.token)
      const now = new Date()
      const exp = new Date(0)
      exp.setUTCSeconds(jwt.payload.exp)
      if (now > exp) this.signOut()
    }
  }

  signIn () {
    // Save the current URL so we can return to it after authenticating.
    window.localStorage.setItem('auth:returnTo', window.location.pathname)
    this.lock.show()
  }

  signOut () {
    this.token = null
    this.profile = null
    browserHistory.push('/')
  }

  @computed get isSignedIn () { return !!this.token }
}

const auth = new Auth()
export default auth
