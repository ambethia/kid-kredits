import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withAuth from '../utils/withAuth'

import {
  mutationCreateFamily,
  queryUserOwnedFamilies
} from '../graphql'

@withAuth
@graphql(...mutationCreateFamily())
class FamilyNew extends Component {

  state = {
    newFamilyName: ''
  }

  _newFamilyNameChanged = (event) => {
    this.setState({ newFamilyName: event.target.value })
  }

  _createFamily = (event) => {
    event.preventDefault()
    this.props.mutationCreateFamily({
      variables: {
        ownerId: this.props.client.userId,
        name: this.state.newFamilyName
      },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    })
  }

  render () {
    return <div>
      <form onSubmit={this._createFamily}>
        <input
          type='text'
          value={this.state.newFamilyName}
          onChange={this._newFamilyNameChanged}
        />
        <button type='submit'>Create Family</button>
      </form>
    </div>
  }
}

export default FamilyNew
