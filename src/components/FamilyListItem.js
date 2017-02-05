import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import FamilyEdit from './FamilyEdit'
import FamilyAddMember from './FamilyAddMember'
import FamilyAddKid from './FamilyAddKid'
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

  _addMember = (event) => {
    ui.displayModal(<FamilyAddMember id={this.props.id} />)
  }

  _addKid = (event) => {
    ui.displayModal(<FamilyAddKid id={this.props.id} />)
  }

  invitations () {
    const { invitations, users } = this.props
    if (invitations.length === 0 && users.length === 0) {
      return <tr>
        <td colSpan='2'>
          <p className='loadingText'>Invite your first Family Member</p>
        </td>
      </tr>
    }
    return invitations.map((invite, i) => {
      return <tr key={i}>
        <td>{invite.name}</td>
        <td>{invite.email}</td>
      </tr>
    })
  }

  members () {
    const { users } = this.props
    return users.map((user, i) => {
      return <tr key={i}>
        <td><img src={user.image} width={32} /></td>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    })
  }

  kids () {
    const { kids } = this.props
    return kids.map((kid, i) => {
      return <li key={i}>{kid.name}</li>
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
        <h4>Kids</h4>
        <ul className='kids'>
          {this.kids()}
        </ul>
        <div className='controls'>
          <button className='btn small' onClick={this._addKid}>
            <Icon glyph='plus' />&nbsp;Add Kid
          </button>
        </div>
      </section>
      <section>
        <h4>Family Members</h4>
        <table>
          <tbody>
            {this.members()}
          </tbody>
        </table>
      </section>
      <section>
        <h4>Pending Invitations</h4>
        <table>
          <tbody>
            {this.invitations()}
          </tbody>
        </table>
        <div className='controls'>
          <button className='btn small' onClick={this._addMember}>
            <Icon glyph='plus' />&nbsp;Add Member
          </button>
        </div>
      </section>
      <hr />
    </li>
  }
}

export default FamilyListItem
