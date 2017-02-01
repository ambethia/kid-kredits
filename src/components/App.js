import React, { Component } from 'react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import {
  Home,
  Layout
} from '.'

export default class App extends Component {

  render () {
    return <Router history={browserHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  }
}
