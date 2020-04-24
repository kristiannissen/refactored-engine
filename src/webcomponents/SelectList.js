/**
 * @filename List.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = '<div id="mount"></div>';

class SelectList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._root = this._shadowRoot.querySelector("#mount");

    this.index = -1;
    this.options = [];
    this.addEventListener = this.addEventListener.bind(this);
  }

  get selectedIndex() {
    return this.index;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {
    console.log("connected", this.options);
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  adopedCallback() {}

  add(opt) {
    this._root.appendChild(opt);
  }
}

export default customElements.define("select-list", SelectList);
