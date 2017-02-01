import React, { Component } from 'react'
import { SessionButton } from '.'

export default class Layout extends Component {

  render () {
    return <div>
      <header>
        <h1>Kid Kredits</h1>
        <SessionButton />
      </header>
    </div>
  }
}
