/**
 * AppForm.js
 */
"use strict";

import { subscribe, publish } from "./../lib/pubsub.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  form {
    padding: 0 12px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    align-content: center;
  }
  .f-g {
    flex: 1;
    align-self: center;
  }
  .f-g:first-child {
    flex: 2;
  }
  input {
    outline: none;
  }
  button {
  
  }
  </style>
  <form autocomplete="off">
    <div class="f-g">
      <label>Name of List</label>
      <input type="text" name="list_name" value="">
    </div>
    <div class="f-g">
      <button type="submit">Save</button>
    </div>
  </form>
  `;

class AppForm extends HTMLElement {
  static get observedAttributes() {
    return ["name", "userid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    let userId = this.getAttribute("userid");

    this._shadowRoot.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();

      let name = e.target["list_name"].value.trim();
      if (name !== "") {
        fetch(`/service/${userId}/lists/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            list_name: name
          })
        })
          .then(response => response.json())
          .then(json => {
            this.setAttribute("name", name);
            publish("list-added", { name: name });
          });
      }
    });
  }
}

export default AppForm;
