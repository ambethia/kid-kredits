import React, { Component } from 'react'
import { withRouter } from 'react-router'

@withRouter
class Modal extends Component {

  _click = () => {
    const { router, returnTo } = this.props
    if (returnTo) {
      router.push(returnTo)
    } else {
      router.goBack()
    }
  }

  render () {
    return <div className='modal'>
      <div className='card'>
        <header>
          <button onClick={this._click}>&times;</button>
        </header>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default Modal
