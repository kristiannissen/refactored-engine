/**
 *
 */
"use strict";

import { hasToken, setToken, getToken, removeToken } from "./user.js";
import { ErrorMessages } from "./errors.js";
import { PubSub } from "./pubsub.js";

const TOKEN = "02124309c9867a7616972f52a55db1b4";
setToken(TOKEN);

window.palettes = [
  '916dd5', 'd89cf6', 'f0e3ff', 'e1ccec', 'c9b6e4', 'be9fe1'
]

window.user = {
  setToken: setToken,
  getToken: getToken,
  hasToken: hasToken,
  removeToken: removeToken
};

window.pubSub = new PubSub();

window.fakeFetch = data => {
  let promise = new Promise((resolve, reject) => {
    resolve(data);
    reject("Uups");
  });
  return promise;
};

function updateHTML(html, elm) {
  let newChild = document.createElement("div"),
    oldChild = elm.querySelector("#container");
  newChild.innerHTML = html;

  elm.replaceChild(newChild.querySelector("#container"), oldChild);
  let script = elm.querySelector("[data-script]");
  eval(script.innerText);
}

if ("pushState" in history) {
  window.addEventListener("popstate", e => {
    console.log(e);
    // updateContent(e.state, document.getElementById("container"));
  });
}