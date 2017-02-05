import React, { Component } from 'react'
import cx from 'classnames'
import { graphql } from 'react-apollo'
import withAuth from '../utils/withAuth'
import ui from '../ui'

import { mutationCreateAdjustment, queryUserFamilies } from '../graphql'

@withAuth
@graphql(...mutationCreateAdjustment())
class Adjustment extends Component {

  state = {
    kredits: 1,
    reason: ''
  }

  get title () {
    return this.props.mode === 'add' ? 'Give' : 'Take'
  }

  _changedKredits = (event) => {
    this.setState({ kredits: event.target.value })
    this.refs.reason.focus()
  }

  _changedReason = (event) => {
    this.setState({ reason: event.target.value })
  }

  // TODO: Throw a notification if invalid
  _submit = (event) => {
    event.preventDefault()
    const { kredits, reason } = this.state
    if (reason.length > 0) {
      const { kid, mode } = this.props
      const amount = mode === 'add' ? Number(kredits) : Number(kredits) * -1
      const newTotal = kid.kredits + amount
      this.props.mutationCreateAdjustment({
        variables: {
          newTotal,
          amount,
          reason,
          kidId: kid.id,
          userId: this.props.client.userId
        },
        refetchQueries: [{
          query: queryUserFamilies(false),
          variables: { email: this.props.auth.profile.email }
        }]
      }).then(() => {
        ui.dismissModal()
      })
    }
  }

  render () {
    return <div className={cx('Adjustment', this.props.mode)}>
      <h3>{this.title} Kredits</h3>
      <h4>{this.state.kredits}</h4>
      <form onSubmit={this._submit}>
        <input type='range'
          value={this.state.kredits}
          onChange={this._changedKredits}
          min={1}
          max={50} />
        <textarea
          value={this.state.reason}
          onChange={this._changedReason}
          ref='reason'
          cols={22} rows={4}
          placeholder='Note the reason...'
        />
        <button type='submit' className='btn'>Save</button>
      </form>
    </div>
  }
}

export default Adjustment
