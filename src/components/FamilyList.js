import React, { Component, cloneElement } from 'react'
import { graphql } from 'react-apollo'
import FamilyCreate from './FamilyCreate'
import FamilyListItem from './FamilyListItem'

import { queryUserOwnedFamilies } from '../graphql'

@graphql(...queryUserOwnedFamilies())
class FamilyList extends Component {

  families () {
    const { loading, user } = this.props.queryUserOwnedFamilies
    if (loading) return <div>Loading</div>

    return user.ownedFamilies.map((family, i) => {
      return <FamilyListItem {...family} key={i} />
    })
  }

  render () {
    return <div>
      <h2>Families</h2>
      {this.families()}
      <hr />
      <FamilyCreate />
      {this.props.children && cloneElement(this.props.children, { returnTo: '/families' })}
    </div>
  }
}

export default FamilyList
