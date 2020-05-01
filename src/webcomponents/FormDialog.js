/**
 * @filename FormDialog.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
<style>
  dialog {
    max-height: 360px;
    min-width: 240px;
    max-width: 240px;
    border-radius: 4px;
    border: none;
  }
  .dialog__title {
    margin-top: 0px;
    line-height: 2rem;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.125rem;
    position: relative;
    margin: 0;
    padding: 0 24px 9px;
  }
  form {
    padding: 0 24px 9px;
  }
  .dialog__actions {
    display: flex;
    position: relative;
    flex-shrink: wrap;
    align-items: center;
    justify-content: flex-end;
    min-height: 52px;
    margin: 0;
    padding: 0;
  }
</style>
<dialog>
  <h2 class="dialog__title">Form Title</h2>
  <form method="dialog" id="form">
  <footer class="dialog__actions">
    <button type="submit">Save</button>
    <button type="reset">Cancel</button>
  </footer>
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
    this.dialog
      .querySelector("[type='reset']")
      .addEventListener("click", e => this.dialog.close());
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
