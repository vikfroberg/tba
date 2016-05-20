export const async = fn => (obj, next) => next(undefined, fn(obj))

export const composeA = (fns) => done => {
  let i = fns.length - 1
  const next = (err, obj) => {
    if (err) {
      return done(err, undefined)
    }
    if (i >= 0) {
      return fns[i--](obj, next)
    }
    return done(undefined, obj)
  }
  next()
}

export const pipeA = (fns) => done => {
  let i = 0
  const next = (err, obj) => {
    if (err) {
      return done(err, undefined)
    }
    if (i < fns.length) {
      return fns[i++](obj, next)
    }
    return done(undefined, obj)
  }
  next()
}

export const parallelA = fns => (done) => {
  let untilDone = fns.length - 1
  let errs = undefined
  const objs = new Array(fns.length)
  const tick = index => (err, obj) => {
    objs[index] = obj
    if (err) {
      if (errs) {
        errs.push(err)
      } else {
        errs = [err]
      }
    }
    if (untilDone-- === 0) {
      return done(errs, objs)
    }
  }
  fns.forEach((fn, index) => {
    fn(undefined, tick(index))
  })
}
