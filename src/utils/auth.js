import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import { EventEmitter } from 'events'
import { AUTH0 } from './config'
export default class Auth extends EventEmitter {

  constructor () {
    super()

    const options = {
      // TODO: Customize Auth0 Widget
      auth: {
        redirectUrl: `${window.location.protocol}//${window.location.host}/`,
        responseType: 'token'
      }
    }

    // Re-hydrate session on browser load/reload
    this._token = window.localStorage.getItem('auth:token')
    this._profile = JSON.parse(window.localStorage.getItem('auth:profile'))

    this.lock = new Auth0Lock(AUTH0.CLIENT_ID, AUTH0.CLIENT_DOMAIN, options)
    this.lock.on('authenticated', ({ idToken }) => {
      this.token = idToken
      this.lock.getProfile(idToken, (error, profile) => {
        if (error) console.warn(error)
        this.profile = profile
        this.emit('change')
      })

      // Return to the URL they were on before authenticating.
      const returnTo = window.localStorage.getItem('auth:returnTo')
      if (returnTo) {
        browserHistory.push(returnTo)
        window.localStorage.removeItem('auth:returnTo')
      }
    })

    this.on('change', () => {
      if (this.isSignedIn) {
        window.localStorage.setItem('auth:token', this.token)
        window.localStorage.setItem('auth:profile', JSON.stringify(this.profile))
      } else {
        window.localStorage.removeItem('auth:token')
        window.localStorage.removeItem('auth:token')
      }
    })
  }

  signIn () {
    // Save the current URL so we can return to it after authenticating.
    window.localStorage.setItem('auth:returnTo', window.location.pathname)
    this.lock.show()
  }

  signOut () {
    this.token = null
    this.profile = null
    this.emit('change')
  }

  get isSignedIn () { return !!this.token }

  get token () { return this._token }
  set token (newToken) {
    this._token = newToken
  }

  get profile () { return this._profile }
  set profile (newProfile) {
    this._profile = newProfile
  }
}

export const auth = new Auth()
