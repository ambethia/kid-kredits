import React, { Component } from 'react'
import { Link } from 'react-router'

class NewUserCallToAction extends Component {

  render () {
    return <div className='NewUserCallToAction'>
      <h2>Welcome!</h2>

      <p><Link to='/families' className='btn'>Let's Get Started!</Link></p>
    </div>
  }
}

export default NewUserCallToAction
