import React, { Component } from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import client from '../utils/client'

import {
  Home,
  Layout,
  FamilyList
} from '.'

export default class App extends Component {

  render () {
    return <ApolloProvider client={client}>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Home} />
          <Route path='families' component={FamilyList} />
        </Route>
      </Router>
    </ApolloProvider>
  }
}
