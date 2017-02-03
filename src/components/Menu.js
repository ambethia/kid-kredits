import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import withAuth from '../utils/withAuth'
import ui from '../ui'

@withAuth
class Menu extends Component {

  _dismiss = (event) => {
    if (event.target === event.currentTarget) {
      ui.dismissMenu()
    }
  }

  render () {
    return <div className={cx('menu', { open: ui.menu })} onClick={this._dismiss}>
      <div className='drawer'>
        <header>
          <button onClick={this._dismiss}>&times;</button>
        </header>
        <nav>
          <ul>
            <li><Link to='/' onClick={this._dismiss}>Home</Link></li>
            <li><Link to='/families' onClick={this._dismiss}>Owned Families</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  }
}

export default Menu
