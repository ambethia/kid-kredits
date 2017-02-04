import React from 'react'
import { Link } from 'react-router'

const Heading = ({ size, to, children }) => {
  const El = `h${size}`
  const content = to ? <Link to={to}>{children}</Link> : children
  return <div className='Heading'>
    <El title={children}>{content}</El>
  </div>
}

Heading.defaultProps = { size: 1 }

export default Heading
