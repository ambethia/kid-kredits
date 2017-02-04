import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import withAuth from '../utils/withAuth'
import MenuItem from './MenuItem'
import Icon from './Icon'
import SignOutButton from './SignOutButton'
import ui from '../ui'

@withAuth
class Menu extends Component {

  _dismiss = (event) => {
    if (event.target === event.currentTarget) {
      ui.dismissMenu()
    }
  }

  _dismissButton = () => {
    ui.dismissMenu()
  }

  render () {
    const { auth } = this.props
    return <div className={cx('Menu', { open: ui.menu })} onClick={this._dismiss}>
      <div className='drawer'>
        <header>
          <button onClick={this._dismissButton} className='iconButton'>
            <Icon glyph='chevron-left' opt='2x' />
          </button>
        </header>
        <nav>
          <ul>
            <MenuItem>
              <Link to='/' onClick={this._dismiss}>Home</Link>
            </MenuItem>
            <MenuItem visible={auth.isSignedIn}>
              <Link to='/families' onClick={this._dismiss}>Manage Families</Link>
            </MenuItem>
            <MenuItem visible={auth.isSignedIn}>
              <SignOutButton />
            </MenuItem>
          </ul>
        </nav>
      </div>
    </div>
  }
}

export default Menu
