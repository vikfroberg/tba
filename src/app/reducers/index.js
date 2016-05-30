import components from './components'
import fields from './fields'
import content from './content'
import field_content from './field_content'

export default (state = {} , action) => {
  return {
    components: components(state.components, action),
    fields: fields(state.fields, action),
    content: content(state.content, action),
    field_content: field_content(state.field_content, action),
  }
}
