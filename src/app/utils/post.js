import pathToRegexp from 'path-to-regexp'
import runMiddlewares from './runMiddlewares'
import {
  test,
  getKeys,
  take,
  drop,
  assoc,
  find,
  match,
  prop,
  map,
} from './ramda'

let handlers = {}
let middlewares = []

export default (action, body) => {
  console.log(body)
  if (action === '*') {
    middlewares.push(body)
  }
  else if (typeof body === 'function') {
    handlers[action] = body
  } else {
    const testPath = path => test(pathToRegexp(path), action)
    const path = find(testPath, getKeys(handlers))
    if (path) {
      const keyMatches = []
      const matches = match(pathToRegexp(path, keyMatches), action)
      const keys = map(prop('name'), keyMatches)
      const values = take(keys.length, drop(1, matches))
      const params = keys.reduce((acc, key, i) => assoc(key, values[i], acc), {})
      const context = { state: {} }
      runMiddlewares(middlewares, context, _ => {
        context.params = params
        context.body = body
        handlers[path](context)
      })
    }
  }
}
