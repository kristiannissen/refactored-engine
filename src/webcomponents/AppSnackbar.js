/**
 * AppError.js
 * TODO: Rename to something more generic
 */
const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  .snackbar-container {
    background-color: #323232;
    color: #fff;
    padding: 14px 12px;
  }
  </style>
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
    this._parent.addEventListener("list-changed", e => {
      console.log(e.detail);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }
}

export default AppSnackbar;
