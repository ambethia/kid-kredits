import React, { Component } from 'react'

class Family extends Component {

  render () {
    return <div className='Family'>
      <h2>{this.props.name}</h2>
    </div>
  }
}

export default Family
