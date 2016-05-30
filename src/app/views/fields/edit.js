import React from 'react'
import { css } from '../../utils'

export default ({ component, field }) => {
  return (
    <div style={css('p2')}>
      <a href={`/admin/components/${component.slug}/fields`}>{component.name}</a>
      <h1 style={css('h1', 'mb2')}>
        Edit {field.name.toLowerCase()}
      </h1>
      <div style={css('mb4')}>
        <form action={`/admin/components/${component.slug}/fields/${field.slug}/edit`} method="POST">
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={field.name}
          />
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="help"
            placeholder="Help text"
            defaultValue={field.help}
          />
          <input
            style={css('mb2', 'b1', 'p1', 'g4')}
            type="text"
            name="slug"
            placeholder="Slug"
            defaultValue={field.slug}
          />
          <input
            style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
            type="submit"
            defaultValue="Save changes"
          />
        </form>
      </div>
    </div>
  )
}
