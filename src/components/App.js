import React, { Component } from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import withAuth from '../utils/withAuth'
import Home from './Home'
import Layout from './Layout'
import FamilyList from './FamilyList'

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
          <Route path='families' component={FamilyList} onEnter={this.requireAuth} />
        </Route>
      </Router>
    </ApolloProvider>
  }
}

export default App
