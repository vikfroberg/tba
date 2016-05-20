import { pick, mergeAll, values } from './ramda'

const vars = {
  'primary': { color: 'green' },
  'bg-primary': { background: 'green' },
  'white': { color: 'white' },
  'grey': { color: '#666' },
  'bold': { fontWeight: 'bold' },
  'bold': { display: 'block' },
  'uppercase': { textTransform: 'uppercase' },
  'center': { textAlign: 'center' },
  'h1': { fontSize: 40 },
  'h3': { fontSize: 20 },
  'p1': { padding: 10 },
  'p2': { padding: 20 },
  'mb1': { marginBottom: 10 },
  'mb2': { marginBottom: 20 },
  'mb4': { marginBottom: 40 },
  'b1': { border: '1px solid #ccc' },
  'g4': { width: '33.33333%' },
  'underline': { textDecoration: 'underline' },
}

export default (...args) => mergeAll(values(pick(args, vars)))
