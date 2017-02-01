import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withAuth from '../utils/withAuth'

import CreateFamily from '../graphql/mutation/CreateFamily.gql'
import UserOwnedFamilies from '../graphql/query/UserOwnedFamilies.gql'

@withAuth
@graphql(UserOwnedFamilies)
@graphql(CreateFamily)
class FamilyList extends Component {

  state = {
    newFamilyName: ''
  }

  _handleNewFamilyNameChanged = (event) => {
    this.setState({
      newFamilyName: event.target.value
    })
  }

  _handleCreateFamily = (event) => {
    event.preventDefault()
    this.props.mutate({ variables: {
      name: this.state.newFamilyName,
      ownerId: this.props.client.userId
    }})
  }

  families () {
    const { loading, user } = this.props.data
    if (loading) { return <div>Loading</div> }

    return <ul>
      {user.ownedFamilies.map((family, i) =>
        <li key={i}>{family.name}</li>
      )}
    </ul>
  }

  render () {
    return <div>
      <h2>Families</h2>
      {this.families()}
      <hr />
      <h3>New Family</h3>

      <form onSubmit={this._handleCreateFamily}>
        <input
          type='text'
          placeholder='Family Name'
          value={this.state.newFamilyName}
          onChange={this._handleNewFamilyNameChanged}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  }
}

export default FamilyList
