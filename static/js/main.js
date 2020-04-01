/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return publish; });
/**
 * PubSub.js
 * subscribers{key: []}
 */

let subscribers = {};

const subscribe = (message, callback) => {
  // console.log("subscribe", message, callback);
  if (Object.keys(subscribers).includes(message) === false) {
    subscribers[message] = [];
  }

  subscribers[message].push(callback);
};

const publish = (message, payload) => {
  // console.log("publish", message, payload);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * AppTitle
 */


const template = document.createElement("template");
template.innerHTML = `
<style>
h1 {
  color: #fff;
  margin: 0;
}
/* Small devices (landscape phones, 576px and up) */
@media (max-width: 575.98px) {
  h1 {
    font-size: 1.25rem;
    text-align: center;
  }
}
/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {

}
/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {

}
/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) {
  
}
</style>
<h1></h1>
`;

class AppTitle extends HTMLElement {
  constructor() {
    super();
    this._title = "";
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    if (this.hasAttribute("title")) {
      this.title = this.getAttribute("title");
    }
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._title = newValue;
    }
  }

  render() {
    this._shadowRoot.querySelector("h1").innerHTML = this.title;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppTitle);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webcomponents_AppTitle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webcomponents_AppList_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webcomponents_AppSnackbar_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webcomponents_AppForm_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webcomponents_AppDialog_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_storage_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__ = __webpack_require__(0);
/**
 * Filename: index.js
 */


window.customElements.define("app-title", __WEBPACK_IMPORTED_MODULE_0__webcomponents_AppTitle_js__["a" /* default */]);


window.customElements.define("app-list", __WEBPACK_IMPORTED_MODULE_1__webcomponents_AppList_js__["a" /* default */]);


window.customElements.define("app-snackbar", __WEBPACK_IMPORTED_MODULE_2__webcomponents_AppSnackbar_js__["a" /* default */]);


window.customElements.define("app-form", __WEBPACK_IMPORTED_MODULE_3__webcomponents_AppForm_js__["a" /* default */]);


window.customElements.define("app-dialog", __WEBPACK_IMPORTED_MODULE_4__webcomponents_AppDialog_js__["a" /* default */]);




document.addEventListener("DOMContentLoaded", e => {
  // Create app title subscriber
  Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["b" /* subscribe */])("app-shell-ready", payload => {
    let headerMount = document.querySelector("header");
    headerMount.innerHTML = `<app-title title="Hello Champ"/>`;
  });
  // Create app list subscriber
  Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["b" /* subscribe */])("app-shell-ready", payload => {
    let mainMount = document.querySelector("main"),
      appList = document.createElement("app-list");

    appList.setAttribute("userid", payload["_u"]);

    mainMount.append(appList);
  });
  // Create app snackbar subscriber
  Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["b" /* subscribe */])("app-shell-ready", payload => {
    let mainMount = document.querySelector("main"),
      appSnackbar = document.createElement("app-snackbar");

    appSnackbar.setAttribute("message", "Hello Govnr!");

    mainMount.append(appSnackbar);
  });

  Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["b" /* subscribe */])("app-shell-ready", payload => {
    let footerMount = document.querySelector("footer"),
      appForm = document.createElement("app-form");

    appForm.setAttribute("userid", payload["_u"]);
    appForm.setAttribute("name", "");

    footerMount.append(appForm);
  });

  let _u = Object(__WEBPACK_IMPORTED_MODULE_5__lib_storage_js__["a" /* fetchItem */])("_u").then(obj => Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["a" /* publish */])("app-shell-ready", { _u: obj }));
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js", { scope: "/app/" })
    .then(registration => {
      /*
      let appFoo = document.querySelector("app-form"),
        foo = appFoo._shadowRoot.querySelector("form");
      foo.addEventListener("submit", e => {
        if (registration.sync) {
          registration.sync
            .register("save-list")
            .catch(err => console.log(err));
        }
      });
      */
    });
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(0);
/**
 * AppList.js
 */




