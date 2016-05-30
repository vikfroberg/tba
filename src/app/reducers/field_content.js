import {
  assoc,
  compose,
  concat,
  guard,
  map,
  or,
  otherwise,
  reduce,
  reject,
  whereEq,
} from '../utils'

export default (field_content = [], action) => {
  const { id, field_data } = action.payload
  const replace = (when, val) => compose(append(val), reject(when))
  return guard(
    ['ADD_CONTENT', _ => concat(map(assoc('content_id', id), field_data), field_content)],
    ['UPDATE_CONTENT', _ => compose(
      concat(map(assoc('content_id', id), field_data)),
      reject(({ content_id, field_id }) =>
        reduce(compose(or, whereEq({ content_id, field_id })), false, field_data))
    )(field_content)],
    [otherwise, field_content],
  )(action.type)
}
