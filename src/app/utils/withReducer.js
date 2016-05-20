import React from 'react'
import { curry } from 'ramda'

const withReducer = (reducer, initialState, ComposedComponent) => class extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  dispatch(action) {
    this.setState(reducer(this.state, action))
  }
  render() {
    return (
      <ComposedComponent
        {...this.props}
        dispatch={this.dispatch}
        state={this.state}
      />
    )
  }
}

export default curry(withReducer)