const template = document.createElement("template");
template.innerHTML = `
  <style>
    #app-list {
    }
    .badge {
      margin-top: calc(.75rem - 11px);
      font-weight: 300;
      font-size: 0.8rem;
      color: #fff;
      background-color: #26a69a;
      border-radius: 2px;
      min-width: 3rem;
      padding: 0 6px;
      margin-left: 14px;
      text-align: center;
      line-height: 22px;
      height: 22px;
      float: right;
      box-sizing: border-box;
    }
    ul {
      list-style-type: none;
      margin: 0px;
      padding: 0px;
    }
    li {
      padding: 10px;
    }
  </style>
  <div id="app-list"><ul></ul></div>`;

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
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("list-added", () => this._updateList());
  }

  _updateList() {
    fetch(`/app/service/${this.userid}/lists/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        this._list = json.user_lists;
        this.render();

        Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("list-fetched", {
          items: json.user_lists.length
        });
      })
      .catch(error => {
        // TODO: indexedDB
        console.log(error);
      });
  }

  render() {
    let list = this._shadowRoot.querySelector("ul");
    list.innerHTML = "";

    this._list.forEach((item, indx) => {
      let liElm = document.createElement("li");
      liElm.innerHTML = `<div data-list-id="${item.id}">
          <span class="primary">
            ${item.name}
          </span>
          <span class="secondary">
            <span class="badge">${item.items.length}</span>
          </span>
        </div>`;
      liElm.addEventListener("click", e => {
        /*publish("list-show", {
          listid: e.target
            .closest("[data-list-id]")
            .getAttribute("data-list-id")
        });*/
        // history.pushState({ id: 1 }, null, "/app/list/");
      });
      list.appendChild(liElm);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppList);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(0);
/**
 * AppError.js
 * TODO: Rename to something more generic
 */




const template = document.createElement("template");
template.innerHTML = `
  <style>
  #snackbar-container {
    position: fixed;
    z-index: 1000;
    min-width: 100%;
    bottom: 0%;
    border-radius: 2px;
  }
  #snackbar {
    border-radius: 2px;
    width: auto;
    margin-top: 10px;
    position: relative;
    max-width: 100%;
    height: auto;
    min-height: 48px;
    line-height: 1.5em;
    background-color: #323232;
    padding: 10px 25px;
    font-size: 1.1rem;
    font-weight: 300;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    cursor: default
  }
  </style>
  <div id="snackbar-container" style="display: block;">
    <div id="snackbar"></div>
  </div>`;

class AppSnackbar extends HTMLElement {
  static get observedAttributes() {
    return ["message"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = this._shadowRoot.getElementById("snackbar-container");
    this.snackbarElm = this._shadowRoot.getElementById("snackbar");
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
      this.snackbarElm.innerHTML = `<span>${newValue}</span>`;
      setTimeout(() => this.toggleDisplay(), 1500);
    }
  }

  toggleDisplay() {
    if (this.elm.style.display === "block") this.elm.style.display = "none";
    else this.elm.style.display = "block";
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppSnackbar);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_dbfunc_js__ = __webpack_require__(9);
/**
 * AppForm.js
 */





const template = document.createElement("template");
template.innerHTML = `
  <style>
  .f-g {
    flex-grow: 1;
    text-align: center;
  }
  form {
    display: flex;
    align-items: baseline;
  }
  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #481380;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
  }
  input:focus {
    border-bottom: 1px solid #26a69a;
    box-shadow: 0 1px 0 0 #26a69a;
  }
  input:focus + label {
    color: #26a69a;
    top: -.25rem;
  }
  label {
    left: 0;
    top: 1rem;
    color: #9e9e9e;
    position: absolute;
    font-size: 1rem;
  }
  button {
    text-decoration: none;
    color: #fff;
    background-color: #26a69a;
    text-align: center;
    letter-spacing: .5px;
    font-size: 14px;
    outline: 0;
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  </style>
  <form autocomplete="off">
    <div class="f-g">      
      <input type="text" name="list_name" value="">
      <label>Name of List</label>
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
      this.setAttribute("name", name);
      if (name !== "") {
        Object(__WEBPACK_IMPORTED_MODULE_1__lib_dbfunc_js__["a" /* add */])({
          id: Math.floor(Math.random() * Date.now()),
          name: name,
          items: []
        }).then(resp => {
          console.log("indexedDB", resp);
          if ("SyncManager" in window) {
            navigator.serviceWorker.ready.then(reg =>
              reg.sync.register("list-added")
            );
          }
        });
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppForm);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AppTitle_js__ = __webpack_require__(1);
/**
 * AppDialog.js
 */





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
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("list-show", payload => {
      this.setAttribute("listid", payload.listid);
      this.toggleOpen();
      this.render();
    });

    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("item-added", payload => {
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

    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("item-removed", payload => {
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
      Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("item-added", {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("item-removed", {
          indx: e.target.getAttribute("data-index")
        });
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppDialog);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export storeItem */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchItem; });
/**
 * storage.js
 */
const storeItem = (key, obj) => {
  return new Promise((resolve, reject) => {
    let str = JSON.stringify(obj);
    localStorage.setItem(key, str);
    resolve(str.length);
  });
};

const fetchItem = key => {
  return new Promise((resolve, reject) => {
    let item = localStorage.getItem(key);
    if (item == null) {
      return reject(`${key} not found`);
    } else {
      return resolve(JSON.parse(item));
    }
  });
};




/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return add; });
/* unused harmony export remove */
/* unused harmony export get */
/**
 * Filename: dbfunc.js
 */

const DB_NAME = "grocery_list";
const DB_VERSION = 1;
/**
 * @param name string
 * @param version int
 */
const db = (name, version) => {
  return new Promise((resolve, reject) => {
    let req = indexedDB.open(name, version);
    req.onupgradeneeded = event => {
      event.target.result.createObjectStore(name, {
        autoIncrement: false,
        keyPath: "id"
      });
    };
    req.onsuccess = event => resolve(event.target.result);
    req.onerror = event => reject(event.target);
  });
};
/**
 * @param schema string
 * @param obj object | array
 */
const add = obj => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      store.add(obj);
      trans.oncomplete = event => resolve(event.type);
      trans.onerror = event => reject(event.target);
    });
  });
};
/**
 * @param key string
 */
