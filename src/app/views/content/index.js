import React from 'react'
import { css } from '../../utils'

export default ({ components, content }) => {
  return (
    <div style={css('p2')}>
      <a style={css('underline')} href="/admin">Admin</a>
      <h1 style={css('h1', 'mb2')}>
        Content
      </h1>
      <div style={css('mb4')}>
        { !!components.length &&
          <ul>
            { components.map(component =>
              <li key={component.id}>
                <a
                  style={css('bg-primary', 'white', 'p1', 'g4', 'center')}
                  href={`/admin/content/new/${component.id}`}
                >
                  Create {component.name.toLowerCase()}
                </a>
              </li>
            )}
          </ul>
        }
      </div>
      <h2 style={css('h3', 'mb2', 'grey')}>
        List
      </h2>
      { !content.length &&
        <p>There are no content at the moment</p>
      }
      { !!content.length &&
        <ul>
          { content.map(c =>
            <li key={c.id}>
              {c.title}
        &nbsp;[<a href={`/admin/content/${c.id}/edit`}>edit</a>]
              [<a href={`/admin/content/${c.id}/delete`}>delete</a>]
            </li>
          )}
        </ul>
      }
    </div>
  )
}
