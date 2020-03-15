/**
 * AppError.js
 * TODO: Rename to something more generic
 */
import { publish, subscribe } from "./../lib/pubsub.js";

const template = document.createElement("template");
template.innerHTML = `
  <div class="snackbar-container">Here</div>`;

class AppSnackbar extends HTMLElement {
  static get observedAttributes() {
    return ["message", "level"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._parent = this._shadowRoot.host.parentNode;
  }

  connectedCallback() {
    subscribe("list-changed", payload => console.log("snackbar", payload));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }
}

export default AppSnackbar;
