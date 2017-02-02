import React, { Component } from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import withAuth from '../utils/withAuth'

import {
  Home,
  Layout,
  FamilyList,
  FamilyEdit
} from '.'

@withAuth
class App extends Component {

  requireAuth = (nextState, replace) => {
    if (!this.props.auth.isSignedIn) {
      replace({ pathname: '/' })
    }
  }

  render () {
    return <ApolloProvider client={this.props.client.apollo}>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Home} />
          <Route path='families' component={FamilyList} onEnter={this.requireAuth}>
            <Route path=':id/edit' component={FamilyEdit} />
          </Route>
        </Route>
      </Router>
    </ApolloProvider>
  }
}

export default App
