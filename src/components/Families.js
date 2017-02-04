import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Family from './Family'
import { queryUserFamilies } from '../graphql'

@graphql(...queryUserFamilies())
class Families extends Component {

  families () {
    const { loading, user } = this.props.queryUserFamilies
    if (loading) return <div>Loading</div>

    return user.families.map((family, i) => {
      return <Family {...family} key={i} />
    })
  }

  render () {
    return <div className='Families'>
      {this.families()}
    </div>
  }
}

export default Families
