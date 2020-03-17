/**
 * AppList.js
 */
"use strict";

import { publish, subscribe } from "./../lib/pubsub.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    ul:not(.browser-default) {
      padding-left: 0;
      list-style-type: none;
    }
    ul:not(.browser-default)>li {
      list-style-type: none;
    }
    ul {
      margin: .5rem 0 1rem 0;
      overflow: hidden;
      position: relative;
    }
    li {
      line-height: 1.5rem;
      padding: 10px 20px;
      margin: 0;
      display: flex;
    }
    li span {
      flex: 1;
    }
    span.primary {
      flex: 2;
    }
  </style>
  <ul></ul>`;

class AppList extends HTMLElement {
  static get observedAttributes() {
    return ["userid"];
  }

  constructor(...args) {
    super(...args);
    this._list = [];
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._parent = this._shadowRoot.host.parentNode;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    this._updateList();
    subscribe("list-added", () => this._updateList());
  }

  _updateList() {
    fetch(`/service/${this.userid}/lists/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
      })
      .then(json => {
        this._list = json.user_lists;
        localStorage.setItem("user_lists", JSON.stringify(json.user_lists));
        this.render();

        publish("list-fetched", {
          items: json.user_lists.length
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    let list = this._shadowRoot.querySelector("ul");
    list.innerHTML = "";

    this._list.forEach((item, indx) => {
      let liElm = document.createElement("li");
      liElm.innerHTML = `<div data-list-id="${item.id}">
          <span class="primary">${item.name}</span>
          <span class="secondary">
            <span class="badge">${item.items.length}</span>
          </span>
        </div>`;
      liElm.addEventListener("click", e => {
        publish("list-show", {
          listid: e.target
            .closest("[data-list-id]")
            .getAttribute("data-list-id")
        });
      });
      list.appendChild(liElm);
    });
  }
}

export default AppList;
