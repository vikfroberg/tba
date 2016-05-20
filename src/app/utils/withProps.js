import React from 'react'
import { curry } from 'ramda'

const withProps = (mapProps, ComposedComponent) => class extends React.Component {
  render() {
    return <ComposedComponent {...mapProps(this.props)} />
  }
}

export default curry(withProps)
