import React from 'react'
import { compose } from 'ramda'
import withReducer from './utils/withReducer.js'
import withProps from './utils/withProps.js'

const action = (type, payload) => ({ type, payload })

const Test = ({ name, setName }) => {
  return (
    <div>
      <input onChange={e => setName(e.targetValue)} />
      <div>{name}</div>
    </div>
  )
}

const initialState = { name: '' }
const reducer = (state, action) => {
  if (action.type == 'NAME_CHANGE') {
    return { name: action.payload.name }
  }
  return state
}

const mapProps = ({ dispatch, state, ...props }) => {
  return {
    name: state.name,
    setName: name => dispatch(action('NAME_CHANGE', { name })),
    ...props,
  }
}


export default compose(
  withProps(mapProps),
  withReducer(reducer, initialState)
)(Test)
