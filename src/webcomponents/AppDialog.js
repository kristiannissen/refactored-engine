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
  dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 100%;
    border: none;
    z-index: 3;
  }
  .dialog-closed {
    
  }
  </style>
  <dialog>Hello Kitty</dialog>
`;

class AppDialog extends HTMLElement {
  static get observedAttributes() {
    return ["listid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.userLists = localStorage.getItem("user_lists") || "[]";
    this.diag = this._shadowRoot.querySelector("dialog");
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    subscribe("list-show", payload => {
      this.setAttribute("listid", payload.listid);
      this.toggleOpen();
      this.render();
    });
  }

  toggleOpen() {
    if (this.diag.hasAttribute("open")) {
      this.diag.removeAttribute("open");
    } else {
      this.diag.setAttribute("open", true);
    }
  }

  render() {
    let list = JSON.parse(this.userLists);
    let listObj = list.find(
      (item, indx) => item.id === this.getAttribute("listid")
    );
  }
}

export default AppDialog;
