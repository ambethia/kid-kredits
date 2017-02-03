import React, { Component } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'

import {
  mutationDeleteFamily,
  queryUserOwnedFamilies
} from '../graphql'

@graphql(...mutationDeleteFamily())
class FamilyListItem extends Component {

  _deleteFamily = () => {
    this.props.mutationDeleteFamily({
      variables: { id: this.props.id },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    })
  }

  render () {
    const { id, name } = this.props
    return <li>
      <Link to={`/families/${id}/edit`}>{name}</Link>
      <button onClick={this._deleteFamily}>&times;</button>
    </li>
  }
}

export default FamilyListItem
