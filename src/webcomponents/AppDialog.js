/**
 * AppDialog.js
 */
"use strict";

import { subscribe, publish } from "./../lib/pubsub.js";
import AppTitle from "./AppTitle.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 100%;
    border: none;
    z-index: 3;
    margin: 0;
    padding: 0;
  }
  .d-c {
  }
  .d-c span {
    float: right;
    margin: 0 5px 0;
  }
  .dialog-closed {
    
  }
  </style>
  <dialog></dialog>
`;

class AppDialog extends HTMLElement {
  static get observedAttributes() {
    return ["listid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.diag = this._shadowRoot.querySelector("dialog");
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    subscribe("list-show", payload => {
      this.setAttribute("listid", payload.listid);
      this.toggleOpen();
      this.render();
    });

    subscribe("item-added", payload => {
      let userLists = localStorage.getItem("user_lists") || "[]";
      userLists = JSON.parse(userLists);
      let indx = userLists.findIndex(l => l.id === this.getAttribute("listid"));
      let newList = userLists[indx];
      newList.items.push({
        itemname: payload.itemname,
        quantity: payload.quantity
      });
      userLists.slice(indx, newList);
      localStorage.setItem("user_lists", JSON.stringify(userLists));
      this.render();
      this.pushChanges();
    });

    subscribe("item-removed", payload => {
      let userLists = localStorage.getItem("user_lists") || "[]";
      userLists = JSON.parse(userLists);
      let indx = userLists.findIndex(l => l.id === this.getAttribute("listid"));
      let newList = userLists[indx];
      newList.items.splice(parseInt(payload.indx), 1);
      userLists[indx].items = newList.items;
      localStorage.setItem("user_lists", JSON.stringify(userLists));
      this.render();
      this.pushChanges();
    });
  }

  pushChanges() {
    let listObj = this.getListObject();
    fetch(`/app/service/lists/${listObj.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: listObj.items
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  toggleOpen() {
    if (this.diag.hasAttribute("open")) {
      this.diag.removeAttribute("open");
    } else {
      this.diag.setAttribute("open", true);
    }
  }

  getListObject() {
    let userLists = localStorage.getItem("user_lists") || "[]";
    let list = JSON.parse(userLists);
    let listObj = list.find(
      (item, indx) => item.id === this.getAttribute("listid")
    );
    return listObj;
  }

  render() {
    let userLists = localStorage.getItem("user_lists") || "[]";
    let list = JSON.parse(userLists);
    let listObj = this.getListObject();
    let items = listObj.items.map(
      (item, indx) => `<li data-index="${indx}">${item.itemname}</li>`
    );

    this.diag.innerHTML = `<div class="d-c">
      <span>
        <a href="">Close</a>
      </span>
      <app-title title="${listObj.name}"></app-title>
      <ul>${items}</ul>
      <form autocomplete="off">
        <div class="f-g">
          <label>Grocery</label>
          <input type="text" value="" name="item_name">
        </div>
        <div class="f-g">
          <label>Quantity</label>
          <input type="number" value="" name="item_quantity">
        </div>
        <div class="f-g">
          <input type="submit" value="Save">
        </div>
      </form>
    </div>`;

    let foo = this.diag.querySelector("form");
    foo.addEventListener("submit", e => {
      e.preventDefault();
      publish("item-added", {
        itemname: foo.item_name.value.trim(),
        quantity: foo.item_quantity.value == "" ? "1" : foo.item_quantity.value
      });
    });

    let closeButton = this.diag.querySelector("span > a");
    closeButton.addEventListener("click", e => {
      e.preventDefault();
      this.toggleOpen();
    });

    let elms = this._shadowRoot.querySelectorAll("[data-index]");

    elms.forEach((elm, indx) => {
      elm.addEventListener("click", e => {
        e.preventDefault();
        publish("item-removed", {
          indx: e.target.getAttribute("data-index")
        });
      });
    });
  }
}

export default AppDialog;
