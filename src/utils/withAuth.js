import React, { Component } from 'react'
import { observer } from 'mobx-react'
import auth from './auth'
import client from './client'

const withAuth = (ComposedComponent) => {
  const Observed = observer(ComposedComponent)
  return class AuthenticatedComponent extends Component {

    render () {
      return <Observed
        {...this.props}
        auth={auth}
        client={client}
      />
    }
  }
}

export default withAuth
