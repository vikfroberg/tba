import {
  append,
  guard,
  map,
  otherwise,
  override,
  propEq,
  reject,
  when,
} from '../utils'

const whenId = (id, fn) => when(propEq('id', id), fn)
const whereId = id => propEq('id', id)

export default (fields = [], action) => {
  const { id, name, slug, help, type, component_id } = action.payload
  return guard(
    ['ADD_FIELD', _ => append({ id, name, type, component_id, slug, help }, fields)],
    ['UPDATE_FIELD', _ => map(whenId(id, override({ slug, name, help })), fields)],
    ['DELETE_FIELD', _ => reject(whereId(id), fields)],
    [otherwise, fields],
  )(action.type)
}
