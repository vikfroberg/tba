import React from 'react'

export default ({ component }) => {
  return (
    <div>
      <a className="back" href={`/admin/components`}>Components</a>
      <h1 className="page-title mb2">
        Edit {component.name.toLowerCase()}
      </h1>
      <form action={`/admin/components/${component.slug}/edit`} method="POST">
        <input
          className="input mb2"
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={component.name}
        />
        <input
          className="input mb2"
          type="text"
          name="slug"
          placeholder="Slug"
          defaultValue={component.slug}
        />
        <input
          className="button mb2"
          type="submit"
          value="Save changes"
        />
      </form>
    </div>
  )
}
