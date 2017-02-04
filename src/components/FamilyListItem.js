import React, { Component } from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import FamilyEdit from './FamilyEdit'
import Icon from './Icon'
import ui from '../ui'

import {
  mutationDeleteFamily,
  queryUserOwnedFamilies
} from '../graphql'

@graphql(...mutationDeleteFamily())
class FamilyListItem extends Component {

  _editFamily = (event) => {
    event.preventDefault()
    ui.displayModal(<FamilyEdit {...this.props} />)
  }

  _deleteFamily = (event) => {
    event.preventDefault()
    this.props.mutationDeleteFamily({
      variables: { id: this.props.id },
      refetchQueries: [{ query: queryUserOwnedFamilies(false) }]
    })
  }

  render () {
    return <li className='FamilyListItem'>
      <header>
        <h3>{this.props.name}</h3>
        <ul className='controls'>
          <li><a href='#' onClick={this._editFamily}><Icon glyph='pencil' opt='fw' /></a></li>
          <li><a href='#' onClick={this._deleteFamily}><Icon glyph='trash' opt='fw' /></a></li>
        </ul>
      </header>
      <section>
        Kids.
      </section>
    </li>
  }
}

export default FamilyListItem
