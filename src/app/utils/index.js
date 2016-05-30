export withProps from './withProps'
export withReducer from './withReducer'
export css from './css'
export render from './render'
export presentConfirm from './presentConfirm'
export addEventListener from './addEventListener'
export toUri from './toUri'
export post from './post'
export runMiddlewares from './runMiddlewares'
export * from './controllersToRoutes'
export * from './ramda'
export * from './async'

export const generateUuid = () => {
  const id = "00000000" + Math.floor(Math.random() * 999999999)
  return id.slice(id.length - 9, id.length)
}
