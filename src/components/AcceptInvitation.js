import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import withAuth from '../utils/withAuth'

import {
  mutationAcceptInvitation,
  queryUserFamilies
} from '../graphql'

@withAuth
@graphql(...mutationAcceptInvitation())
class AcceptInvitation extends Component {

  _accept = () => {
    this.props.mutationAcceptInvitation({
      variables: {
        userId: this.props.client.userId,
        familyId: this.props.family.id,
        invitationId: this.props.id
      },
      refetchQueries: [{
        query: queryUserFamilies(false),
        variables: { email: this.props.auth.profile.email }
      }]
    })
  }

  render () {
    const { name, owner } = this.props.family
    return <div className='AcceptInvitation'>
      <h2>Welcome to The {name} Family!</h2>
      <p>You've been invited by {owner.name}.</p>
      <button className='btn' onClick={this._accept}>Accept Invitation</button>
    </div>
  }
}

export default AcceptInvitation
