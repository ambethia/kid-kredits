import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { queryRecentAdjustments } from '../graphql'

@graphql(...queryRecentAdjustments())
class Transactions extends Component {

  transactions () {
    const { loading, user } = this.props.queryRecentAdjustments
    if (loading) return <li className='loadingText'>Loading</li>
    return user.families.map((family) => {
      return family.kids.map((kid, i) => {
        return <li key={i}>
          <h2>{kid.name}</h2>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>User</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {kid.adjustments.map((adjustment, j) => {
                return <tr key={j} className={adjustment.amount > 0 ? 'add' : 'remove'}>
                  <td><img src={adjustment.user.image} width={22} /></td>
                  <td>{adjustment.user.name.split(' ')[0]}</td>
                  <td>{adjustment.amount}</td>
                  <td>{adjustment.reason}</td>
                </tr>
              })}
            </tbody>
          </table>
        </li>
      })
    })
  }

  render () {
    return <div className='Transactions'>
      <h1>Recent Transactions</h1>
      <ul>
        {this.transactions()}
      </ul>
    </div>
  }
}

export default Transactions
