/**
 * @filename List.js
 */
"use strict";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  *, *::before, *::after {
    box-sizing: border-box;
  }
  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .list-item {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
    overflow: hidden;
    height: 48px;
    cursor: pointer;
  }
  .list-item__text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  </style>
  <ul class="list"></ul>`;

class SelectList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._root = this._shadowRoot.querySelector(".list");

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
    let elm = document.createElement("li");
    elm.className = "list-item";
    elm.setAttribute("data-select-item", obj.id);
    elm.innerHTML = `<span class="list-item__text"">${obj.name}</span>`;
    this._root.appendChild(elm);
  }
}

export default customElements.define("select-list", SelectList);
