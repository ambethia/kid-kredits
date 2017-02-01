import React, { Component } from 'react'
import withAuth from '../utils/withAuth'

@withAuth
class SessionButton extends Component {

  handleClick = () => {
    const { auth } = this.props
    auth.isSignedIn
      ? auth.signOut()
      : auth.signIn()
  }

  render () {
    const { auth } = this.props
    return <button onClick={this.handleClick}>
      {auth.isSignedIn ? 'Sign Out' : 'Sign In'}
    </button>
  }
}

export default SessionButton
