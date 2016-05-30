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

export default (components = [], action) => {
  const { id, name, slug } = action.payload
  return guard(
    ['ADD_COMPONENT', _ => append({ id, name, slug }, components)],
    ['UPDATE_COMPONENT', _ => map(whenId(id, override({ slug, name })), components)],
    ['DELETE_COMPONENT', _ => reject(whereId(id), components)],
    [otherwise, components],
  )(action.type)
}
