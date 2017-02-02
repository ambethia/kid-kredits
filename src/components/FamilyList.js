import React, { Component, cloneElement } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import update from 'immutability-helper'
import withAuth from '../utils/withAuth'

import UserOwnedFamilies from '../graphql/query/UserOwnedFamilies.gql'
import CreateFamily from '../graphql/mutation/CreateFamily.gql'
import DeleteFamily from '../graphql/mutation/DeleteFamily.gql'

@withAuth
@graphql(UserOwnedFamilies, { name: 'userOwnedFamilies' })
@graphql(CreateFamily, { name: 'createFamily' })
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
    this.props.createFamily({
      variables: {
        name: this.state.newFamilyName,
        ownerId: this.props.client.userId
      },
      // This invalidates the cache in an efficient way so we don't need
      //   to reload _all_ of the data when a small part of it has changed.
      updateQueries: {
        UserOwnedFamilies: (prev, { mutationResult }) => {
          const family = mutationResult.data.createFamily
          return update(prev, { user: { ownedFamilies: { $push: [family] } } })
        }
      }
    })
  }

  families () {
    const { loading, user } = this.props.userOwnedFamilies
    if (loading) { return <div>Loading</div> }

    return <ul>
      {user.ownedFamilies.map((family, i) =>
        <FamilyListItem {...family} key={i} />
      )}
    </ul>
  }

  render () {
    const { children } = this.props
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
      {children && cloneElement(children, { returnTo: '/families' })}
    </div>
  }
}

// `refetchQueries` here refreshes the data with the `UserOwnedFamilies` query. It would be more performant to use
//   `updateQueries` but I don't think the complextiy is worth the trade-off.
@graphql(DeleteFamily, { name: 'deleteFamily' })
class FamilyListItem extends Component {

  _handleDeleteFamily = () => {
    this.props.deleteFamily({
      variables: {
        id: this.props.id
      },
      updateQueries: {
        UserOwnedFamilies: (prev, { mutationResult }) => {
          const { id } = mutationResult.data.deleteFamily
          const index = prev.user.ownedFamilies.map(f => f.id).indexOf(id)
          return update(prev, { user: { ownedFamilies: { $splice: [[index, 1]] } } })
        }
      }
    })
  }

  render () {
    const { id, name } = this.props
    return <li>
      <Link to={`/families/${id}/edit`}>{name}</Link>
      <button onClick={this._handleDeleteFamily}>&times;</button>
    </li>
  }
}

export default FamilyList
