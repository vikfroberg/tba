import {
  append,
  compose,
  fromPairs,
  guard,
  map,
  otherwise,
  override,
  propEq,
  reject,
  toPairs,
  when,
} from '../utils'

const whenId = (id, fn) => when(propEq('id', id), fn)
const whereId = id => propEq('id', id)
const removeUndefined = compose(fromPairs, reject(([key, val]) => val === undefined), toPairs)

export default (content = [], action) => {
  const { id, title, component_id } = action.payload
  return guard(
    ['ADD_CONTENT', _ => append({ id, title, component_id }, content)],
    ['UPDATE_CONTENT', _ => map(whenId(id, override(removeUndefined({ title }))), content)],
    ['DELETE_CONTENT', _ => reject(whereId(id), content)],
    [otherwise, content],
  )(action.type)
}
