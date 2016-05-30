import React from 'react'
import ComponentsIndex from '../views/components/index'
import ComponentsNew from '../views/components/new'
import ComponentsEdit from '../views/components/edit'
import { generateUuid, propEq, find } from '../utils'

const findWhereSlug = (slug, items) => find(propEq('slug', slug), items)

class Components {
  index({ render, state }) {
    render(<ComponentsIndex components={state.components} />)
  }

  new({ render }) {
    render(<ComponentsNew />)
  }

  create({ dispatch, body, redirect }) {
    dispatch({
      type: 'ADD_COMPONENT',
      payload: {
        id: generateUuid(),
        name: body.name,
        slug: body.slug,
      },
    })
    redirect('/admin/components')
  }

  edit({ params, render, state }) {
    const component = findWhereSlug(params.slug, state.components)
    render(
      <ComponentsEdit
        component={component}
      />
    )
  }

  update({ state, params, dispatch, body, redirect }) {
    const component = findWhereSlug(params.slug, state.components)
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: component.id,
        uuid: component.uuid,
        name: body.name,
        slug: body.slug,
      },
    })
    redirect('/admin/components')
  }

  destroy({ state, params, redirect, dispatch }) {
    const component = findWhereSlug(params.slug, state.components)
    dispatch({
      type: 'DELETE_COMPONENT',
      payload: {
        id: component.id,
        uuid: component.uuid,
      },
    })
    redirect('/admin/components')
  }
}

export default Components
