import React from 'react'

export default props => {
  return (
    <div>
      <a className="back" href="/admin">Admin</a>
      <h1 className="page-title mb2">
        Components
      </h1>
      <div>
        <ul>
          <li>
            <a className="button mb2" href={'/admin/components/new'}>
              Create component
            </a>
          </li>
        </ul>
      </div>
      <h2 className="section-title mb2">
        List
      </h2>
      { !props.components.length &&
        <p>There are no components at the moment</p>
      }
      { !!props.components.length &&
        <ul>
          { props.components.map(c =>
            <li key={c.slug}>
              {c.name}
              <a href={`/admin/components/${c.slug}/edit`}>Edit</a>
              <a href={`/admin/components/${c.slug}/fields`}>Manage fields</a>
              <a href={`/admin/components/${c.slug}/delete`}>Delete</a>
            </li>
          )}
        </ul>
      }
    </div>
  )
}
