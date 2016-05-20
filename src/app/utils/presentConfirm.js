export default text => e => {
  const r = confirm(text)
  if (r === false) {
    e.preventDefault()
  }
}
