import React from 'react'
import { css } from '../../utils'

export default props => {
  return (
    <input
      style={css('mb2', 'b1', 'p1', 'g4')}
      type="text"
      { ...props }
    />
  )
}
