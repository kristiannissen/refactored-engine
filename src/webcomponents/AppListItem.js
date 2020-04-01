/**
 *
 */
"use strict";

import { publish, subscribe } from "./../lib/pubsub.js";

const template = document.createElement("template");
template.innerHTML = `<style></style><div>Hello</div>`;

class AppListItem extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    console.log("Hello");
  }

  connectedCallback() {
    console.log("AppListItem connected");
  }
}

export default AppListItem;
