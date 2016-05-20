export default (middlewares, context, done) => {
  let i = 0
  let next = () => {
    if (i < middlewares.length) {
      const fn = middlewares[i++]
      fn(context, next)
    } else {
      done(context)
    }
  }
  next()
}
