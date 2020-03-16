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
/**
 * index.js
 * CustomEvent https://gomakethings.com/custom-events-with-vanilla-javascript/
 * HTMLElment https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
 */

// Paint it black
(() => {
  let r = /\//gi;
  let loc = document.location.pathname.replace(r, "");
  if (loc === "") loc = "index";
  let bodyElm = document.querySelector("body");
  bodyElm.classList.toggle(`js-${loc}`);
})();

(() => {
  const listElm = document.querySelector('app-list')
  listElm.setAttribute('userid', localStorage.getItem('_u') || 0)

  const formElm = document.querySelector('app-form')
  formElm.setAttribute('userid', localStorage.getItem('_u') || 0)
})()


window.customElements.define("app-title", __WEBPACK_IMPORTED_MODULE_0__webcomponents_AppTitle_js__["a" /* default */]);


window.customElements.define("app-list", __WEBPACK_IMPORTED_MODULE_1__webcomponents_AppList_js__["a" /* default */])


window.customElements.define("app-snackbar", __WEBPACK_IMPORTED_MODULE_2__webcomponents_AppSnackbar_js__["a" /* default */])


window.customElements.define("app-form", __WEBPACK_IMPORTED_MODULE_3__webcomponents_AppForm_js__["a" /* default */])



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
h1 {
  padding: 0 5px;
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
  }

  get title() {
    return this._title;
  }
  set title(t) {
    this.setAttribute("title", t.trim());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._title = newValue;
      this.render();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["b" /* subscribe */])("item-added", () => this._updateList());
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
      liElm.innerHTML = `<div data-id="${item.id}">${item.name}</div>`;
      liElm.addEventListener("click", e => console.log(e));
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
  }
  label {
    bottom: 0;
    color: rgba(0,0,0,.26);
    font-size: 16px;
    left: 0;
    right: 0;
    pointer-events: none;
    position: absolute;
    display: block;
    top: 24px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
  }
  input {
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.12);
    display: block;
    font-size: 16px;
    font-family: "Helvetica","Arial",sans-serif;
    margin: 0;
    padding: 4px 0;
    width: 100%;
    background: 0 0;
    text-align: left;
    color: inherit;
    outline: none;
  }
  button {
    background: 0 0;
    border: none;
    border-radius: 2px;
    color: #000;
    position: relative;
    height: 36px;
    margin: 0;
    min-width: 64px;
    padding: 0 16px;
    display: inline-block;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0;
    overflow: hidden;
    will-change: box-shadow;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1),color .2s cubic-bezier(.4,0,.2,1);
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 36px;
    vertical-align: middle;
    background: rgba(158,158,158,.2);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  </style>
  <form autocomplete="off">
    <label>Name of List</label>
    <input type="text" name="list_name" value="">
    <button type="submit">Save</button>
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
            Object(__WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__["a" /* publish */])("item-added", { name: name });
          });
      }
    });
  }

  render() {}
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

const subscribers = {};

const subscribe = (message, callback) => {
  if (Object.keys(subscribers).includes(message) === false) {
    subscribers[message] = [];
  }

  subscribers[message].push(callback);
};

