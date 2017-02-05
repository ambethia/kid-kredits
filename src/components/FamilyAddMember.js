import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import ui from '../ui'

import {
  mutationCreateInvitation,
  queryUserOwnedFamilies
} from '../graphql'

@graphql(...mutationCreateInvitation())
class FamilyAddMember extends Component {

  state = {
    name: '',
    email: ''
  }

  _changed = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  _addMember = (event) => {
    event.preventDefault()
    this.props.mutationCreateInvitation({
      variables: {
        familyId: this.props.id,
        name: this.state.name,
        email: this.state.email
      },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    }).then(() => {
      ui.dismissModal()
    })
  }

  render () {
    return <div className='FamilyAddMember'>
      <h3>Add a Family Member</h3>
      <form onSubmit={this._addMember}>
        <input
          type='text'
          value={this.state.name}
          name='name'
          onChange={this._changed}
          placeholder='Name'
        />
        <input
          type='email'
          value={this.state.email}
          name='email'
          onChange={this._changed}
          placeholder='Email Address'
        />
        <button type='submit' className='btn'>Add</button>
      </form>
    </div>
  }
}

export default FamilyAddMember
