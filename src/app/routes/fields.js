import React from 'react'
import FieldsIndex from '../views/fields/index'
import FieldsNew from '../views/fields/new'
import FieldsEdit from '../views/fields/edit'
import {
  find,
  propEq,
  filter,
} from '../utils'

const index = ['GET', '/admin/components/:id/fields', ({ params, state, render }) => {
  const id = parseInt(params.id)
  render(
    <FieldsIndex
      component={find(propEq('id', id), state.components)}
      fields={filter(propEq('component_id', id), state.fields)}
    />
  )
}]

const _new = ['GET', '/admin/components/:id/fields/new', ({ params, state, render }) => {
  const id = parseInt(params.id)
  render(
    <FieldsNew
      component={find(propEq('id', id), state.components)}
    />
  )
}]

const create = ['POST', '/admin/components/:id/fields/new', ({ dispatch, params, redirect, body }) => {
  const id = parseInt(params.id)
  dispatch({
    type: 'ADD_FIELD',
    payload: {
      id: id,
      name: body.name,
      help: body.help,
      slug: body.slug,
      type: body.type,
    },
  })
  redirect(`/admin/components/${id}/fields`)
}]

const edit = ['GET', '/admin/components/:cid/fields/:id/edit', ({ params, state, render }) => {
  const cid = parseInt(params.cid)
  const id = parseInt(params.id)
  render(
    <FieldsEdit
      component={find(propEq('id', cid), state.components)}
      field={find(propEq('id', id), state.fields)}
    />
  )
}]

const update = ['POST', '/admin/components/:cid/fields/:id/edit', ({ dispatch, params, redirect, body }) => {
  const cid = parseInt(params.cid)
  const id = parseInt(params.id)
  dispatch({
    type: 'UPDATE_FIELD',
    payload: {
      id: id,
      name: body.name,
      help: body.help,
      slug: body.slug,
    },
  })
  redirect(`/admin/components/${cid}/fields`)
}]

const _delete = ['GET', '/admin/components/:cid/fields/:id/delete', ({ dispatch, params, redirect }) => {
  const cid = parseInt(params.cid)
  const id = parseInt(params.id)
  dispatch({
    type: 'DELETE_FIELD',
    payload: {
      id: id,
    },
  })
  redirect(`/admin/components/${cid}/fields`)
}]

export default [index, _new, create, edit, update, _delete]
