import React from 'react'
import { css } from '../../utils'

export default props => {
  return (
    <input
      className="mb2 input"
      type="text"
      { ...props }
    />
  )
}
