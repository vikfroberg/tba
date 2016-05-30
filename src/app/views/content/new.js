import React from 'react'
import Field from './_field'

export default ({ component, fields }) => {
  return (
    <div>
      <a className="back" href="/admin/content">Content</a>
      <h1 className="page-title mb2">
        Create {component.name.toLowerCase()}
      </h1>
      <form action={`/admin/${component.slug}/new`} method="POST">
        <div>
          <input
            name="title"
            className="mb2 input"
            type="text"
            placeholder="Title"
          />
          { !!fields.length &&
            fields.map(field =>
              <Field
                key={field.id}
                type={field.type}
                name={field.id}
                placeholder={field.name}
              />
            )
          }
        </div>
        <input
          className="button"
          type="submit"
          value={`Create ${component.name.toLowerCase()}`}
        />
      </form>
    </div>
  )
}
