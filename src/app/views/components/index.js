import React from 'react'
import { css, presentConfirm } from '../../utils'

export default props => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin">Admin</a>
      <h1 style={css('h1', 'mb2')}>
        Components
      </h1>
      <div style={css('mb4')}>
        <ul>
          <li>
            <a
              style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
              href={'/admin/components/new'}
            >
              Create component
            </a>
          </li>
        </ul>
      </div>
      <h2 style={css('h3', 'mb2', 'grey')}>
        List
      </h2>
      { !props.components.length &&
        <p>There are no components at the moment</p>
      }
      { !!props.components.length &&
        <ul>
          { props.components.map(c =>
            <li key={c.id}>
              {c.name}
              <a href={`/admin/components/${c.id}/edit`}>Edit</a>
              <a href={`/admin/components/${c.id}/fields`}>Manage fields</a>
              <a
                onClick={presentConfirm(`Are you sure you want to delete ${c.name}`)}
                href={`/admin/components/${c.id}/delete`}
              >
                Delete
              </a>
            </li>
          )}
        </ul>
      }
    </div>
  )
}
