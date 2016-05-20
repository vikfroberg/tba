import React from 'react'
import { css } from '../../utils'

export default ({ component }) => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href={`/admin/components`}>Components</a>
      <h1 style={css('h1', 'mb2')}>
        Edit {component.name.toLowerCase()}
      </h1>
      <form action={`/admin/components/${component.id}/edit`} method="POST">
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={component.name}
        />
        <input
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          name="slug"
          placeholder="Slug"
          defaultValue={component.slug}
        />
        <input
          style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
          type="submit"
          value="Save changes"
        />
      </form>
    </div>
  )
}
