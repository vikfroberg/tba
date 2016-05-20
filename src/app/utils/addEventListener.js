export default (el, type, handler) => {
  el.addEventListener(type, handler)
  return () => {
    el.removeEventListener(type, handler)
  }
}
