import React, { Component } from 'react'
import Icon from './Icon'

class Kid extends Component {

  render () {
    const { name, kredits } = this.props
    return <div className='Kid'>
      <button className='iconButton down'><Icon glyph='minus' opt='3x' /></button>
      <div className='info'>
        <h3>{name}</h3>
        <h4>{kredits}</h4>
      </div>
      <button className='iconButton up'><Icon glyph='plus' opt='3x' /></button>
    </div>
  }
}

export default Kid
