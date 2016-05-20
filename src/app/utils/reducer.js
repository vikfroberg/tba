import { trace, defaults, when, map, filter, otherwise, guard, find, prop, compose, assoc, reject, propEq, append } from './ramda'

let _id = 1

export const getId = _ => _id

export const reducer = (state = { components: [], fields: [], content: [] } , action) => {
  return guard(
    ['@@INIT', _ => {
      _id = 1
      return state
    }],
    ['ADD_COMPONENT', _ => {
      const { name, slug } = action.payload
      return assoc(
        'components',
        append({ id: _id++, name, slug }, state.components),
        state
      )
    }],
    ['UPDATE_COMPONENT', _ => {
      const { id, name, slug } = action.payload
      return assoc(
        'components',
        map(when(propEq('id', id), defaults({ slug, name })), state.components),
        state
      )
    }],
    ['DELETE_COMPONENT', _ => {
      const { id } = action.payload
      return assoc(
        'components',
        reject(propEq('id', id), state.components),
        state
      )
    }],
    ['ADD_FIELD', _ => {
      const { type, name, id, slug, help } = action.payload
      return assoc(
        'fields',
        append({ id: _id++, name, type, component_id: id, slug, help }, state.fields),
        state
      )
    }],
    ['UPDATE_FIELD', _ => {
      const { name, id, slug, help } = action.payload
      return assoc(
        'fields',
        map(when(propEq('id', id), defaults({ slug, name, help })), state.fields),
        state
      )
    }],
    ['DELETE_FIELD', _ => {
      const { id } = action.payload
      return assoc(
        'fields',
        reject(propEq('id', id), state.fields),
        state
      )
    }],
    ['ADD_CONTENT', _ => {
      const { title, component_id, data } = action.payload
      const component = find(propEq('id', component_id), state.components)
      return assoc(
        'content',
        append({
          id: _id++,
          title,
          component_id: component.id,
          component_slug: component.slug,
          data
        }, state.content),
        state
      )
    }],
    ['UPDATE_CONTENT', _ => {
      const { title, id, data } = action.payload
      return assoc(
        'content',
        map(when(propEq('id', id), defaults({ title, data })), state.content),
        state
      )
    }],
    ['DELETE_CONTENT', _ => {
      const { id } = action.payload
      return assoc(
        'content',
        reject(propEq('id', id), state.content),
        state
      )
    }],
    [otherwise, state]
  )(action.type)
}
