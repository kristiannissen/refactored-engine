/**
 * @filename List.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `<style>
    [data-select-item] {
      padding: 10px 20px;
    }
  </style>
  <div id="select-list"></div>`;

class SelectList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._root = this._shadowRoot.querySelector("#select-list");

    this.index = -1;
  }

  get selectedIndex() {
    return this.index;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {
    // console.log("connected");
    let options = this._root.querySelectorAll("[data-select-item]");
    this._root.addEventListener("click", e => {
      let opt = e.target;
      for (let i = 0; i < options.length; i++) {
        if (options[i].firstChild === opt) this.index = i;
      }
      const event = new CustomEvent("select", {
        detail: {
          id: opt.parentNode.getAttribute("data-select-item"),
          index: this.index
        }
      });
      e.preventDefault();
      this.dispatchEvent(event);
    });
  }

  disconnectedCallback() {
    // console.log("disconnected");
  }

  add(obj) {
    let elm = document.createElement("div");
    elm.setAttribute("data-select-item", obj.id);
    elm.innerHTML = `<span>${obj.name}</span>`;
    this._root.appendChild(elm);
  }
}

export default customElements.define("select-list", SelectList);
