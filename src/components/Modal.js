import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ui from '../ui'

@observer
class Modal extends Component {

  _click = () => {
    ui.dismissModal()
  }

  render () {
    if (ui.modal) {
      return <div className='modal'>
        <div className='card'>
          <header>
            <button onClick={this._click}>&times;</button>
          </header>
          <div className='content'>
            {ui.modal}
          </div>
        </div>
      </div>
    } else {
      return null
    }
  }
}

export default Modal
