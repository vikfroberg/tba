import React from 'react'
import ContentIndex from '../views/content/index'
import ContentNew from '../views/content/new'
import ContentEdit from '../views/content/edit'
import {
  assoc,
  compose,
  filter,
  find,
  generateUuid,
  map,
  prop,
  propEq,
  reduce,
  reject,
} from '../utils'

class Content {
  index({ render, state }) {
    render(
      <ContentIndex
        components={state.components}
        content={state.content}
      />
    )
  }

  edit({ params, state, render, redirect }) {
    const content = find(propEq('id', params.slug), state.content)
    const fields = filter(propEq('component_id', content.component_id), state.fields)
    const field_content = filter(propEq('content_id', content.id), state.field_content)
    render(
      <ContentEdit
        fields={fields}
        content={content}
        field_content={field_content}
      />
    )
  }

  update({ dispatch, state, params, redirect, body }) {
    console.log(body)
    const content = find(propEq('id', params.slug), state.content)
    const fields = filter(propEq('component_id', content.component_id), state.fields)
    const field_content = filter(propEq('content_id', content.id), state.field_content)
    const extractFieldData = compose(
      // reject(propEq('value', undefined)),
      map(({ id }) => {
        const field_data = find(propEq('field_id', id), field_content) || {}
        return {
          id: field_data.id || generateUuid(),
          field_id: id,
          value: body[id] !== field_data.value ? body[id] : undefined,
        }
      }),
    )
    dispatch({
      type: 'UPDATE_CONTENT',
      payload: {
        id: content.id,
        title: body.title !== content.title ? body.title : undefined,
        field_data: extractFieldData(fields),
      },
    })
    redirect('/admin/content')
  }

  destroy({ dispatch, params, redirect }) {
    // const id = parseInt(params.id)
    // dispatch({
    //   type: 'DELETE_CONTENT',
    //   payload: {
    //     id: id,
    //   },
    // })
    console.error('Not implemented')
    redirect('/admin/content')
  }
}


export default Content
