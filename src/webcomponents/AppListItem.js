/**
 *
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `<style>
    .list-item {
      padding: 0 10px;
    }
  </style><div class="list-item"></div>`;

class AppListItem extends HTMLElement {
  static get observedAttributes() {
    return ["id", "name"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    let elm = this._shadowRoot.querySelector("div");
    elm.innerHTML = `<a href="/app/list/" data-item-id="${this["id"]}">${
      this["name"]
    }</a>`;
  }
}

export default AppListItem;
