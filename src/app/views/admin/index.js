import React from 'react'
import { css } from '../../utils'

export default ({ components }) => {
  return (
    <div style={css('p2')}>
      <h1 style={css('h1', 'mb2')}>
        Admin
      </h1>
      <ul>
        <li>
          <a href={`/admin/content`}>
            Content
          </a>
        </li>
        <li>
          <a href={`/admin/components`}>
            Components
          </a>
        </li>
      </ul>
    </div>
  )
}
