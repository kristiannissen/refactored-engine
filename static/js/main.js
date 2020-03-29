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

    footerMount.append(appForm);
  });

  let _u = Object(__WEBPACK_IMPORTED_MODULE_5__lib_storage_js__["a" /* fetchItem */])("_u").then(obj => Object(__WEBPACK_IMPORTED_MODULE_6__lib_pubsub_js__["a" /* publish */])("app-shell-ready", { _u: obj }));
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceworker.js", { scope: "/app/" })
    .then(registration => {
      let appFoo = document.querySelector('app-form'),
        foo = appFoo._shadowRoot.querySelector('form')
        foo.addEventListener('submit', e => {
          if (registration.sync) {
            registration.sync.register('save-list')
              .catch(err => console.log(err))
          }
        })
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
        console.log(response);
      })
      .then(json => {
        this._list = json.user_lists;
        this.render();

        Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("list-fetched", {
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
      if (name !== "") {
        fetch(`/app/service/${userId}/lists/`, {
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
            Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("list-added", { name: name });
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




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDk0Y2Q0MmFlY2E4NDkwYTNkZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVROzs7Ozs7OztBQzVCUjtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsS0FBSyxJQUFJLGNBQWM7QUFDaEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QyxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQ3JMQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsSUFBSTtBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDk0Y2Q0MmFlY2E4NDkwYTNkZGUiLCIvKipcbiAqIFB1YlN1Yi5qc1xuICogc3Vic2NyaWJlcnN7a2V5OiBbXX1cbiAqL1xuXG5sZXQgc3Vic2NyaWJlcnMgPSB7fTtcblxuY29uc3Qgc3Vic2NyaWJlID0gKG1lc3NhZ2UsIGNhbGxiYWNrKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic3Vic2NyaWJlXCIsIG1lc3NhZ2UsIGNhbGxiYWNrKTtcbiAgaWYgKE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5pbmNsdWRlcyhtZXNzYWdlKSA9PT0gZmFsc2UpIHtcbiAgICBzdWJzY3JpYmVyc1ttZXNzYWdlXSA9IFtdO1xuICB9XG5cbiAgc3Vic2NyaWJlcnNbbWVzc2FnZV0ucHVzaChjYWxsYmFjayk7XG59O1xuXG5jb25zdCBwdWJsaXNoID0gKG1lc3NhZ2UsIHBheWxvYWQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJwdWJsaXNoXCIsIG1lc3NhZ2UsIHBheWxvYWQpO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSB0cnVlKSB7XG4gICAgbGV0IHN1YnMgPSBzdWJzY3JpYmVyc1ttZXNzYWdlXTtcbiAgICBmb3IgKGxldCBzIGluIHN1YnMpIHtcbiAgICAgIHN1YnNbc10ocGF5bG9hZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IGNvbnNvbGUubG9nKFwiVE9ET1wiKTtcblxuZXhwb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWIvcHVic3ViLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwVGl0bGVcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuPHN0eWxlPlxuaDEge1xuICBjb2xvcjogI2ZmZjtcbiAgbWFyZ2luOiAwO1xufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgNTc2cHggYW5kIHVwKSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG4gIGgxIHtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG4vKiBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCBsZXNzIHRoYW4gNzY4cHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcblxufVxuLyogTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIGxlc3MgdGhhbiA5OTJweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuXG59XG4vKiBMYXJnZSBkZXZpY2VzIChkZXNrdG9wcywgbGVzcyB0aGFuIDEyMDBweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTk5Ljk4cHgpIHtcbiAgXG59XG48L3N0eWxlPlxuPGgxPjwvaDE+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl90aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widGl0bGVcIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJ0aXRsZVwiKSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdGl0bGUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gdGhpcy50aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBUaXRsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWxlbmFtZTogaW5kZXguanNcbiAqL1xuXG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC10aXRsZVwiLCBBcHBUaXRsZSk7XG5cbmltcG9ydCBBcHBMaXN0IGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1saXN0XCIsIEFwcExpc3QpO1xuXG5pbXBvcnQgQXBwU25hY2tiYXIgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1zbmFja2JhclwiLCBBcHBTbmFja2Jhcik7XG5cbmltcG9ydCBBcHBGb3JtIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1mb3JtXCIsIEFwcEZvcm0pO1xuXG5pbXBvcnQgQXBwRGlhbG9nIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWRpYWxvZ1wiLCBBcHBEaWFsb2cpO1xuXG5pbXBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9IGZyb20gXCIuL2xpYi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi9saWIvcHVic3ViLmpzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGUgPT4ge1xuICAvLyBDcmVhdGUgYXBwIHRpdGxlIHN1YnNjcmliZXJcbiAgc3Vic2NyaWJlKFwiYXBwLXNoZWxsLXJlYWR5XCIsIHBheWxvYWQgPT4ge1xuICAgIGxldCBoZWFkZXJNb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXJcIik7XG4gICAgaGVhZGVyTW91bnQuaW5uZXJIVE1MID0gYDxhcHAtdGl0bGUgdGl0bGU9XCJIZWxsbyBDaGFtcFwiLz5gO1xuICB9KTtcbiAgLy8gQ3JlYXRlIGFwcCBsaXN0IHN1YnNjcmliZXJcbiAgc3Vic2NyaWJlKFwiYXBwLXNoZWxsLXJlYWR5XCIsIHBheWxvYWQgPT4ge1xuICAgIGxldCBtYWluTW91bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKSxcbiAgICAgIGFwcExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLWxpc3RcIik7XG5cbiAgICBhcHBMaXN0LnNldEF0dHJpYnV0ZShcInVzZXJpZFwiLCBwYXlsb2FkW1wiX3VcIl0pO1xuXG4gICAgbWFpbk1vdW50LmFwcGVuZChhcHBMaXN0KTtcbiAgfSk7XG4gIC8vIENyZWF0ZSBhcHAgc25hY2tiYXIgc3Vic2NyaWJlclxuICBzdWJzY3JpYmUoXCJhcHAtc2hlbGwtcmVhZHlcIiwgcGF5bG9hZCA9PiB7XG4gICAgbGV0IG1haW5Nb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpLFxuICAgICAgYXBwU25hY2tiYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLXNuYWNrYmFyXCIpO1xuXG4gICAgYXBwU25hY2tiYXIuc2V0QXR0cmlidXRlKFwibWVzc2FnZVwiLCBcIkhlbGxvIEdvdm5yIVwiKTtcblxuICAgIG1haW5Nb3VudC5hcHBlbmQoYXBwU25hY2tiYXIpO1xuICB9KTtcblxuICBzdWJzY3JpYmUoXCJhcHAtc2hlbGwtcmVhZHlcIiwgcGF5bG9hZCA9PiB7XG4gICAgbGV0IGZvb3Rlck1vdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvb3RlclwiKSxcbiAgICAgIGFwcEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXBwLWZvcm1cIik7XG5cbiAgICBhcHBGb3JtLnNldEF0dHJpYnV0ZShcInVzZXJpZFwiLCBwYXlsb2FkW1wiX3VcIl0pO1xuXG4gICAgZm9vdGVyTW91bnQuYXBwZW5kKGFwcEZvcm0pO1xuICB9KTtcblxuICBsZXQgX3UgPSBmZXRjaEl0ZW0oXCJfdVwiKS50aGVuKG9iaiA9PiBwdWJsaXNoKFwiYXBwLXNoZWxsLXJlYWR5XCIsIHsgX3U6IG9iaiB9KSk7XG59KTtcblxuaWYgKFwic2VydmljZVdvcmtlclwiIGluIG5hdmlnYXRvcikge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlclxuICAgIC5yZWdpc3RlcihcIi9zZXJ2aWNld29ya2VyLmpzXCIsIHsgc2NvcGU6IFwiL2FwcC9cIiB9KVxuICAgIC50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICBsZXQgYXBwRm9vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXBwLWZvcm0nKSxcbiAgICAgICAgZm9vID0gYXBwRm9vLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKVxuICAgICAgICBmb28uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gICAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbi5zeW5jKSB7XG4gICAgICAgICAgICByZWdpc3RyYXRpb24uc3luYy5yZWdpc3Rlcignc2F2ZS1saXN0JylcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwTGlzdC5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgICNhcHAtbGlzdCB7XG4gICAgfVxuICAgIC5iYWRnZSB7XG4gICAgICBtYXJnaW4tdG9wOiBjYWxjKC43NXJlbSAtIDExcHgpO1xuICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xuICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgbWluLXdpZHRoOiAzcmVtO1xuICAgICAgcGFkZGluZzogMCA2cHg7XG4gICAgICBtYXJnaW4tbGVmdDogMTRweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGxpbmUtaGVpZ2h0OiAyMnB4O1xuICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB9XG4gICAgdWwge1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgICAgbWFyZ2luOiAwcHg7XG4gICAgICBwYWRkaW5nOiAwcHg7XG4gICAgfVxuICAgIGxpIHtcbiAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8ZGl2IGlkPVwiYXBwLWxpc3RcIj48dWw+PC91bD48L2Rpdj5gO1xuXG5jbGFzcyBBcHBMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widXNlcmlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9zaGFkb3dSb290Lmhvc3QucGFyZW50Tm9kZTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fdXBkYXRlTGlzdCgpO1xuICAgIHN1YnNjcmliZShcImxpc3QtYWRkZWRcIiwgKCkgPT4gdGhpcy5fdXBkYXRlTGlzdCgpKTtcbiAgfVxuXG4gIF91cGRhdGVMaXN0KCkge1xuICAgIGZldGNoKGAvYXBwL3NlcnZpY2UvJHt0aGlzLnVzZXJpZH0vbGlzdHMvYClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBqc29uLnVzZXJfbGlzdHM7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgcHVibGlzaChcImxpc3QtZmV0Y2hlZFwiLCB7XG4gICAgICAgICAgaXRlbXM6IGpzb24udXNlcl9saXN0cy5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGxpc3QgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICBsaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0sIGluZHgpID0+IHtcbiAgICAgIGxldCBsaUVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgIGxpRWxtLmlubmVySFRNTCA9IGA8ZGl2IGRhdGEtbGlzdC1pZD1cIiR7aXRlbS5pZH1cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnlcIj5cbiAgICAgICAgICAgICR7aXRlbS5uYW1lfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPiR7aXRlbS5pdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgIGxpRWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgLypwdWJsaXNoKFwibGlzdC1zaG93XCIsIHtcbiAgICAgICAgICBsaXN0aWQ6IGUudGFyZ2V0XG4gICAgICAgICAgICAuY2xvc2VzdChcIltkYXRhLWxpc3QtaWRdXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1saXN0LWlkXCIpXG4gICAgICAgIH0pOyovXG4gICAgICAgIC8vIGhpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IDEgfSwgbnVsbCwgXCIvYXBwL2xpc3QvXCIpO1xuICAgICAgfSk7XG4gICAgICBsaXN0LmFwcGVuZENoaWxkKGxpRWxtKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBMaXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwRXJyb3IuanNcbiAqIFRPRE86IFJlbmFtZSB0byBzb21ldGhpbmcgbW9yZSBnZW5lcmljXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICNzbmFja2Jhci1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIG1pbi13aWR0aDogMTAwJTtcbiAgICBib3R0b206IDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgfVxuICAjc25hY2tiYXIge1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICB3aWR0aDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMjMyMzI7XG4gICAgcGFkZGluZzogMTBweCAyNXB4O1xuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcbiAgICAtd2Via2l0LWFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XG4gICAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgY3Vyc29yOiBkZWZhdWx0XG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cInNuYWNrYmFyLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7XCI+XG4gICAgPGRpdiBpZD1cInNuYWNrYmFyXCI+PC9kaXY+XG4gIDwvZGl2PmA7XG5cbmNsYXNzIEFwcFNuYWNrYmFyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibWVzc2FnZVwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJzbmFja2Jhci1jb250YWluZXJcIik7XG4gICAgdGhpcy5zbmFja2JhckVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QuZ2V0RWxlbWVudEJ5SWQoXCJzbmFja2JhclwiKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge31cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5zbmFja2JhckVsbS5pbm5lckhUTUwgPSBgPHNwYW4+JHtuZXdWYWx1ZX08L3NwYW4+YDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy50b2dnbGVEaXNwbGF5KCksIDE1MDApO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZURpc3BsYXkoKSB7XG4gICAgaWYgKHRoaXMuZWxtLnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIikgdGhpcy5lbG0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGVsc2UgdGhpcy5lbG0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBTbmFja2JhcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBcHBGb3JtLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gIC5mLWcge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbiAgZm9ybSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIH1cbiAgaW5wdXQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzQ4MTM4MDtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgaGVpZ2h0OiAzcmVtO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBtYXJnaW46IDAgMCA4cHggMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbiAgaW5wdXQ6Zm9jdXMge1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjZhNjlhO1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgMCAjMjZhNjlhO1xuICB9XG4gIGlucHV0OmZvY3VzICsgbGFiZWwge1xuICAgIGNvbG9yOiAjMjZhNjlhO1xuICAgIHRvcDogLS4yNXJlbTtcbiAgfVxuICBsYWJlbCB7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDFyZW07XG4gICAgY29sb3I6ICM5ZTllOWU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgfVxuICBidXR0b24ge1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjZhNjlhO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsZXR0ZXItc3BhY2luZzogLjVweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgb3V0bGluZTogMDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBoZWlnaHQ6IDM2cHg7XG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwwLjEyKSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwwLjIpO1xuICB9XG4gIDwvc3R5bGU+XG4gIDxmb3JtIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgIDxkaXYgY2xhc3M9XCJmLWdcIj4gICAgICBcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsaXN0X25hbWVcIiB2YWx1ZT1cIlwiPlxuICAgICAgPGxhYmVsPk5hbWUgb2YgTGlzdDwvbGFiZWw+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Zvcm0+XG4gIGA7XG5cbmNsYXNzIEFwcEZvcm0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJuYW1lXCIsIFwidXNlcmlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGxldCB1c2VySWQgPSB0aGlzLmdldEF0dHJpYnV0ZShcInVzZXJpZFwiKTtcblxuICAgIHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgbGV0IG5hbWUgPSBlLnRhcmdldFtcImxpc3RfbmFtZVwiXS52YWx1ZS50cmltKCk7XG4gICAgICBpZiAobmFtZSAhPT0gXCJcIikge1xuICAgICAgICBmZXRjaChgL2FwcC9zZXJ2aWNlLyR7dXNlcklkfS9saXN0cy9gLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbGlzdF9uYW1lOiBuYW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgbmFtZSk7XG4gICAgICAgICAgICBwdWJsaXNoKFwibGlzdC1hZGRlZFwiLCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRm9ybTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcERpYWxvZy5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuaW1wb3J0IEFwcFRpdGxlIGZyb20gXCIuL0FwcFRpdGxlLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICBkaWFsb2cge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgei1pbmRleDogMztcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuICAuZC1jIHtcbiAgfVxuICAuZC1jIHNwYW4ge1xuICAgIGZsb2F0OiByaWdodDtcbiAgICBtYXJnaW46IDAgNXB4IDA7XG4gIH1cbiAgLmRpYWxvZy1jbG9zZWQge1xuICAgIFxuICB9XG4gIDwvc3R5bGU+XG4gIDxkaWFsb2c+PC9kaWFsb2c+XG5gO1xuXG5jbGFzcyBBcHBEaWFsb2cgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJsaXN0aWRcIl07XG4gIH1cblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5kaWFnID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZGlhbG9nXCIpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1YnNjcmliZShcImxpc3Qtc2hvd1wiLCBwYXlsb2FkID0+IHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwibGlzdGlkXCIsIHBheWxvYWQubGlzdGlkKTtcbiAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIHN1YnNjcmliZShcIml0ZW0tYWRkZWRcIiwgcGF5bG9hZCA9PiB7XG4gICAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICAgIHVzZXJMaXN0cyA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICAgIGxldCBpbmR4ID0gdXNlckxpc3RzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IHRoaXMuZ2V0QXR0cmlidXRlKFwibGlzdGlkXCIpKTtcbiAgICAgIGxldCBuZXdMaXN0ID0gdXNlckxpc3RzW2luZHhdO1xuICAgICAgbmV3TGlzdC5pdGVtcy5wdXNoKHtcbiAgICAgICAgaXRlbW5hbWU6IHBheWxvYWQuaXRlbW5hbWUsXG4gICAgICAgIHF1YW50aXR5OiBwYXlsb2FkLnF1YW50aXR5XG4gICAgICB9KTtcbiAgICAgIHVzZXJMaXN0cy5zbGljZShpbmR4LCBuZXdMaXN0KTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcl9saXN0c1wiLCBKU09OLnN0cmluZ2lmeSh1c2VyTGlzdHMpKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnB1c2hDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICBzdWJzY3JpYmUoXCJpdGVtLXJlbW92ZWRcIiwgcGF5bG9hZCA9PiB7XG4gICAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICAgIHVzZXJMaXN0cyA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICAgIGxldCBpbmR4ID0gdXNlckxpc3RzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IHRoaXMuZ2V0QXR0cmlidXRlKFwibGlzdGlkXCIpKTtcbiAgICAgIGxldCBuZXdMaXN0ID0gdXNlckxpc3RzW2luZHhdO1xuICAgICAgbmV3TGlzdC5pdGVtcy5zcGxpY2UocGFyc2VJbnQocGF5bG9hZC5pbmR4KSwgMSk7XG4gICAgICB1c2VyTGlzdHNbaW5keF0uaXRlbXMgPSBuZXdMaXN0Lml0ZW1zO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2xpc3RzXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJMaXN0cykpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucHVzaENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1c2hDaGFuZ2VzKCkge1xuICAgIGxldCBsaXN0T2JqID0gdGhpcy5nZXRMaXN0T2JqZWN0KCk7XG4gICAgZmV0Y2goYC9hcHAvc2VydmljZS9saXN0cy8ke2xpc3RPYmouaWR9L2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpdGVtczogbGlzdE9iai5pdGVtc1xuICAgICAgfSlcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oanNvbiA9PiBjb25zb2xlLmxvZyhqc29uKSk7XG4gIH1cblxuICB0b2dnbGVPcGVuKCkge1xuICAgIGlmICh0aGlzLmRpYWcuaGFzQXR0cmlidXRlKFwib3BlblwiKSkge1xuICAgICAgdGhpcy5kaWFnLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhZy5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldExpc3RPYmplY3QoKSB7XG4gICAgbGV0IHVzZXJMaXN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9saXN0c1wiKSB8fCBcIltdXCI7XG4gICAgbGV0IGxpc3QgPSBKU09OLnBhcnNlKHVzZXJMaXN0cyk7XG4gICAgbGV0IGxpc3RPYmogPSBsaXN0LmZpbmQoXG4gICAgICAoaXRlbSwgaW5keCkgPT4gaXRlbS5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIilcbiAgICApO1xuICAgIHJldHVybiBsaXN0T2JqO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgIGxldCBsaXN0ID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgIGxldCBsaXN0T2JqID0gdGhpcy5nZXRMaXN0T2JqZWN0KCk7XG4gICAgbGV0IGl0ZW1zID0gbGlzdE9iai5pdGVtcy5tYXAoXG4gICAgICAoaXRlbSwgaW5keCkgPT4gYDxsaSBkYXRhLWluZGV4PVwiJHtpbmR4fVwiPiR7aXRlbS5pdGVtbmFtZX08L2xpPmBcbiAgICApO1xuXG4gICAgdGhpcy5kaWFnLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZC1jXCI+XG4gICAgICA8c3Bhbj5cbiAgICAgICAgPGEgaHJlZj1cIlwiPkNsb3NlPC9hPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGFwcC10aXRsZSB0aXRsZT1cIiR7bGlzdE9iai5uYW1lfVwiPjwvYXBwLXRpdGxlPlxuICAgICAgPHVsPiR7aXRlbXN9PC91bD5cbiAgICAgIDxmb3JtIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICAgICAgPGxhYmVsPkdyb2Nlcnk8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiXCIgbmFtZT1cIml0ZW1fbmFtZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgICAgIDxsYWJlbD5RdWFudGl0eTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIlwiIG5hbWU9XCJpdGVtX3F1YW50aXR5XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlNhdmVcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+YDtcblxuICAgIGxldCBmb28gPSB0aGlzLmRpYWcucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG4gICAgZm9vLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBwdWJsaXNoKFwiaXRlbS1hZGRlZFwiLCB7XG4gICAgICAgIGl0ZW1uYW1lOiBmb28uaXRlbV9uYW1lLnZhbHVlLnRyaW0oKSxcbiAgICAgICAgcXVhbnRpdHk6IGZvby5pdGVtX3F1YW50aXR5LnZhbHVlID09IFwiXCIgPyBcIjFcIiA6IGZvby5pdGVtX3F1YW50aXR5LnZhbHVlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBjbG9zZUJ1dHRvbiA9IHRoaXMuZGlhZy5xdWVyeVNlbGVjdG9yKFwic3BhbiA+IGFcIik7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b2dnbGVPcGVuKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgZWxtcyA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWluZGV4XVwiKTtcblxuICAgIGVsbXMuZm9yRWFjaCgoZWxtLCBpbmR4KSA9PiB7XG4gICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHB1Ymxpc2goXCJpdGVtLXJlbW92ZWRcIiwge1xuICAgICAgICAgIGluZHg6IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIilcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBEaWFsb2c7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIHN0b3JhZ2UuanNcbiAqL1xuY29uc3Qgc3RvcmVJdGVtID0gKGtleSwgb2JqKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHIpO1xuICAgIHJlc29sdmUoc3RyLmxlbmd0aCk7XG4gIH0pO1xufTtcblxuY29uc3QgZmV0Y2hJdGVtID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHJlamVjdChgJHtrZXl9IG5vdCBmb3VuZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShKU09OLnBhcnNlKGl0ZW0pKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RvcmVJdGVtLCBmZXRjaEl0ZW0gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9zdG9yYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=