const publish = (message, payload) => {
  console.log("message", message);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDdkODAxOGQ0MThmMGExMDk5MzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3B1YnN1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLElBQUk7QUFDckMsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNyREE7QUFBQTtBQUNBO0FBQ0E7QUFDNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDLFFBQVEsSUFBSSxVQUFVO0FBQy9EO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDdEVBO0FBQUE7QUFDQTtBQUNBO0FBQzZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsbUdBQW1DLGFBQWE7QUFDaEQsV0FBVztBQUNYO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDNUhBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUMzQ0E7QUFBQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVRIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDdkODAxOGQ0MThmMGExMDk5MzQiLCIvKipcbiAqIGluZGV4LmpzXG4gKiBDdXN0b21FdmVudCBodHRwczovL2dvbWFrZXRoaW5ncy5jb20vY3VzdG9tLWV2ZW50cy13aXRoLXZhbmlsbGEtamF2YXNjcmlwdC9cbiAqIEhUTUxFbG1lbnQgaHR0cHM6Ly9kZXYudG8vdGhlcGFzc2xlL3dlYi1jb21wb25lbnRzLWZyb20temVyby10by1oZXJvLTRuNG1cbiAqL1xuXG4vLyBQYWludCBpdCBibGFja1xuKCgpID0+IHtcbiAgbGV0IHIgPSAvXFwvL2dpO1xuICBsZXQgbG9jID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZShyLCBcIlwiKTtcbiAgaWYgKGxvYyA9PT0gXCJcIikgbG9jID0gXCJpbmRleFwiO1xuICBsZXQgYm9keUVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBib2R5RWxtLmNsYXNzTGlzdC50b2dnbGUoYGpzLSR7bG9jfWApO1xufSkoKTtcblxuKCgpID0+IHtcbiAgY29uc3QgbGlzdEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FwcC1saXN0JylcbiAgbGlzdEVsbS5zZXRBdHRyaWJ1dGUoJ3VzZXJpZCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfdScpIHx8IDApXG5cbiAgY29uc3QgZm9ybUVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2FwcC1mb3JtJylcbiAgZm9ybUVsbS5zZXRBdHRyaWJ1dGUoJ3VzZXJpZCcsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfdScpIHx8IDApXG59KSgpXG5cbmltcG9ydCBBcHBUaXRsZSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXRpdGxlXCIsIEFwcFRpdGxlKTtcblxuaW1wb3J0IEFwcExpc3QgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCJcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtbGlzdFwiLCBBcHBMaXN0KVxuXG5pbXBvcnQgQXBwU25hY2tiYXIgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXNuYWNrYmFyXCIsIEFwcFNuYWNrYmFyKVxuXG5pbXBvcnQgQXBwRm9ybSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcEZvcm0uanNcIlxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1mb3JtXCIsIEFwcEZvcm0pXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwVGl0bGVcbiAqL1xuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG48c3R5bGU+XG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuaDEge1xuICBwYWRkaW5nOiAwIDVweDtcbn1cbjwvc3R5bGU+XG48aDE+PC9oMT5cbmA7XG5cbmNsYXNzIEFwcFRpdGxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3RpdGxlID0gXCJcIjtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJ0aXRsZVwiXTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcInRpdGxlXCIpKSB7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICB9XG4gIH1cblxuICBnZXQgdGl0bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICB9XG4gIHNldCB0aXRsZSh0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCB0LnRyaW0oKSk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdGl0bGUgPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImgxXCIpLmlubmVySFRNTCA9IHRoaXMudGl0bGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwVGl0bGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQXBwTGlzdC5qc1xuICovXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8dWw+PC91bD5gO1xuXG5jbGFzcyBBcHBMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widXNlcmlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9zaGFkb3dSb290Lmhvc3QucGFyZW50Tm9kZTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fdXBkYXRlTGlzdCgpO1xuICAgIHN1YnNjcmliZShcIml0ZW0tYWRkZWRcIiwgKCkgPT4gdGhpcy5fdXBkYXRlTGlzdCgpKTtcbiAgfVxuXG4gIF91cGRhdGVMaXN0KCkge1xuICAgIGZldGNoKGAvc2VydmljZS8ke3RoaXMudXNlcmlkfS9saXN0cy9gKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGpzb24udXNlcl9saXN0cztcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICBwdWJsaXNoKFwibGlzdC1mZXRjaGVkXCIsIHtcbiAgICAgICAgICBpdGVtczoganNvbi51c2VyX2xpc3RzLmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgbGlzdCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgIGxpc3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSwgaW5keCkgPT4ge1xuICAgICAgbGV0IGxpRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgbGlFbG0uaW5uZXJIVE1MID0gYDxkaXYgZGF0YS1pZD1cIiR7aXRlbS5pZH1cIj4ke2l0ZW0ubmFtZX08L2Rpdj5gO1xuICAgICAgbGlFbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gY29uc29sZS5sb2coZSkpO1xuICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaUVsbSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwTGlzdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcEZvcm0uanNcbiAqL1xuaW1wb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgZm9ybSB7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuICB9XG4gIGxhYmVsIHtcbiAgICBib3R0b206IDA7XG4gICAgY29sb3I6IHJnYmEoMCwwLDAsLjI2KTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgdG9wOiAyNHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG4gIGlucHV0IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhXCIsXCJBcmlhbFwiLHNhbnMtc2VyaWY7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDRweCAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IDAgMDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cbiAgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiAwIDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBjb2xvcjogIzAwMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIG1hcmdpbjogMDtcbiAgICBtaW4td2lkdGg6IDY0cHg7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LWZhbWlseTogXCJSb2JvdG9cIixcIkhlbHZldGljYVwiLFwiQXJpYWxcIixzYW5zLXNlcmlmO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aWxsLWNoYW5nZTogYm94LXNoYWRvdztcbiAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IC4ycyBjdWJpYy1iZXppZXIoLjQsMCwxLDEpLGJhY2tncm91bmQtY29sb3IgLjJzIGN1YmljLWJlemllciguNCwwLC4yLDEpLGNvbG9yIC4ycyBjdWJpYy1iZXppZXIoLjQsMCwuMiwxKTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgYmFja2dyb3VuZDogcmdiYSgxNTgsMTU4LDE1OCwuMik7XG4gICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xuICB9XG4gIDwvc3R5bGU+XG4gIDxmb3JtIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgIDxsYWJlbD5OYW1lIG9mIExpc3Q8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsaXN0X25hbWVcIiB2YWx1ZT1cIlwiPlxuICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgPC9mb3JtPlxuICBgO1xuXG5jbGFzcyBBcHBGb3JtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibmFtZVwiLCBcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdXNlcklkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ1c2VyaWRcIik7XG5cbiAgICB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0W1wibGlzdF9uYW1lXCJdLnZhbHVlLnRyaW0oKTtcbiAgICAgIGlmIChuYW1lICE9PSBcIlwiKSB7XG4gICAgICAgIGZldGNoKGAvc2VydmljZS8ke3VzZXJJZH0vbGlzdHMvYCwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGxpc3RfbmFtZTogbmFtZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIG5hbWUpO1xuICAgICAgICAgICAgcHVibGlzaChcIml0ZW0tYWRkZWRcIiwgeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRm9ybTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEFwcEVycm9yLmpzXG4gKiBUT0RPOiBSZW5hbWUgdG8gc29tZXRoaW5nIG1vcmUgZ2VuZXJpY1xuICovXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gIDpob3N0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAuc25hY2tiYXItY29udGFpbmVyIHtcbiAgICBcbiAgfVxuICA8L3N0eWxlPlxuICA8ZGl2IGlkPVwic25hY2tiYXItY29udGFpbmVyXCI+PC9kaXY+YDtcblxuY2xhc3MgQXBwU25hY2tiYXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJtZXNzYWdlXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzbmFja2Jhci1jb250YWluZXJcIik7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdWJzY3JpYmUoXCJsaXN0LWNoYW5nZWRcIiwgcGF5bG9hZCA9PlxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJtZXNzYWdlXCIsIFwiSGVsbG8gUHVzc3lcIilcbiAgICApO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwU25hY2tiYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogUHViU3ViLmpzXG4gKiBzdWJzY3JpYmVyc3trZXk6IFtdfVxuICovXG5cbmNvbnN0IHN1YnNjcmliZXJzID0ge307XG5cbmNvbnN0IHN1YnNjcmliZSA9IChtZXNzYWdlLCBjYWxsYmFjaykgPT4ge1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSBmYWxzZSkge1xuICAgIHN1YnNjcmliZXJzW21lc3NhZ2VdID0gW107XG4gIH1cblxuICBzdWJzY3JpYmVyc1ttZXNzYWdlXS5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbmNvbnN0IHB1Ymxpc2ggPSAobWVzc2FnZSwgcGF5bG9hZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIm1lc3NhZ2VcIiwgbWVzc2FnZSk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IHRydWUpIHtcbiAgICBsZXQgc3VicyA9IHN1YnNjcmliZXJzW21lc3NhZ2VdO1xuICAgIGZvciAobGV0IHMgaW4gc3Vicykge1xuICAgICAgc3Vic1tzXShwYXlsb2FkKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4gY29uc29sZS5sb2coXCJUT0RPXCIpO1xuXG5leHBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9wdWJzdWIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==