import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import ui from '../ui'

import {
  mutationCreateKid,
  queryUserOwnedFamilies
} from '../graphql'

@graphql(...mutationCreateKid())
class FamilyAddKid extends Component {

  state = {
    name: ''
  }

  _changed = (event) => {
    this.setState({ name: event.target.value })
  }

  _submit = (event) => {
    event.preventDefault()
    this.props.mutationCreateKid({
      variables: {
        familyId: this.props.id,
        name: this.state.name
      },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    }).then(() => {
      ui.dismissModal()
    })
  }

  render () {
    return <div className='FamilyAddKid'>
      <h3>Add a Kid</h3>
      <form onSubmit={this._submit}>
        <input
          type='text'
          value={this.state.name}
          onChange={this._changed}
          placeholder={'Kid\'s Name'}
        />
        <button type='submit' className='btn'>Add</button>
      </form>
    </div>
  }
}

export default FamilyAddKid
