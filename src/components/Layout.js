import React, { Component } from 'react'
import SessionButton from './SessionButton'
import Menu from './Menu'
import Modal from './Modal'
import ui from '../ui'

export default class Layout extends Component {

  _displayMenu = () => {
    ui.displayMenu()
  }

  render () {
    return <div>
      <header>
        <h1>Kid Kredits</h1>
        <SessionButton />
        <button onClick={this._displayMenu}>Menu</button>
      </header>
      <main>
        {this.props.children}
      </main>
      <Menu />
      <Modal />
    </div>
  }
}
