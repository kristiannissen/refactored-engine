/**
 * AppList.js
 */
"use strict";

import { publish, subscribe } from "./../lib/pubsub.js";
import { getAll } from "./../lib/dbfunc.js";
import { storeItem } from "./../lib/storage.js";

import AppListItem from "./AppListItem.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  </style>
  <div id="app-list"></div>`;

class AppList extends HTMLElement {
  static get observedAttributes() {
    return ["userid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.rootElm = this._shadowRoot.querySelector("#app-list");
    window.customElements.define("app-list-item", AppListItem);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    getAll().then(resp => this.render(resp));
    subscribe("list-added", payload =>
      getAll().then(resp => this.render(resp))
    );
    window.addEventListener("popstate", e => console.log(e));
  }

  render(arr) {
    this.rootElm.innerHTML = "";
    arr.forEach(item => {
      let elm = document.createElement("app-list-item");
      elm.setAttribute("name", item.name);
      elm.setAttribute("id", item.id);
      elm.addEventListener("click", e => {
        e.preventDefault();
        storeItem("list_id", item.id).then(() => {
          history.pushState({ id: item.id }, null, "/app/list/");
          location.reload();
        });
      });
      this.rootElm.appendChild(elm);
    });
  }
}

export default AppList;
