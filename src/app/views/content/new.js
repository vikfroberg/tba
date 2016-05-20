import React from 'react'
import { css } from '../../utils'
import Field from './_field'

export default ({ component, fields }) => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin/content">Content</a>
      <h1 style={css('h1', 'mb2')}>
        Create {component.name.toLowerCase()}
      </h1>
      <form action={`/admin/content/new/${component.id}`} method="POST">
        <input
          name="title"
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          placeholder="Title"
        />
        { !!fields.length &&
          fields.map(field =>
            <Field
              key={field.id}
              type={field.type}
              name={field.slug}
              placeholder={field.name}
            />
          )
        }
        <input
          style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
          type="submit"
          value={`Create ${component.name.toLowerCase()}`}
        />
      </form>
    </div>
  )
}
