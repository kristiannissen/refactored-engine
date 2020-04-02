/**
 * AppList.js
 */
"use strict";

import { publish, subscribe } from "./../lib/pubsub.js";
import { getAll } from "./../lib/dbfunc.js";
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
    // TODO: Add subscribe listener
    getAll().then(resp => this.render(resp));
  }

  render(arr) {
    arr.forEach((item, indx) => {
      // console.log(item)
      let elm = document.createElement('app-list-item')
      elm.setAttribute("key", indx)
      elm.setAttribute("name", item.name)
      this.rootElm.appendChild(elm)
    })
  }
}

export default AppList;
