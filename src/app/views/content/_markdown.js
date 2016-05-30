import React from 'react'
import { css } from '../../utils'

export default props => {
  return (
    <textarea
      rows="10"
      className="mb2 input"
      { ...props }
    />
  )
}
