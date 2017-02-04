import React, { Component } from 'react'
import withAuth from '../utils/withAuth'
import ui from '../ui'

@withAuth
class SignInButton extends Component {

  _signOut = () => {
    this.props.auth.signOut()
    ui.dismissMenu()
  }

  render () {
    return <button className='SignOutButton' onClick={this._signOut}>Sign Out</button>
  }
}

export default SignInButton
