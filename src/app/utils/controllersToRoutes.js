import {
  reduce,
  concat,
  reverse,
} from './ramda'

export const controllerToRoutes = ([path, Controller]) => {
  const c = new Controller()
  return [
    ['GET', `${path}`, context => c.index(context)],
    ['GET', `${path}/new`, context => c.new(context)],
    ['POST', `${path}/new`, context => c.create(context)],
    ['GET', `${path}/:slug`, context => c.show(context)],
    ['GET', `${path}/:slug/edit`, context => c.edit(context)],
    ['POST', `${path}/:slug/edit`, context => c.update(context)],
    ['GET', `${path}/:slug/delete`, context => c.destroy(context)],
  ]
}

export const controllersToRoutes = controllers => reduce((acc, Controller) =>
  concat(acc, controllerToRoutes(Controller)), [], reverse(controllers))
