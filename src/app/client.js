import React from 'react'
import ReactDOM from 'react-dom'
import page from 'page'
import serialize from 'form-serialize'
import request from 'superagent'
import routes from './routes'
import {
  post,
  toUri,
  reducer,
} from './utils'

const get = page

const render = component => {
  ReactDOM.render(component, document.getElementById('component'))
}

let state = window.app.state
const dispatch = action => {
  state = reducer(state, action)
  request
    .post('/dispatch')
    .send(action)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .end(err => {
      if (err) console.log(err)
    })
}

const middleWare = (context, next) => {
  context.render = component => render(component)
  context.redirect = path => get.redirect(path)
  context.dispatch = action => dispatch(action)
  next()
}

get('*', middleWare)
post('*', middleWare)

routes.forEach(([method, path, handler]) => {
  const finalHandler = (context) => {
    handler({
      ...context,
      state,
      body: context.body || {},
    })
  }
  if (method === 'POST') {
    post(path, finalHandler)
  } else {
    page(path, finalHandler)
  }
})

get({ click: false })

document.addEventListener('click', e => {
  e.path.forEach(el => {
    if (el.nodeName == 'A') {
      e.preventDefault()
      get(el.pathname + el.search + el.hash)
    }
    else if (el.type === 'submit') {
      e.preventDefault()
      e.path.forEach(element => {
        if (element.nodeName == 'FORM') {
          const uri = toUri(element.action)
          const action = uri.pathname + uri.search + uri.hash
          if (element.method === 'post') {
            post(action, serialize(element, { hash: true }))
          } else {
            get(`${action}?${serialize(element)}`)
          }
        }
      })
    }
  })
})
