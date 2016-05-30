import { controllersToRoutes } from '../utils'

export default controllersToRoutes([
  ['/admin', require('../controllers/admin').default],
  ['/admin/:component_slug', require('../controllers/create').default],
  ['/admin/content', require('../controllers/content').default],
  ['/admin/components', require('../controllers/components').default],
  ['/admin/components/:component_slug/fields', require('../controllers/fields').default],
])
