import React, { Component } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'

import {
  mutationDeleteFamily,
  queryUserOwnedFamilies
} from '../graphql'

@graphql(...mutationDeleteFamily())
class FamilyListItem extends Component {

  _deleteFamily = (event) => {
    event.preventDefault()
    this.props.mutationDeleteFamily({
      variables: { id: this.props.id },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    })
  }

  render () {
    const { id, name } = this.props
    return <li>
      <Link to={`/families/${id}`}>{name}</Link>
      <Link to={`/families/${id}/edit`}>Edit</Link>
      <a href='#' onClick={this._deleteFamily}>&times;</a>
    </li>
  }
}

export default FamilyListItem
