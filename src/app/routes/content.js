import React from 'react'
import ContentIndex from '../views/content/index'
import ContentNew from '../views/content/new'
import ContentEdit from '../views/content/edit'
import {
  reduce,
  find,
  propEq,
  filter,
  map,
  prop,
  assoc,
} from '../utils'

const index = ['GET', '/admin/content', ({ render, state }) => {
  render(
    <ContentIndex
      components={state.components}
      content={state.content}
    />
  )
}]

const _new = ['GET', '/admin/content/new/:id', ({ params, state, render }) => {
  const id = parseInt(params.id)
  render(
    <ContentNew
      component={find(propEq('id', id), state.components)}
      fields={filter(propEq('component_id', id), state.fields)}
    />
  )
}]

const create = ['POST', '/admin/content/new/:id', ({ dispatch, state, params, redirect, body }) => {
  const id = parseInt(params.id)
  const component = find(propEq('id', id), state.components)
  const fields = filter(propEq('component_id', id), state.fields)
  const slugs = map(prop('slug'), fields)
  const data = reduce((acc, slug) => assoc(slug, body[slug], acc), {}, slugs)
  dispatch({
    type: 'ADD_CONTENT',
    payload: {
      title: body.title,
      component_id: component.id,
      data: data,
    },
  })
  redirect('/admin/content')
}]

const edit = ['GET', '/admin/content/:id/edit', ({ params, state, render }) => {
  const id = parseInt(params.id)
  const content = find(propEq('id', id), state.content)
  render(
    <ContentEdit
      fields={filter(propEq('component_id', content.component_id), state.fields)}
      content={content}
    />
  )
}]

const update = ['POST', '/admin/content/:id/edit', ({ dispatch, state, params, redirect, body }) => {
  const id = parseInt(params.id)
  const content = find(propEq('id', id), state.content)
  const fields = filter(propEq('component_id', content.component_id), state.fields)
  const slugs = map(prop('slug'), fields)
  const data = reduce((acc, slug) => assoc(slug, body[slug], acc), {}, slugs)
  dispatch({
    type: 'UPDATE_CONTENT',
    payload: {
      id: id,
      title: body.title,
      data: data,
    },
  })
  redirect('/admin/content')
}]

const _delete = ['GET', '/admin/content/:id/delete', ({ dispatch, params, redirect }) => {
  const id = parseInt(params.id)
  dispatch({
    type: 'DELETE_CONTENT',
    payload: {
      id: id,
    },
  })
  redirect('/admin/content')
}]

export default [index, _new, create, edit, update, _delete]
