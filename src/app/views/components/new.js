import React from 'react'

export default props => {
  return (
    <div>
      <a className="back" href="/admin/components">Components</a>
      <h1 className="page-title mb2">
        Create component
      </h1>
      <form action="/admin/components/new" method="POST">
        <input
          className="input mb2"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="input mb2"
          type="text"
          name="slug"
          placeholder="Slug"
        />
        <input
          className="button mb2"
          type="submit"
          value="Create component"
        />
      </form>
    </div>
  )
}
