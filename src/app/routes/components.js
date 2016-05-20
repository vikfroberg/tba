import React from 'react'
import ComponentsIndex from '../views/components/index'
import ComponentsNew from '../views/components/new'
import ComponentsEdit from '../views/components/edit'
import { propEq, find } from '../utils'

const index = ['GET', '/admin/components', ({ render, state }) => {
  render(<ComponentsIndex components={state.components} />)
}]

const _new = ['GET', '/admin/components/new', ({ render, state }) => {
  render(<ComponentsNew />)
}]

const create = ['POST', '/admin/components/new', ({ dispatch, body, redirect }) => {
  dispatch({
    type: 'ADD_COMPONENT',
    payload: {
      name: body.name,
      slug: body.slug,
    },
  })
  redirect('/admin/components')
}]

const edit = ['GET', '/admin/components/:id/edit', ({ params, render, state }) => {
  const id = parseInt(params.id)
  render(
    <ComponentsEdit
      component={find(propEq('id', id), state.components)}
    />
  )
}]

const update = ['POST', '/admin/components/:id/edit', ({ params, dispatch, body, redirect }) => {
  dispatch({
    type: 'UPDATE_COMPONENT',
    payload: {
      id: parseInt(params.id),
      name: body.name,
      slug: body.slug,
    },
  })
  redirect('/admin/components')
}]

const _delete = ['GET', '/admin/components/:id/delete', ({ params, redirect, dispatch }) => {
  dispatch({
    type: 'DELETE_COMPONENT',
    payload: {
      id: parseInt(params.id),
    },
  })
  redirect('/admin/components')
}]

export default [index, _new, create, edit, update, _delete]
