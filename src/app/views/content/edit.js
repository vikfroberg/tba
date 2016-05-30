import React from 'react'
import { css, find, propEq, prop } from '../../utils'
import Field from './_field'

export default ({ content, fields, field_content }) => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin/content">Content</a>
      <h1 style={css('h1', 'mb2')}>
        Edit {content.title.toLowerCase()}
      </h1>
      <form action={`/admin/content/${content.id}/edit`} method="POST">
        <input
          name="title"
          style={css('mb2', 'b1', 'p1', 'g4')}
          type="text"
          placeholder="Title"
          defaultValue={content.title}
        />
        { !!fields.length &&
          fields.map(field =>
            <Field
              key={field.id}
              type={field.type}
              name={field.id}
              placeholder={field.name}
              defaultValue={prop('value', find(propEq('field_id', field.id), field_content))}
            />
          )
        }
        <input
          style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
          type="submit"
          value="Save changes"
        />
      </form>
    </div>
  )
}
