import React, { Component } from 'react'

class MenuItem extends Component {
  static defaultProps = {
    visible: true
  }

  render () {
    const { visible, children } = this.props
    return visible
      ? <li className='MenuItem'>
        {children}
      </li>
      : null
  }
}

export default MenuItem
