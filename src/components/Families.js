import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import Family from './Family'
import NewUserCallToAction from './NewUserCallToAction'
import AcceptInvitation from './AcceptInvitation'

import withAuth from '../utils/withAuth'

import { queryUserFamilies } from '../graphql'

@withAuth
@graphql(...queryUserFamilies({
  options: props => ({ variables: { email: props.auth.profile.email } })
}))
class Families extends Component {

  families () {
    const { loading, user, allInvitations } = this.props.queryUserFamilies
    if (loading) return <div className='loadingText'>Loading</div>

    if (allInvitations.length > 0) {
      return allInvitations.map((invite, i) => <AcceptInvitation {...invite} key={i} />)
    }

    if (user.families.length === 0) {
      return <NewUserCallToAction />
    }

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
