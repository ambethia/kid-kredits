import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withAuth from '../utils/withAuth'
import ui from '../ui'

import {
  queryFamily,
  mutationRenameFamily
} from '../graphql'

@withAuth
@graphql(...queryFamily({
  options: props => ({ variables: { id: props.id } })
}))
@graphql(...mutationRenameFamily())
class FamilyEdit extends Component {

  state = {
    newFamilyName: ''
  }

  // This component has a query that depends on it's props, so
  // we want to update the text field when the query has loaded.
  componentWillReceiveProps (nextProps) {
    const { loading, Family } = nextProps.queryFamily
    if (!loading) this.setState({ newFamilyName: Family.name })
  }

  _newFamilyNameChanged = (event) => {
    this.setState({ newFamilyName: event.target.value })
  }

  _updateFamily = (event) => {
    event.preventDefault()
    const { mutationRenameFamily, id } = this.props
    mutationRenameFamily({
      variables: {
        id,
        name: this.state.newFamilyName
      }
    }).then(() => ui.dismissModal())
  }

  render () {
    const { loading, Family } = this.props.queryFamily
    if (loading) { return <div>Loading</div> }

    return <div className='FamiliyEdit'>
      <form onSubmit={this._updateFamily}>
        <h3>Rename "{Family.name}"</h3>
        <input
          type='text'
          placeholder='Family Name'
          value={this.state.newFamilyName}
          onChange={this._newFamilyNameChanged}
        />
        <button type='submit' className='btn'>Update</button>
      </form>
    </div>
  }
}

export default FamilyEdit
