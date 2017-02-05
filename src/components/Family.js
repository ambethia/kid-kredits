import React, { Component } from 'react'
import { Link } from 'react-router'
import Kid from './Kid'

class Family extends Component {

  kids () {
    const { kids } = this.props
    if (kids.length === 0) {
      return <p>
        There are no kids in this family yet.
        <br />
        If you're the owner, you can <Link to='/families'>fix that now</Link>.
      </p>
    }
    return <ul className='kids'>
      {kids.map((kid, i) => <Kid {...kid} key={i} />)}
    </ul>
  }

  render () {
    return <div className='Family'>
      <h2>The {this.props.name} Family</h2>
      {this.kids()}
    </div>
  }
}

export default Family
