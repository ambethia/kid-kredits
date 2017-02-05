import React, { Component } from 'react'
import Icon from './Icon'
import Adjustment from './Adjustment'
import ui from '../ui'

class Kid extends Component {

  _add = () => {
    const { id, kredits } = this.props
    ui.displayModal(<Adjustment mode='add' kid={{ id, kredits }} />)
  }

  _remove = () => {
    const { id, kredits } = this.props
    ui.displayModal(<Adjustment mode='remove' kid={{ id, kredits }} />)
  }

  render () {
    const { name, kredits } = this.props
    return <div className='Kid'>
      <button className='iconButton down' onClick={this._remove}>
        <Icon glyph='minus-square' opt='3x' />
      </button>
      <div className='info'>
        <h3>{name}</h3>
        <h4>{kredits}</h4>
      </div>
      <button className='iconButton up' onClick={this._add}>
        <Icon glyph='plus-square' opt='3x' />
      </button>
    </div>
  }
}

export default Kid
