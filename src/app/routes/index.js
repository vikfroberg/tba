import admin from './admin'
import fields from './fields'
import components from './components'
import content from './content'
import {
  reduce,
  concat,
} from '../utils'

export default reduce(concat, [], [admin, components, content, fields])
