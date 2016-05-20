import React from 'react'
import { css } from '../../utils'
import Text from './_text'
import Markdown from './_markdown'

export default ({ type, ...props }) => {
  switch (type) {
    case 'text':
      return <Text {...props} />
    case 'markdown':
      return <Markdown {...props} />
  }
}
