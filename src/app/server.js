import 'source-map-support/register'
import fs from 'fs'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import reducer from './reducers'
import {
  compose,
  prop,
  reduce,
  assoc,
  filter,
  render,
} from './utils'

const jsonPath = './public/db.json'
const initialData = {
  actions: [{
    type: '@@INIT',
    payload: {},
  }],
}

if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify(initialData))
}

let db = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
let state = db.actions.reduce(reducer, undefined)

const dispatch = action => {
  db.actions.push(assoc('created_at', new Date(), action))
  state = db.actions.reduce(reducer, undefined)
  fs.writeFileSync(jsonPath, JSON.stringify(db))
}

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.locals.context = {
    state: state,
    render: component => res.send(render(component, state)),
    redirect: path => res.redirect(path),
    dispatch: action => dispatch(action),
  }
  next()
})

app.get('/', (req, res) => {
  res.json(state)
})

app.post('/dispatch', (req, res) => {
  dispatch(req.body)
  res.json({})
})

app.get('/actions', (req, res) => {
  if (typeof req.query.clear !== 'undefined') {
    db = initialData
    fs.writeFileSync(jsonPath, JSON.stringify(db))
    res.redirect('/actions')
  }
  res.json(db)
})

// ['GET', 'admin/content', context => ...]
routes.forEach(([method, path, handler]) => {
  const finalHandler = ({ params, query, body }, res) => {
    handler({ params, query, body, ...res.locals.context })
  }
  if (method === 'POST') {
    app.post(path, finalHandler)
  } else {
    app.get(path, finalHandler)
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
