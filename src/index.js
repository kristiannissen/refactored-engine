/**
 * index.js
 * CustomEvent https://gomakethings.com/custom-events-with-vanilla-javascript/
 */

// Paint it black
(() => {
  let r = /\//gi;
  let loc = document.location.pathname.replace(r, '')
  if (loc === '') loc = 'index'
  let bodyElm = document.querySelector('body')
  bodyElm.classList.toggle(`js-${loc}`)
})()

const mount = document.querySelector('#mount')

let h1 = new CustomEvent('hello-1')
let h2 = new CustomEvent('hello-2')

window.onhashchange = () => {
  let hash = location.hash.replace('#', '')
  console.log(hash)
}
