/**
 * index.js
 * CustomEvent https://gomakethings.com/custom-events-with-vanilla-javascript/
 * HTMLElment https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
 */

// Paint it black
(() => {
  let r = /\//gi;
  let loc = document.location.pathname.replace(r, "");
  if (loc === "") loc = "index";
  let bodyElm = document.querySelector("body");
  bodyElm.classList.toggle(`js-${loc}`);
})();

(() => {
  const listElm = document.querySelector('app-list')
  if (listElm) listElm.setAttribute('userid', localStorage.getItem('_u') || 0)

  const formElm = document.querySelector('app-form')
  if (formElm) formElm.setAttribute('userid', localStorage.getItem('_u') || 0)
})()

import AppTitle from "./webcomponents/AppTitle.js";
window.customElements.define("app-title", AppTitle);

import AppList from "./webcomponents/AppList.js"
window.customElements.define("app-list", AppList)

import AppSnackbar from "./webcomponents/AppSnackbar.js"
window.customElements.define("app-snackbar", AppSnackbar)

import AppForm from "./webcomponents/AppForm.js"
window.customElements.define("app-form", AppForm)

import AppDialog from "./webcomponents/AppDialog.js"
window.customElements.define("app-dialog", AppDialog)

