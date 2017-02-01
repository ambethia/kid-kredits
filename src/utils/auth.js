import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events'
import { AUTH0 } from './config'

export default class Auth extends EventEmitter {

  constructor () {
    super()

    // Re-hydrate session on browser load/reload
    this._token = JSON.parse(window.localStorage.getItem('auth:token'))
    this._profile = JSON.parse(window.localStorage.getItem('auth:profile'))

    const options = {
      // TODO: Customize Auth0 Widget
    }

    this.lock = new Auth0Lock(AUTH0.CLIENT_ID, AUTH0.CLIENT_DOMAIN, options)
    this.lock.on('authenticated', authResult => {
      this.token = authResult.idToken
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) console.warn(error)
        this.profile = profile
      })
    })

    this.on('change', () => {
      window.localStorage.setItem('auth:token', this.token)
      window.localStorage.setItem('auth:profile', JSON.stringify(this.profile))
    })
  }

  signIn () { this.lock.show() }

  signOut () {
    this.token = null
    this.profile = null
  }

  get isSignedIn () { return !!this.token }

  get token () { return this._token }
  set token (newToken) {
    this._token = newToken
    this.emit('change')
  }

  get profile () { return this._profile }
  set profile (newProfile) {
    this._profile = newProfile
    this.emit('change')
  }
}

export const auth = new Auth()
