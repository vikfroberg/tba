import React from 'react'
import { css } from '../../utils'

export default ({ component }) => {
  return (
    <div style={css('p2')}>
      <a href={`/admin/components/${component.slug}/fields`}>Fields</a>
      <h1 style={css('h1', 'mb2')}>
        Create field
      </h1>
      <form action={`/admin/components/${component.slug}/fields/new`} method="POST">
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="help"
          placeholder="Help text"
        />
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="slug"
          placeholder="slug"
        />
        <select
          style={css('mb2', 'b1', 'p1', 'g4')}
          name="type"
        >
          <option value="text">Text</option>
          <option value="markdown">Markdown</option>
        </select>
        <input
          style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
          type="submit"
          value="Add field"
        />
      </form>
    </div>
  )
}
