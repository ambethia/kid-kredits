import React from 'react'
import cx from 'classnames'

const fa = txt => txt ? `fa-${txt}` : null

const Icon = ({ glyph, opt }) => {
  return <i className={cx('Icon', 'fa', fa(glyph), opt && opt.split(' ').map(fa))} />
}

Icon.defaultProps = {
  size: 'lg'
}

export default Icon
