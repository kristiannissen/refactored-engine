/**
 * AppError.js
 * TODO: Rename to something more generic
 */
const template = document.createElement("template");
template.innerHTML = `<div>Here</div>`;

class AppError extends HTMLElement {
  static get observedAttributes() {
    return ["message", "level"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("connected");
    this.addEventListener("list-changed", e => console.log(e));
  }
}

export default AppError;
