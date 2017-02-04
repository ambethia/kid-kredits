import React, { Component, cloneElement } from 'react'
import { graphql } from 'react-apollo'
import FamilyCreate from './FamilyCreate'
import FamilyListItem from './FamilyListItem'
import Icon from './Icon'
import ui from '../ui'

import { queryUserOwnedFamilies } from '../graphql'

@graphql(...queryUserOwnedFamilies())
class FamilyList extends Component {

  _createFamily = () => {
    ui.displayModal(<FamilyCreate />)
  }

  // Returns a string, "Family" or "Families" if there are more than one family created.
  title () {
    const { loading, user } = this.props.queryUserOwnedFamilies
    return loading || user.ownedFamilies.length <= 1 ? 'Family' : 'Families'
  }

  // Renders the list items for our query
  families () {
    const { loading, user } = this.props.queryUserOwnedFamilies
    if (loading) return <li className='loading'>Loading</li>

    return user.ownedFamilies.map((family, i) => {
      return <FamilyListItem {...family} key={i} />
    })
  }

  render () {
    return <div className='FamilyList'>
      <h2>{this.title()}</h2>
      <ul className='familyList'>
        {this.families()}
      </ul>

      <div className='controls'>
        <button className='btn' onClick={this._createFamily}>
          <Icon glyph='plus' />
          Create Family
        </button>
      </div>
      {this.props.children && cloneElement(this.props.children, { returnTo: '/families' })}
    </div>
  }
}

export default FamilyList
