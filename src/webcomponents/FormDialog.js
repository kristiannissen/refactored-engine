/**
 * @filename FormDialog.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `<style></style>
<dialog>
  <form method="dialog" id="form">
  <button type="submit">Save</button>
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
    this.formData = {};
  }

  connectedCallback() {
    this.dialog.querySelector("form").addEventListener("submit", e => {
      Array.from(e.target.elements).forEach(elm => {
        if (Object.keys(this.formData).includes(elm.name)) {
          this.formData[elm.name] = elm.value;
        }
      });
      let customEvent = new CustomEvent("close", {
        detail: {
          formData: this.formData
        }
      });
      this.dispatchEvent(customEvent);
    });
  }

  formData() {
    return this.formData;
  }

  disconnectedCallback() {
    this.dialog.removeAttribute("open");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("changed", name, newVal, oldVal);
    if (name === "open" && this.dialog.hasAttribute("open") === false) {
      this.dialog.showModal();
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

  addField(fields) {
    let elm = document.createElement("input");
    elm.type = fields.type; // Builder needed
    elm.name = fields.name;
    elm.value = fields.value;
    elm.placeholder = fields.placeholder;
    let foo = this.dialog.querySelector("form");
    foo.prepend(elm);

    this.formData[fields.name] = fields.value;
  }
}

export default customElements.define("form-dialog", FormDialog);
