import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Icon from './Icon'
import ui from '../ui'

@observer
class Modal extends Component {
  _dismiss = () => {
    ui.dismissModal()
  }

  render () {
    if (ui.modal) {
      return (
        <div className='Modal'>
          <div className='card'>
            <header>
              <button onClick={this._dismiss}>
                <Icon glyph='times-circle' />
              </button>
            </header>
            <div className='content'>
              {ui.modal}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Modal
