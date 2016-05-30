import React from 'react'
import ContentNew from '../views/content/new'
import {
  find,
  propEq,
  filter,
  reject,
  compose,
  map,
  generateUuid,
} from '../utils'

class Create {
  new({ params, state, render }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    const fields = filter(propEq('component_id', component.id), state.fields)
    render(
      <ContentNew
        component={component}
        fields={fields}
      />
    )
  }

  create({ dispatch, state, params, redirect, body }) {
    const component = find(propEq('slug', params.component_slug), state.components)
    const fields = filter(propEq('component_id', component.id), state.fields)
    const extractFieldData = compose(
      reject(propEq('value', undefined)),
      map(({ id }) => ({ id: generateUuid(), field_id: id, value: body[id] })),
    )
    dispatch({
      type: 'ADD_CONTENT',
      payload: {
        id: generateUuid(),
        title: body.title,
        component_id: component.id,
        field_data: extractFieldData(fields),
      },
    })
    redirect('/admin/content')
  }
}

export default Create
