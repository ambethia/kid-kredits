import React, { Component } from 'react'
import withAuth from '../utils/withAuth'
import Icon from './Icon'
import ui from '../ui'

@withAuth
class SignInButton extends Component {

  _signOut = () => {
    this.props.auth.signOut()
    ui.dismissMenu()
  }

  render () {
    return <button
      className='SignOutButton iconButton'
      onClick={this._signOut}>
      <Icon glyph='sign-out' opt='2x' />
    </button>
  }
}

export default SignInButton