const remove = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      let req = store.delete(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};
/**
 * @param key string
 */
const get = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readonly");
      let store = trans.objectStore(DB_NAME);
      let req = store.get(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWJjZTBmNjdlM2QzYWU2NGY3YTYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvZGJmdW5jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVROzs7Ozs7OztBQzVCUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRStCO0FBQ0Y7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSCxvTUFBbUUsVUFBVTtBQUM3RSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxvQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQzVFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUU2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEVBQUU7QUFDWCw4QkFBOEIsUUFBUTtBQUN0QyxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMvR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNoRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNkI7QUFDZjs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDdkhBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLFdBQVc7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxLQUFLLElBQUksY0FBYztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDckxBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVROzs7Ozs7Ozs7OztBQ3RCUjtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWJjZTBmNjdlM2QzYWU2NGY3YTYiLCIvKipcbiAqIFB1YlN1Yi5qc1xuICogc3Vic2NyaWJlcnN7a2V5OiBbXX1cbiAqL1xuXG5sZXQgc3Vic2NyaWJlcnMgPSB7fTtcblxuY29uc3Qgc3Vic2NyaWJlID0gKG1lc3NhZ2UsIGNhbGxiYWNrKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic3Vic2NyaWJlXCIsIG1lc3NhZ2UsIGNhbGxiYWNrKTtcbiAgaWYgKE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5pbmNsdWRlcyhtZXNzYWdlKSA9PT0gZmFsc2UpIHtcbiAgICBzdWJzY3JpYmVyc1ttZXNzYWdlXSA9IFtdO1xuICB9XG5cbiAgc3Vic2NyaWJlcnNbbWVzc2FnZV0ucHVzaChjYWxsYmFjayk7XG59O1xuXG5jb25zdCBwdWJsaXNoID0gKG1lc3NhZ2UsIHBheWxvYWQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwdWJsaXNoXCIsIG1lc3NhZ2UsIHBheWxvYWQpO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSB0cnVlKSB7XG4gICAgbGV0IHN1YnMgPSBzdWJzY3JpYmVyc1ttZXNzYWdlXTtcbiAgICBmb3IgKGxldCBzIGluIHN1YnMpIHtcbiAgICAgIHN1YnNbc10ocGF5bG9hZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IGNvbnNvbGUubG9nKFwiVE9ET1wiKTtcblxuZXhwb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWIvcHVic3ViLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwVGl0bGVcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuPHN0eWxlPlxuaDEge1xuICBjb2xvcjogI2ZmZjtcbiAgbWFyZ2luOiAwO1xufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgNTc2cHggYW5kIHVwKSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG4gIGgxIHtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG4vKiBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCBsZXNzIHRoYW4gNzY4cHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcblxufVxuLyogTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIGxlc3MgdGhhbiA5OTJweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuXG59XG4vKiBMYXJnZSBkZXZpY2VzIChkZXNrdG9wcywgbGVzcyB0aGFuIDEyMDBweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTk5Ljk4cHgpIHtcbiAgXG59XG48L3N0eWxlPlxuPGgxPjwvaDE+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl90aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widGl0bGVcIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJ0aXRsZVwiKSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdGl0bGUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gdGhpcy50aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBUaXRsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWxlbmFtZTogaW5kZXguanNcbiAqL1xuXG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC10aXRsZVwiLCBBcHBUaXRsZSk7XG5cbmltcG9ydCBBcHBMaXN0IGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1saXN0XCIsIEFwcExpc3QpO1xuXG5pbXBvcnQgQXBwU25hY2tiYXIgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1zbmFja2JhclwiLCBBcHBTbmFja2Jhcik7XG5cbmltcG9ydCBBcHBGb3JtIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1mb3JtXCIsIEFwcEZvcm0pO1xuXG5pbXBvcnQgQXBwRGlhbG9nIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWRpYWxvZ1wiLCBBcHBEaWFsb2cpO1xuXG5pbXBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9IGZyb20gXCIuL2xpYi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi9saWIvcHVic3ViLmpzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGUgPT4ge1xuICAvLyBDcmVhdGUgYXBwIHRpdGxlIHN1YnNjcmliZXJcbiAgc3Vic2NyaWJlKFwiYXBwLXNoZWxsLXJlYWR5XCIsIHBheWxvYWQgPT4ge1xuICAgIGxldCBoZWFkZXJNb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyTW91bnQuaW5uZXJIVE1MID0gYDxhcHAtdGl0bGUgdGl0bGU9XCJIZWxsbyBDaGFtcFwiLz5gO1xuICB9KTtcbiAgLy8gQ3JlYXRlIGFwcCBsaXN0IHN1YnNjcmliZXJcbiAgc3Vic2NyaWJlKFwiYXBwLXNoZWxsLXJlYWR5XCIsIHBheWxvYWQgPT4ge1xuICAgIGxldCBtYWluTW91bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKSxcbiAgICAgIGFwcExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLWxpc3RcIik7XG5cbiAgICBhcHBMaXN0LnNldEF0dHJpYnV0ZShcInVzZXJpZFwiLCBwYXlsb2FkW1wiX3VcIl0pO1xuXG4gICAgbWFpbk1vdW50LmFwcGVuZChhcHBMaXN0KTtcbiAgfSk7XG4gIC8vIENyZWF0ZSBhcHAgc25hY2tiYXIgc3Vic2NyaWJlclxuICBzdWJzY3JpYmUoXCJhcHAtc2hlbGwtcmVhZHlcIiwgcGF5bG9hZCA9PiB7XG4gICAgbGV0IG1haW5Nb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpLFxuICAgICAgYXBwU25hY2tiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLXNuYWNrYmFyXCIpO1xuXG4gICAgYXBwU25hY2tiYXIuc2V0QXR0cmlidXRlKFwibWVzc2FnZVwiLCBcIkhlbGxvIEdvdm5yIVwiKTtcblxuICAgIG1haW5Nb3VudC5hcHBlbmQoYXBwU25hY2tiYXIpO1xuICB9KTtcblxuICBzdWJzY3JpYmUoXCJhcHAtc2hlbGwtcmVhZHlcIiwgcGF5bG9hZCA9PiB7XG4gICAgbGV0IGZvb3Rlck1vdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvb3RlclwiKSxcbiAgICAgIGFwcEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLWZvcm1cIik7XG5cbiAgICBhcHBGb3JtLnNldEF0dHJpYnV0ZShcInVzZXJpZFwiLCBwYXlsb2FkW1wiX3VcIl0pO1xuICAgIGFwcEZvcm0uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIlwiKTtcblxuICAgIGZvb3Rlck1vdW50LmFwcGVuZChhcHBGb3JtKTtcbiAgfSk7XG5cbiAgbGV0IF91ID0gZmV0Y2hJdGVtKFwiX3VcIikudGhlbihvYmogPT4gcHVibGlzaChcImFwcC1zaGVsbC1yZWFkeVwiLCB7IF91OiBvYmogfSkpO1xufSk7XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcbiAgICAucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSlcbiAgICAudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgLypcbiAgICAgIGxldCBhcHBGb28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXBwLWZvcm1cIiksXG4gICAgICAgIGZvbyA9IGFwcEZvby5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICAgIGZvby5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgICBpZiAocmVnaXN0cmF0aW9uLnN5bmMpIHtcbiAgICAgICAgICByZWdpc3RyYXRpb24uc3luY1xuICAgICAgICAgICAgLnJlZ2lzdGVyKFwic2F2ZS1saXN0XCIpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgICovXG4gICAgfSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcExpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9IGZyb20gXCIuLy4uL2xpYi9wdWJzdWIuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgICAjYXBwLWxpc3Qge1xuICAgIH1cbiAgICAuYmFkZ2Uge1xuICAgICAgbWFyZ2luLXRvcDogY2FsYyguNzVyZW0gLSAxMXB4KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgIG1pbi13aWR0aDogM3JlbTtcbiAgICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDE0cHg7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICAgIGhlaWdodDogMjJweDtcbiAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgfVxuICAgIHVsIHtcbiAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgICAgIG1hcmdpbjogMHB4O1xuICAgICAgcGFkZGluZzogMHB4O1xuICAgIH1cbiAgICBsaSB7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cImFwcC1saXN0XCI+PHVsPjwvdWw+PC9kaXY+YDtcblxuY2xhc3MgQXBwTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9saXN0ID0gW107XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fc2hhZG93Um9vdC5ob3N0LnBhcmVudE5vZGU7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX3VwZGF0ZUxpc3QoKTtcbiAgICBzdWJzY3JpYmUoXCJsaXN0LWFkZGVkXCIsICgpID0+IHRoaXMuX3VwZGF0ZUxpc3QoKSk7XG4gIH1cblxuICBfdXBkYXRlTGlzdCgpIHtcbiAgICBmZXRjaChgL2FwcC9zZXJ2aWNlLyR7dGhpcy51c2VyaWR9L2xpc3RzL2ApXG4gICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGpzb24udXNlcl9saXN0cztcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICBwdWJsaXNoKFwibGlzdC1mZXRjaGVkXCIsIHtcbiAgICAgICAgICBpdGVtczoganNvbi51c2VyX2xpc3RzLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAvLyBUT0RPOiBpbmRleGVkREJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGxpc3QgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICBsaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0sIGluZHgpID0+IHtcbiAgICAgIGxldCBsaUVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIGxpRWxtLmlubmVySFRNTCA9IGA8ZGl2IGRhdGEtbGlzdC1pZD1cIiR7aXRlbS5pZH1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnlcIj5cbiAgICAgICAgICAgICR7aXRlbS5uYW1lfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPiR7aXRlbS5pdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgIGxpRWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgLypwdWJsaXNoKFwibGlzdC1zaG93XCIsIHtcbiAgICAgICAgICBsaXN0aWQ6IGUudGFyZ2V0XG4gICAgICAgICAgICAuY2xvc2VzdChcIltkYXRhLWxpc3QtaWRdXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1saXN0LWlkXCIpXG4gICAgICAgIH0pOyovXG4gICAgICAgIC8vIGhpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IDEgfSwgbnVsbCwgXCIvYXBwL2xpc3QvXCIpO1xuICAgICAgfSk7XG4gICAgICBsaXN0LmFwcGVuZENoaWxkKGxpRWxtKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBMaXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwRXJyb3IuanNcbiAqIFRPRE86IFJlbmFtZSB0byBzb21ldGhpbmcgbW9yZSBnZW5lcmljXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICNzbmFja2Jhci1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBib3R0b206IDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgfVxuICAjc25hY2tiYXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB3aWR0aDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjMyMzI7XG4gICAgcGFkZGluZzogMTBweCAyNXB4O1xuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcbiAgICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XG4gICAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgY3Vyc29yOiBkZWZhdWx0XG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cInNuYWNrYmFyLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+XG4gICAgPGRpdiBpZD1cInNuYWNrYmFyXCI+PC9kaXY+XG4gIDwvZGl2PmA7XG5cbmNsYXNzIEFwcFNuYWNrYmFyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibWVzc2FnZVwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJzbmFja2Jhci1jb250YWluZXJcIik7XG4gICAgdGhpcy5zbmFja2JhckVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJzbmFja2JhclwiKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge31cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5zbmFja2JhckVsbS5pbm5lckhUTUwgPSBgPHNwYW4+JHtuZXdWYWx1ZX08L3NwYW4+YDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50b2dnbGVEaXNwbGF5KCksIDE1MDApO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgaWYgKHRoaXMuZWxtLnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIikgdGhpcy5lbG0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGVsc2UgdGhpcy5lbG0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBTbmFja2JhcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBcHBGb3JtLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5pbXBvcnQgeyBhZGQgfSBmcm9tIFwiLi8uLi9saWIvZGJmdW5jLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gIC5mLWcge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgZm9ybSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIH1cbiAgaW5wdXQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzQ4MTM4MDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgaGVpZ2h0OiAzcmVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbiAgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjZhNjlhO1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgMCAjMjZhNjlhO1xuICB9XG4gIGlucHV0OmZvY3VzICsgbGFiZWwge1xuICAgIGNvbG9yOiAjMjZhNjlhO1xuICAgIHRvcDogLS4yNXJlbTtcbiAgfVxuICBsYWJlbCB7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDFyZW07XG4gICAgY29sb3I6ICM5ZTllOWU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgfVxuICBidXR0b24ge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsZXR0ZXItc3BhY2luZzogLjVweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwwLjIpO1xuICB9XG4gIDwvc3R5bGU+XG4gIDxmb3JtIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgIDxkaXYgY2xhc3M9XCJmLWdcIj4gICAgICBcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsaXN0X25hbWVcIiB2YWx1ZT1cIlwiPlxuICAgICAgPGxhYmVsPk5hbWUgb2YgTGlzdDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Zvcm0+XG4gIGA7XG5cbmNsYXNzIEFwcEZvcm0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJuYW1lXCIsIFwidXNlcmlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGxldCB1c2VySWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcInVzZXJpZFwiKTtcblxuICAgIHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgbGV0IG5hbWUgPSBlLnRhcmdldFtcImxpc3RfbmFtZVwiXS52YWx1ZS50cmltKCk7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgbmFtZSk7XG4gICAgICBpZiAobmFtZSAhPT0gXCJcIikge1xuICAgICAgICBhZGQoe1xuICAgICAgICAgIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBEYXRlLm5vdygpKSxcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9KS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5kZXhlZERCXCIsIHJlc3ApO1xuICAgICAgICAgIGlmIChcIlN5bmNNYW5hZ2VyXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKHJlZyA9PlxuICAgICAgICAgICAgICByZWcuc3luYy5yZWdpc3RlcihcImxpc3QtYWRkZWRcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBGb3JtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2ViY29tcG9uZW50cy9BcHBGb3JtLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwRGlhbG9nLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vQXBwVGl0bGUuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGRpYWxvZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICB6LWluZGV4OiAzO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIC5kLWMge1xuICB9XG4gIC5kLWMgc3BhbiB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbjogMCA1cHggMDtcbiAgfVxuICAuZGlhbG9nLWNsb3NlZCB7XG4gICAgXG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpYWxvZz48L2RpYWxvZz5cbmA7XG5cbmNsYXNzIEFwcERpYWxvZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcImxpc3RpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmRpYWcgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1zaG93XCIsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIiwgcGF5bG9hZC5saXN0aWQpO1xuICAgICAgdGhpcy50b2dnbGVPcGVuKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaWJlKFwiaXRlbS1hZGRlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICBpdGVtbmFtZTogcGF5bG9hZC5pdGVtbmFtZSxcbiAgICAgICAgcXVhbnRpdHk6IHBheWxvYWQucXVhbnRpdHlcbiAgICAgIH0pO1xuICAgICAgdXNlckxpc3RzLnNsaWNlKGluZHgsIG5ld0xpc3QpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2xpc3RzXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJMaXN0cykpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucHVzaENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHN1YnNjcmliZShcIml0ZW0tcmVtb3ZlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnNwbGljZShwYXJzZUludChwYXlsb2FkLmluZHgpLCAxKTtcbiAgICAgIHVzZXJMaXN0c1tpbmR4XS5pdGVtcyA9IG5ld0xpc3QuaXRlbXM7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJfbGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkodXNlckxpc3RzKSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5wdXNoQ2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVzaENoYW5nZXMoKSB7XG4gICAgbGV0IGxpc3RPYmogPSB0aGlzLmdldExpc3RPYmplY3QoKTtcbiAgICBmZXRjaChgL2FwcC9zZXJ2aWNlL2xpc3RzLyR7bGlzdE9iai5pZH0vYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGl0ZW1zOiBsaXN0T2JqLml0ZW1zXG4gICAgICB9KVxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihqc29uID0+IGNvbnNvbGUubG9nKGpzb24pKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7XG4gICAgaWYgKHRoaXMuZGlhZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpKSB7XG4gICAgICB0aGlzLmRpYWcucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFnLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGlzdE9iamVjdCgpIHtcbiAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICBsZXQgbGlzdCA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICBsZXQgbGlzdE9iaiA9IGxpc3QuZmluZChcbiAgICAgIChpdGVtLCBpbmR4KSA9PiBpdGVtLmlkID09PSB0aGlzLmdldEF0dHJpYnV0ZShcImxpc3RpZFwiKVxuICAgICk7XG4gICAgcmV0dXJuIGxpc3RPYmo7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHVzZXJMaXN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9saXN0c1wiKSB8fCBcIltdXCI7XG4gICAgbGV0IGxpc3QgPSBKU09OLnBhcnNlKHVzZXJMaXN0cyk7XG4gICAgbGV0IGxpc3RPYmogPSB0aGlzLmdldExpc3RPYmplY3QoKTtcbiAgICBsZXQgaXRlbXMgPSBsaXN0T2JqLml0ZW1zLm1hcChcbiAgICAgIChpdGVtLCBpbmR4KSA9PiBgPGxpIGRhdGEtaW5kZXg9XCIke2luZHh9XCI+JHtpdGVtLml0ZW1uYW1lfTwvbGk+YFxuICAgICk7XG5cbiAgICB0aGlzLmRpYWcuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJkLWNcIj5cbiAgICAgIDxzcGFuPlxuICAgICAgICA8YSBocmVmPVwiXCI+Q2xvc2U8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8YXBwLXRpdGxlIHRpdGxlPVwiJHtsaXN0T2JqLm5hbWV9XCI+PC9hcHAtdGl0bGU+XG4gICAgICA8dWw+JHtpdGVtc308L3VsPlxuICAgICAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8bGFiZWw+R3JvY2VyeTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwiaXRlbV9uYW1lXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICAgICAgPGxhYmVsPlF1YW50aXR5PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiXCIgbmFtZT1cIml0ZW1fcXVhbnRpdHlcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5gO1xuXG4gICAgbGV0IGZvbyA9IHRoaXMuZGlhZy5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICBmb28uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHB1Ymxpc2goXCJpdGVtLWFkZGVkXCIsIHtcbiAgICAgICAgaXRlbW5hbWU6IGZvby5pdGVtX25hbWUudmFsdWUudHJpbSgpLFxuICAgICAgICBxdWFudGl0eTogZm9vLml0ZW1fcXVhbnRpdHkudmFsdWUgPT0gXCJcIiA/IFwiMVwiIDogZm9vLml0ZW1fcXVhbnRpdHkudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGNsb3NlQnV0dG9uID0gdGhpcy5kaWFnLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuID4gYVwiKTtcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnRvZ2dsZU9wZW4oKTtcbiAgICB9KTtcblxuICAgIGxldCBlbG1zID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtaW5kZXhdXCIpO1xuXG4gICAgZWxtcy5mb3JFYWNoKChlbG0sIGluZHgpID0+IHtcbiAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcHVibGlzaChcIml0ZW0tcmVtb3ZlZFwiLCB7XG4gICAgICAgICAgaW5keDogZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcERpYWxvZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogc3RvcmFnZS5qc1xuICovXG5jb25zdCBzdG9yZUl0ZW0gPSAoa2V5LCBvYmopID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cik7XG4gICAgcmVzb2x2ZShzdHIubGVuZ3RoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmZXRjaEl0ZW0gPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KGAke2tleX0gbm90IGZvdW5kYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNvbHZlKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGliL3N0b3JhZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWxlbmFtZTogZGJmdW5jLmpzXG4gKi9cblxuY29uc3QgREJfTkFNRSA9IFwiZ3JvY2VyeV9saXN0XCI7XG5jb25zdCBEQl9WRVJTSU9OID0gMTtcbi8qKlxuICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gKiBAcGFyYW0gdmVyc2lvbiBpbnRcbiAqL1xuY29uc3QgZGIgPSAobmFtZSwgdmVyc2lvbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCByZXEgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICByZXEub251cGdyYWRlbmVlZGVkID0gZXZlbnQgPT4ge1xuICAgICAgZXZlbnQudGFyZ2V0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShuYW1lLCB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IGZhbHNlLFxuICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgIH0pO1xuICAgIH07XG4gICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQudGFyZ2V0KTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0gc2NoZW1hIHN0cmluZ1xuICogQHBhcmFtIG9iaiBvYmplY3QgfCBhcnJheVxuICovXG5jb25zdCBhZGQgPSBvYmogPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZHdyaXRlXCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBzdG9yZS5hZGQob2JqKTtcbiAgICAgIHRyYW5zLm9uY29tcGxldGUgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnR5cGUpO1xuICAgICAgdHJhbnMub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IHJlbW92ZSA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIGxldCByZXEgPSBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IGdldCA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkb25seVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkLCByZW1vdmUsIGdldCB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGliL2RiZnVuYy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9