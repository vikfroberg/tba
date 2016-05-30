import R from 'ramda'
export * from 'ramda'

export const mapIndexed =
  R.addIndex(R.map)

export const forEachIndexed =
  R.addIndex(R.forEach)

export const getPath =
  R.path

export const getKeys =
  R.keys

export const defaults =
  R.flip(R.merge)

export const override =
  R.flip(R.merge)

export const removeIndex =
  R.remove(R.__, 1)

export const trace =
  R.tap(console.log)

export const targetValue =
  R.path(['target', 'value'])

export const invoke =
  R.invoker(0)

export const preventDefault =
  R.tap(invoke('preventDefault'))

export const otherwise =
  R.T

export const notFn =
  R.compose(R.not, R.equals('Function'), R.type)

const adjusts =
  R.compose(
    R.adjust(R.when(notFn, R.always), 1),
    R.adjust(R.when(notFn, R.equals), 0)
  )

export const guard =
  (...conds) => R.cond(R.map(adjusts, conds))
