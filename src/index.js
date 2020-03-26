/**
 * index.js
 * CustomEvent https://gomakethings.com/custom-events-with-vanilla-javascript/
 * HTMLElment https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
 */

/*
(() => {
  const listElm = document.querySelector('app-list')
  if (listElm) listElm.setAttribute('userid', localStorage.getItem('_u') || 0)

  const formElm = document.querySelector('app-form')
  if (formElm) formElm.setAttribute('userid', localStorage.getItem('_u') || 0)
})()
*/

import AppTitle from "./webcomponents/AppTitle.js";
window.customElements.define("app-title", AppTitle);

import AppList from "./webcomponents/AppList.js";
window.customElements.define("app-list", AppList);

import AppSnackbar from "./webcomponents/AppSnackbar.js";
window.customElements.define("app-snackbar", AppSnackbar);

import AppForm from "./webcomponents/AppForm.js";
window.customElements.define("app-form", AppForm);

import AppDialog from "./webcomponents/AppDialog.js";
window.customElements.define("app-dialog", AppDialog);

import { storeItem, fetchItem } from "./lib/storage.js";
import { publish, subscribe } from "./lib/pubsub.js";

document.addEventListener("DOMContentLoaded", e => {
  // Create app title subscriber
  subscribe("app-shell-ready", payload => {
    let headerMount = document.querySelector("header");
    headerMount.innerHTML = `<app-title title="Hello Champ"/>`;
  });
  // Create app list subscriber
  subscribe("app-shell-ready", payload => {
    let mainMount = document.querySelector("main"),
      appList = document.createElement("app-list");

    appList.setAttribute("userid", payload["_u"]);

    mainMount.append(appList);
  });
  // Create app snackbar subscriber
  subscribe("app-shell-ready", payload => {
    let mainMount = document.querySelector("main"),
      appSnackbar = document.createElement("app-snackbar");

    appSnackbar.setAttribute("message", "Hello Govnr!");

    mainMount.append(appSnackbar);
  });

  subscribe("app-shell-ready", payload => {
    let footerMount = document.querySelector("footer"),
      appForm = document.createElement("app-form");

    appForm.setAttribute("userid", payload["_u"]);

    footerMount.append(appForm);
  });

  let _u = fetchItem("_u").then(obj => publish("app-shell-ready", { _u: obj }));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/app/"
      })
      .then(reg => {});
  });
}
