/**
 * AppDialog.js
 */
"use strict";

import { subscribe, publish } from "./../lib/pubsub.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  </style>
  <dialog listid>Hello Kitty</dialog>
`;

class AppDialog extends HTMLElement {
  static get observedAttributes() {
    return ["open", "listid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.userLists = localStorage.getItem("user_lists") || [];
    this.elm = this._shadowRoot.querySelector("dialog");
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    subscribe("list-show", payload => {
      this.elm.setAttribute("open", true);
      this.elm.setAttribute("listid", payload.listid);
    });
    this.render();
  }

  render() {
    
  }
}

export default AppDialog;
