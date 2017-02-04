import React, { Component } from 'react'
import withAuth from '../utils/withAuth'

@withAuth
class SignInButton extends Component {

  _signIn = () => {
    this.props.auth.signIn()
  }

  render () {
    return <button className='SignInButton btn' onClick={this._signIn}>
      Sign In
    </button>
  }
}

export default SignInButton
