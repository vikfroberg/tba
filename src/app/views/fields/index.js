import React from 'react'
import { css } from '../../utils'

export default ({ component, fields }) => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin/components">Components</a>
      <h1 style={css('h1', 'mb2')}>
        {component.name} fields
      </h1>
      <div style={css('mb4')}>
        <ul>
          <li>
            <a
              style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
              href={`/admin/components/${component.id}/fields/new`}
            >
              Create field
            </a>
          </li>
        </ul>
      </div>
      <h2 style={css('h3', 'mb2', 'grey')}>
        Fields
      </h2>
      { !fields.length &&
        <p>There are no fields at the moment</p>
      }
      { !!fields.length &&
        <ul>
          { fields.map(field =>
            <li key={field.id}>
              [<a href={`/admin/components/${component.id}/fields/${field.id}/delete`}>x</a>]
              <span>&nbsp;</span>
              [<a href={`/admin/components/${component.id}/fields/${field.id}/edit`}>edit</a>]
              <span>&nbsp;</span>
              {field.name} ({field.type})
            </li>
          )}
        </ul>
      }
    </div>
  )
}
