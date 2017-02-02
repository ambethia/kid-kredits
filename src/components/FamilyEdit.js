import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import update from 'immutability-helper'
import withAuth from '../utils/withAuth'
import { Modal } from '.'

import Family from '../graphql/query/Family.gql'
import RenameFamily from '../graphql/mutation/RenameFamily.gql'

@withAuth
@graphql(Family, {
  name: 'family',
  options: (ownProps) => ({ variables: { id: ownProps.params.id } })
})
@graphql(RenameFamily, { name: 'renameFamily' })
class FamilyEdit extends Component {

  state = {
    newFamilyName: ''
  }

  // Update the text field when the query has loaded.
  componentWillReceiveProps (nextProps) {
    const { loading, Family } = nextProps.family
    if (!loading) this.setState({ newFamilyName: Family.name })
  }

  _handleNewFamilyNameChanged = (event) => {
    this.setState({
      newFamilyName: event.target.value
    })
  }

  _handleUpdateFamily = (event) => {
    event.preventDefault()
    const { renameFamily, params, router, returnTo } = this.props
    renameFamily({
      // this.props.params.id comes from the Router
      variables: {
        id: params.id,
        name: this.state.newFamilyName
      }
    }).then(() => router.push(returnTo))
  }

  content () {
    if (this.props.family.loading) { return <div>Loading</div> }

    return <form onSubmit={this._handleUpdateFamily}>
      <input
        type='text'
        placeholder='Family Name'
        value={this.state.newFamilyName}
        onChange={this._handleNewFamilyNameChanged}
      />
      <button type='submit'>Update</button>
    </form>
  }

  render () {
    return <Modal>
      {this.content()}
    </Modal>
  }
}

export default FamilyEdit
