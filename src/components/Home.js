import React, { Component } from 'react'
import SignInButton from './SignInButton'
import withAuth from '../utils/withAuth'
import Families from './Families'

@withAuth
export default class Home extends Component {
  content () {
    if (this.props.auth.isSignedIn) {
      return <Families />
    } else {
      return <SignInButton />
    }
  }

  render () {
    return (
      <div className='Home'>
        {this.content()}
      </div>
    )
  }
}
