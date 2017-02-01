import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withAuth from '../utils/withAuth'

@withAuth
class FamilyList extends Component {

  families () {
    const { loading, user } = this.props.data
    if (loading) { return <div>Loading</div> }
    return <ul>
      {user.families.map((family, i) =>
        <li key={i}>{family.name}</li>
      )}
    </ul>
  }

  render () {
    return <div>
      <h2>Families</h2>
      {this.families()}
      <hr />
    </div>
  }
}

const FamiliesQuery = gql`query {
  user {
    families(orderBy: name_ASC) {
      name
    }
  }
}`

export default graphql(FamiliesQuery)(FamilyList)
