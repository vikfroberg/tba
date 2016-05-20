import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import {
  compose,
  prop,
  reduce,
  assoc,
  filter,
  reducer,
  render,
} from './utils'

const db = JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8'))
let state = db.actions.reduce(reducer, undefined)

const dispatch = action => {
  db.actions.push(assoc('created_at', new Date(), action))
  state = db.actions.reduce(reducer, undefined)
  fs.writeFileSync(__dirname + '/db.json', JSON.stringify(db))
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
  res.json(compose(
    filter(c => c[req.query.field] == req.query.value),
    prop('content'),
  )(state))
})

app.post('/dispatch', (req, res) => {
  dispatch(req.body)
  res.json({})
})

app.get('/actions', (req, res) => {
  if (typeof req.query.clear !== 'undefined') {
    db.actions = []
    dispatch({ type: '@@INIT' })
    res.redirect('/actions')
  }
  res.json(db)
})

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
