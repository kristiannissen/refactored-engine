/**
 * @filename List.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `<style></style>
  <div id="selection-list">Hello Kitty</div>`;

class SelectionList extends HTMLElement {
  static get observedAttributes() {
    return ["selections"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.onRender = this.onRender.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {}

  onRender(callback) {
    callback("Hello Kitty Pussy");
  }

  onSelect(callback) {}

  onChange(callback) {}

  setSelections(data) {
    this.data = data;
    console.log(data);
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }

  adopedCallback() {}
}

export default SelectionList;
