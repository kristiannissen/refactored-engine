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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webcomponents_AppTitle_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webcomponents_AppList_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webcomponents_AppSnackbar_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webcomponents_AppForm_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__webcomponents_AppDialog_js__ = __webpack_require__(7);
/**
 * index.js
 * CustomEvent https://gomakethings.com/custom-events-with-vanilla-javascript/
 * HTMLElment https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
 */

(() => {
  const listElm = document.querySelector('app-list')
  if (listElm) listElm.setAttribute('userid', localStorage.getItem('_u') || 0)

  const formElm = document.querySelector('app-form')
  if (formElm) formElm.setAttribute('userid', localStorage.getItem('_u') || 0)
})()


window.customElements.define("app-title", __WEBPACK_IMPORTED_MODULE_0__webcomponents_AppTitle_js__["a" /* default */]);


window.customElements.define("app-list", __WEBPACK_IMPORTED_MODULE_1__webcomponents_AppList_js__["a" /* default */])


window.customElements.define("app-snackbar", __WEBPACK_IMPORTED_MODULE_2__webcomponents_AppSnackbar_js__["a" /* default */])


window.customElements.define("app-form", __WEBPACK_IMPORTED_MODULE_3__webcomponents_AppForm_js__["a" /* default */])


window.customElements.define("app-dialog", __WEBPACK_IMPORTED_MODULE_4__webcomponents_AppDialog_js__["a" /* default */])

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/app/'
    }).then(reg => console.log(reg))
  })
}


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
:host {
  display: block;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(6);
/**
 * AppList.js
 */




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
        localStorage.setItem("user_lists", JSON.stringify(json.user_lists));
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
          <span class="primary">${item.name}</span>
          <span class="secondary">
            <span class="badge">${item.items.length}</span>
          </span>
        </div>`;
      liElm.addEventListener("click", e => {
        Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("list-show", {
          listid: e.target
            .closest("[data-list-id]")
            .getAttribute("data-list-id")
        });
      });
      list.appendChild(liElm);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppList);


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(6);
/**
 * AppForm.js
 */




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
            Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("list-added", { name: name });
          });
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppForm);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(6);
/**
 * AppError.js
 * TODO: Rename to something more generic
 */




const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  .snackbar-container {
    
  }
  </style>
  <div id="snackbar-container"></div>`;

class AppSnackbar extends HTMLElement {
  static get observedAttributes() {
    return ["message"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = document.querySelector("#snackbar-container");
  }

  connectedCallback() {
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("list-changed", payload =>
      this.setAttribute("message", "Hello Pussy")
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AppSnackbar);


/***/ }),
/* 6 */
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
  console.log("subscribe", message, callback);
  if (Object.keys(subscribers).includes(message) === false) {
    subscribers[message] = [];
  }

  subscribers[message].push(callback);
};

const publish = (message, payload) => {
  console.log("publish", message, payload);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(6);
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
    fetch(`/service/lists/${listObj.id}/`, {
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmYwYWZhNGVhZWM0NmE5ODljNmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNoRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsWUFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RCxrQ0FBa0MsVUFBVTtBQUM1QztBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7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Q0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmYwYWZhNGVhZWM0NmE5ODljNmQiLCIvKipcbiAqIGluZGV4LmpzXG4gKiBDdXN0b21FdmVudCBodHRwczovL2dvbWFrZXRoaW5ncy5jb20vY3VzdG9tLWV2ZW50cy13aXRoLXZhbmlsbGEtamF2YXNjcmlwdC9cbiAqIEhUTUxFbG1lbnQgaHR0cHM6Ly9kZXYudG8vdGhlcGFzc2xlL3dlYi1jb21wb25lbnRzLWZyb20temVyby10by1oZXJvLTRuNG1cbiAqL1xuXG4oKCkgPT4ge1xuICBjb25zdCBsaXN0RWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXBwLWxpc3QnKVxuICBpZiAobGlzdEVsbSkgbGlzdEVsbS5zZXRBdHRyaWJ1dGUoJ3VzZXJpZCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfdScpIHx8IDApXG5cbiAgY29uc3QgZm9ybUVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FwcC1mb3JtJylcbiAgaWYgKGZvcm1FbG0pIGZvcm1FbG0uc2V0QXR0cmlidXRlKCd1c2VyaWQnLCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX3UnKSB8fCAwKVxufSkoKVxuXG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC10aXRsZVwiLCBBcHBUaXRsZSk7XG5cbmltcG9ydCBBcHBMaXN0IGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWxpc3RcIiwgQXBwTGlzdClcblxuaW1wb3J0IEFwcFNuYWNrYmFyIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIlxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1zbmFja2JhclwiLCBBcHBTbmFja2JhcilcblxuaW1wb3J0IEFwcEZvcm0gZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBGb3JtLmpzXCJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtZm9ybVwiLCBBcHBGb3JtKVxuXG5pbXBvcnQgQXBwRGlhbG9nIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtZGlhbG9nXCIsIEFwcERpYWxvZylcblxuaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJy9zdy5qcycsIHtcbiAgICAgIHNjb3BlOiAnL2FwcC8nXG4gICAgfSkudGhlbihyZWcgPT4gY29uc29sZS5sb2cocmVnKSlcbiAgfSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwVGl0bGVcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuPHN0eWxlPlxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxoMT48L2gxPlxuYDtcblxuY2xhc3MgQXBwVGl0bGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fdGl0bGUgPSBcIlwiO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInRpdGxlXCJdO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwidGl0bGVcIikpIHtcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3RpdGxlID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImgxXCIpLmlubmVySFRNTCA9IHRoaXMudGl0bGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwVGl0bGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwTGlzdC5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICB1bDpub3QoLmJyb3dzZXItZGVmYXVsdCkge1xuICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIH1cbiAgICB1bDpub3QoLmJyb3dzZXItZGVmYXVsdCk+bGkge1xuICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICAgIH1cbiAgICB1bCB7XG4gICAgICBtYXJnaW46IC41cmVtIDAgMXJlbSAwO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gICAgbGkge1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgfVxuICAgIGxpIHNwYW4ge1xuICAgICAgZmxleDogMTtcbiAgICB9XG4gICAgc3Bhbi5wcmltYXJ5IHtcbiAgICAgIGZsZXg6IDI7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8dWw+PC91bD5gO1xuXG5jbGFzcyBBcHBMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widXNlcmlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9zaGFkb3dSb290Lmhvc3QucGFyZW50Tm9kZTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fdXBkYXRlTGlzdCgpO1xuICAgIHN1YnNjcmliZShcImxpc3QtYWRkZWRcIiwgKCkgPT4gdGhpcy5fdXBkYXRlTGlzdCgpKTtcbiAgfVxuXG4gIF91cGRhdGVMaXN0KCkge1xuICAgIGZldGNoKGAvYXBwL3NlcnZpY2UvJHt0aGlzLnVzZXJpZH0vbGlzdHMvYClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBqc29uLnVzZXJfbGlzdHM7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcl9saXN0c1wiLCBKU09OLnN0cmluZ2lmeShqc29uLnVzZXJfbGlzdHMpKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICBwdWJsaXNoKFwibGlzdC1mZXRjaGVkXCIsIHtcbiAgICAgICAgICBpdGVtczoganNvbi51c2VyX2xpc3RzLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbGlzdCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgIGxpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSwgaW5keCkgPT4ge1xuICAgICAgbGV0IGxpRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbGlFbG0uaW5uZXJIVE1MID0gYDxkaXYgZGF0YS1saXN0LWlkPVwiJHtpdGVtLmlkfVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpbWFyeVwiPiR7aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlY29uZGFyeVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJiYWRnZVwiPiR7aXRlbS5pdGVtcy5sZW5ndGh9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgIGxpRWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgcHVibGlzaChcImxpc3Qtc2hvd1wiLCB7XG4gICAgICAgICAgbGlzdGlkOiBlLnRhcmdldFxuICAgICAgICAgICAgLmNsb3Nlc3QoXCJbZGF0YS1saXN0LWlkXVwiKVxuICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImRhdGEtbGlzdC1pZFwiKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaUVsbSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwTGlzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcEZvcm0uanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHN1YnNjcmliZSwgcHVibGlzaCB9IGZyb20gXCIuLy4uL2xpYi9wdWJzdWIuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGZvcm0ge1xuICAgIHBhZGRpbmc6IDAgMTJweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XG4gIH1cbiAgLmYtZyB7XG4gICAgZmxleDogMTtcbiAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIH1cbiAgLmYtZzpmaXJzdC1jaGlsZCB7XG4gICAgZmxleDogMjtcbiAgfVxuICBpbnB1dCB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuICBidXR0b24ge1xuICBcbiAgfVxuICA8L3N0eWxlPlxuICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICA8bGFiZWw+TmFtZSBvZiBMaXN0PC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsaXN0X25hbWVcIiB2YWx1ZT1cIlwiPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPlxuICBgO1xuXG5jbGFzcyBBcHBGb3JtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibmFtZVwiLCBcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdXNlcklkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ1c2VyaWRcIik7XG5cbiAgICB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGxldCBuYW1lID0gZS50YXJnZXRbXCJsaXN0X25hbWVcIl0udmFsdWUudHJpbSgpO1xuICAgICAgaWYgKG5hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgZmV0Y2goYC9zZXJ2aWNlLyR7dXNlcklkfS9saXN0cy9gLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgbGlzdF9uYW1lOiBuYW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgbmFtZSk7XG4gICAgICAgICAgICBwdWJsaXNoKFwibGlzdC1hZGRlZFwiLCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRm9ybTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcEVycm9yLmpzXG4gKiBUT0RPOiBSZW5hbWUgdG8gc29tZXRoaW5nIG1vcmUgZ2VuZXJpY1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgLnNuYWNrYmFyLWNvbnRhaW5lciB7XG4gICAgXG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cInNuYWNrYmFyLWNvbnRhaW5lclwiPjwvZGl2PmA7XG5cbmNsYXNzIEFwcFNuYWNrYmFyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibWVzc2FnZVwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc25hY2tiYXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1jaGFuZ2VkXCIsIHBheWxvYWQgPT5cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwibWVzc2FnZVwiLCBcIkhlbGxvIFB1c3N5XCIpXG4gICAgKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNuYWNrYmFyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFB1YlN1Yi5qc1xuICogc3Vic2NyaWJlcnN7a2V5OiBbXX1cbiAqL1xuXG5sZXQgc3Vic2NyaWJlcnMgPSB7fTtcblxuY29uc3Qgc3Vic2NyaWJlID0gKG1lc3NhZ2UsIGNhbGxiYWNrKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwic3Vic2NyaWJlXCIsIG1lc3NhZ2UsIGNhbGxiYWNrKTtcbiAgaWYgKE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5pbmNsdWRlcyhtZXNzYWdlKSA9PT0gZmFsc2UpIHtcbiAgICBzdWJzY3JpYmVyc1ttZXNzYWdlXSA9IFtdO1xuICB9XG5cbiAgc3Vic2NyaWJlcnNbbWVzc2FnZV0ucHVzaChjYWxsYmFjayk7XG59O1xuXG5jb25zdCBwdWJsaXNoID0gKG1lc3NhZ2UsIHBheWxvYWQpID0+IHtcbiAgY29uc29sZS5sb2coXCJwdWJsaXNoXCIsIG1lc3NhZ2UsIHBheWxvYWQpO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSB0cnVlKSB7XG4gICAgbGV0IHN1YnMgPSBzdWJzY3JpYmVyc1ttZXNzYWdlXTtcbiAgICBmb3IgKGxldCBzIGluIHN1YnMpIHtcbiAgICAgIHN1YnNbc10ocGF5bG9hZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IGNvbnNvbGUubG9nKFwiVE9ET1wiKTtcblxuZXhwb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWIvcHVic3ViLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwRGlhbG9nLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vQXBwVGl0bGUuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGRpYWxvZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICB6LWluZGV4OiAzO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIC5kLWMge1xuICB9XG4gIC5kLWMgc3BhbiB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbjogMCA1cHggMDtcbiAgfVxuICAuZGlhbG9nLWNsb3NlZCB7XG4gICAgXG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpYWxvZz48L2RpYWxvZz5cbmA7XG5cbmNsYXNzIEFwcERpYWxvZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcImxpc3RpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmRpYWcgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1zaG93XCIsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIiwgcGF5bG9hZC5saXN0aWQpO1xuICAgICAgdGhpcy50b2dnbGVPcGVuKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaWJlKFwiaXRlbS1hZGRlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICBpdGVtbmFtZTogcGF5bG9hZC5pdGVtbmFtZSxcbiAgICAgICAgcXVhbnRpdHk6IHBheWxvYWQucXVhbnRpdHlcbiAgICAgIH0pO1xuICAgICAgdXNlckxpc3RzLnNsaWNlKGluZHgsIG5ld0xpc3QpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2xpc3RzXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJMaXN0cykpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucHVzaENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHN1YnNjcmliZShcIml0ZW0tcmVtb3ZlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnNwbGljZShwYXJzZUludChwYXlsb2FkLmluZHgpLCAxKTtcbiAgICAgIHVzZXJMaXN0c1tpbmR4XS5pdGVtcyA9IG5ld0xpc3QuaXRlbXM7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJfbGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkodXNlckxpc3RzKSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5wdXNoQ2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVzaENoYW5nZXMoKSB7XG4gICAgbGV0IGxpc3RPYmogPSB0aGlzLmdldExpc3RPYmplY3QoKTtcbiAgICBmZXRjaChgL3NlcnZpY2UvbGlzdHMvJHtsaXN0T2JqLmlkfS9gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaXRlbXM6IGxpc3RPYmouaXRlbXNcbiAgICAgIH0pXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGpzb24gPT4gY29uc29sZS5sb2coanNvbikpO1xuICB9XG5cbiAgdG9nZ2xlT3BlbigpIHtcbiAgICBpZiAodGhpcy5kaWFnLmhhc0F0dHJpYnV0ZShcIm9wZW5cIikpIHtcbiAgICAgIHRoaXMuZGlhZy5yZW1vdmVBdHRyaWJ1dGUoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWcuc2V0QXR0cmlidXRlKFwib3BlblwiLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRMaXN0T2JqZWN0KCkge1xuICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgIGxldCBsaXN0ID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgIGxldCBsaXN0T2JqID0gbGlzdC5maW5kKFxuICAgICAgKGl0ZW0sIGluZHgpID0+IGl0ZW0uaWQgPT09IHRoaXMuZ2V0QXR0cmlidXRlKFwibGlzdGlkXCIpXG4gICAgKTtcbiAgICByZXR1cm4gbGlzdE9iajtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICBsZXQgbGlzdCA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICBsZXQgbGlzdE9iaiA9IHRoaXMuZ2V0TGlzdE9iamVjdCgpO1xuICAgIGxldCBpdGVtcyA9IGxpc3RPYmouaXRlbXMubWFwKFxuICAgICAgKGl0ZW0sIGluZHgpID0+IGA8bGkgZGF0YS1pbmRleD1cIiR7aW5keH1cIj4ke2l0ZW0uaXRlbW5hbWV9PC9saT5gXG4gICAgKTtcblxuICAgIHRoaXMuZGlhZy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImQtY1wiPlxuICAgICAgPHNwYW4+XG4gICAgICAgIDxhIGhyZWY9XCJcIj5DbG9zZTwvYT5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxhcHAtdGl0bGUgdGl0bGU9XCIke2xpc3RPYmoubmFtZX1cIj48L2FwcC10aXRsZT5cbiAgICAgIDx1bD4ke2l0ZW1zfTwvdWw+XG4gICAgICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgICAgIDxsYWJlbD5Hcm9jZXJ5PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJpdGVtX25hbWVcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8bGFiZWw+UXVhbnRpdHk8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCJcIiBuYW1lPVwiaXRlbV9xdWFudGl0eVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PmA7XG5cbiAgICBsZXQgZm9vID0gdGhpcy5kaWFnLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGZvby5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcHVibGlzaChcIml0ZW0tYWRkZWRcIiwge1xuICAgICAgICBpdGVtbmFtZTogZm9vLml0ZW1fbmFtZS52YWx1ZS50cmltKCksXG4gICAgICAgIHF1YW50aXR5OiBmb28uaXRlbV9xdWFudGl0eS52YWx1ZSA9PSBcIlwiID8gXCIxXCIgOiBmb28uaXRlbV9xdWFudGl0eS52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgY2xvc2VCdXR0b24gPSB0aGlzLmRpYWcucXVlcnlTZWxlY3RvcihcInNwYW4gPiBhXCIpO1xuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xuICAgIH0pO1xuXG4gICAgbGV0IGVsbXMgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1pbmRleF1cIik7XG5cbiAgICBlbG1zLmZvckVhY2goKGVsbSwgaW5keCkgPT4ge1xuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwdWJsaXNoKFwiaXRlbS1yZW1vdmVkXCIsIHtcbiAgICAgICAgICBpbmR4OiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRGlhbG9nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==