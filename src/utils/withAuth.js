import React, { Component } from 'react'
import { auth } from './auth'

const withAuth = (ComposedComponent) => {
  return class AuthenticatedComponent extends Component {

    componentDidMount () {
      // Ensure a re-render when our auth state changes.
      auth.on('change', () => this.forceUpdate())
    }

    render () {
      return <ComposedComponent {...this.props} auth={auth} />
    }
  }
}

export default withAuth
