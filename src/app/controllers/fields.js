import React from 'react'
import FieldsIndex from '../views/fields/index'
import FieldsNew from '../views/fields/new'
import FieldsEdit from '../views/fields/edit'
import {
  find,
  propEq,
  filter,
  generateUuid,
} from '../utils'

class Fields {
  index({ params, state, render }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    const fields = filter(propEq('component_id', component.id), state.fields)
    render(
      <FieldsIndex
        component={component}
        fields={fields}
      />
    )
  }

  new({ params, state, render }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    render(
      <FieldsNew
        component={component}
      />
    )
  }

  create({ state, dispatch, params, redirect, body }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    dispatch({
      type: 'ADD_FIELD',
      payload: {
        id: generateUuid(),
        component_id: component.id,
        name: body.name,
        help: body.help,
        slug: body.slug,
        type: body.type,
      },
    })
    redirect(`/admin/components/${component.slug}/fields`)
  }

  edit({ params, state, render }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    const field = find(propEq('slug', params.slug), state.fields)
    render(
      <FieldsEdit
        component={component}
        field={field}
      />
    )
  }

  update({ state, dispatch, params, redirect, body }) {
    const field = find(propEq('slug', params.slug), state.fields)
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        id: field.id,
        name: body.name,
        help: body.help,
        slug: body.slug,
      },
    })
    redirect(`/admin/components/${params.component_slug}/fields`)
  }

  destroy({ dispatch, params, redirect, state }) {
    const field = find(propEq('slug', params.slug), state.fields)
    dispatch({
      type: 'DELETE_FIELD',
      payload: {
        id: field.id,
      },
    })
    redirect(`/admin/components/${params.component_slug}/fields`)
  }
}

export default Fields
