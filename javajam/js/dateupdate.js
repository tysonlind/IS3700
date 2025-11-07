document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('dateupdate')
  if (el) {
    el.innerHTML = 'This page was last modified on: ' + document.lastModified
  }
})
