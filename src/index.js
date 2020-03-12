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
  listElm.setAttribute('userid', localStorage.getItem('_u') || 0)
})()

import AppTitle from "./webcomponents/AppTitle.js";
window.customElements.define("app-title", AppTitle);

import AppList from "./webcomponents/AppList.js"
window.customElements.define("app-list", AppList)

import AppError from "./webcomponents/AppError.js"
window.customElements.define("app-error", AppError)
