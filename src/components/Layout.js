import React, { Component } from 'react'
import { Link } from 'react-router'
import SessionButton from './SessionButton'

export default class Layout extends Component {

  render () {
    return <div>
      <header>
        <h1>Kid Kredits</h1>
        <SessionButton />
      </header>
      <nav>
        <ul>
          <li><Link to='/families'>Families</Link></li>
        </ul>
      </nav>
      <main>
        {this.props.children}
      </main>
    </div>
  }
}
