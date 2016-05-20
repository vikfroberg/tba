import React from 'react'
import { css } from '../../utils'

export default ({ component, field }) => {
  return (
    <div style={css('p2')}>
      <a href={`/admin/components/${component.id}/fields`}>{component.name}</a>
      <h1 style={css('h1', 'mb2')}>
        Edit {field.name.toLowerCase()}
      </h1>
      <div style={css('mb4')}>
        <form action={`/admin/components/${component.id}/fields/${field.id}/edit`} method="POST">
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="name"
            placeholder="Name"
            value={field.name}
          />
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="help"
            placeholder="Help text"
            value={field.help}
          />
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="slug"
            placeholder="Slug"
            value={field.slug}
          />
          <input
            style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
            type="submit"
            value="Save changes"
          />
        </form>
      </div>
    </div>
  )
}
