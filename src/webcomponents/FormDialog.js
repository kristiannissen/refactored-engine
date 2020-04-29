/**
 * @filename FormDialog.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `<style></style>
<dialog>
  <form method="dialog">
  </form>
</dialog>`;

class FormDialog extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.dialog = this.shadowRoot.querySelector("dialog");
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("changed", name, newVal, oldVal);
    if (name === "open" && this.dialog.hasAttribute("open")) {
      this.dialog.removeAttribute("open");
    } else {
      this.dialog.setAttribute("open", "");
    }
  }

  get open() {
    return this.dialog.hasAttribute("open");
  }

  set open(isOpen) {
    if (isOpen) this.dialog.setAttribute("open", "");
    else this.dialog.removeAttribute("open");
  }

  toggleOpen() {
    if (this.hasAttribute("open") === false) this.setAttribute("open", "");
    else this.removeAttribute("open");
  }
}

export default customElements.define("form-dialog", FormDialog);
