import React, { Component } from 'react'
import { Link } from 'react-router'
import DevTools from 'mobx-react-devtools'
import Menu from './Menu'
import Modal from './Modal'
import Icon from './Icon'
import ui from '../ui'

export default class Layout extends Component {

  _displayMenu = () => {
    ui.displayMenu()
  }

  render () {
    return <div className='Layout'>
      <header>
        <div className='main'>
          <h1><Link to='/'>Kid Kredits</Link></h1>
        </div>
        <button className='iconButton' onClick={this._displayMenu}>
          <Icon glyph='bars' opt='3x' />
        </button>
      </header>
      <main>
        {this.props.children}
      </main>
      <footer>
        <a href='https://github.com/ambethia/kid-kredits'><Icon glyph='github-alt' /></a>
      </footer>
      <Menu />
      <Modal />
      <DevTools />
    </div>
  }
}
