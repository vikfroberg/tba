import React from 'react'
import { css } from '../../utils'

export default props => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin/components">Components</a>
      <h1 style={css('h1', 'mb2')}>
        Create component
      </h1>
      <form action="/admin/components/new" method="POST">
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="slug"
          placeholder="Slug"
        />
        <input
          style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
          type="submit"
          value="Create component"
        />
      </form>
    </div>
  )
}
