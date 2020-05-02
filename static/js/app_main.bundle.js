/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app_main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/static/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app-main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src lazy recursive ^\\.\\/.*$":
/*!********************************************!*\
  !*** ./src lazy ^\.\/.*$ namespace object ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app-index": [
		"./src/app-index.js",
		9,
		2
	],
	"./app-index.js": [
		"./src/app-index.js",
		9,
		2
	],
	"./app-list": [
		"./src/app-list.js",
		9,
		3
	],
	"./app-list.js": [
		"./src/app-list.js",
		9,
		3
	],
	"./app-main": [
		"./src/app-main.js",
		9
	],
	"./app-main.js": [
		"./src/app-main.js",
		9
	],
	"./serviceworker": [
		"./src/serviceworker.js",
		7,
		4
	],
	"./serviceworker.js": [
		"./src/serviceworker.js",
		7,
		4
	],
	"./tests/dbfunc.test": [
		"./src/tests/dbfunc.test.js",
		9,
		0,
		5
	],
	"./tests/dbfunc.test.js": [
		"./src/tests/dbfunc.test.js",
		9,
		0,
		5
	],
	"./tests/router.test": [
		"./src/tests/router.test.js",
		9,
		1
	],
	"./tests/router.test.js": [
		"./src/tests/router.test.js",
		9,
		1
	],
	"./tests/storage.test": [
		"./src/tests/storage.test.js",
		9,
		6
	],
	"./tests/storage.test.js": [
		"./src/tests/storage.test.js",
		9,
		6
	],
	"./utils/dbfunc": [
		"./src/utils/dbfunc.js",
		9,
		13
	],
	"./utils/dbfunc.js": [
		"./src/utils/dbfunc.js",
		9,
		13
	],
	"./utils/navigation": [
		"./src/utils/navigation.js",
		9,
		10
	],
	"./utils/navigation.js": [
		"./src/utils/navigation.js",
		9,
		10
	],
	"./utils/pubsub": [
		"./src/utils/pubsub.js",
		9,
		14
	],
	"./utils/pubsub.js": [
		"./src/utils/pubsub.js",
		9,
		14
	],
	"./utils/router": [
		"./src/utils/router.js",
		9,
		7
	],
	"./utils/router.js": [
		"./src/utils/router.js",
		9,
		7
	],
	"./utils/storage": [
		"./src/utils/storage.js",
		9,
		15
	],
	"./utils/storage.js": [
		"./src/utils/storage.js",
		9,
		15
	],
	"./webcomponents/AppDialog": [
		"./src/webcomponents/AppDialog.js",
		9,
		8
	],
	"./webcomponents/AppDialog.js": [
		"./src/webcomponents/AppDialog.js",
		9,
		8
	],
	"./webcomponents/AppItemList": [
		"./src/webcomponents/AppItemList.js",
		9,
		18
	],
	"./webcomponents/AppItemList.js": [
		"./src/webcomponents/AppItemList.js",
		9,
		18
	],
	"./webcomponents/AppList": [
		"./src/webcomponents/AppList.js",
		9,
		11
	],
	"./webcomponents/AppList.js": [
		"./src/webcomponents/AppList.js",
		9,
		11
	],
	"./webcomponents/AppListForm": [
		"./src/webcomponents/AppListForm.js",
		9,
		12
	],
	"./webcomponents/AppListForm.js": [
		"./src/webcomponents/AppListForm.js",
		9,
		12
	],
	"./webcomponents/AppListItem": [
		"./src/webcomponents/AppListItem.js",
		9,
		16
	],
	"./webcomponents/AppListItem.js": [
		"./src/webcomponents/AppListItem.js",
		9,
		16
	],
	"./webcomponents/AppSnackbar": [
		"./src/webcomponents/AppSnackbar.js",
		9,
		9
	],
	"./webcomponents/AppSnackbar.js": [
		"./src/webcomponents/AppSnackbar.js",
		9,
		9
	],
	"./webcomponents/AppTitle": [
		"./src/webcomponents/AppTitle.js",
		9
	],
	"./webcomponents/AppTitle.js": [
		"./src/webcomponents/AppTitle.js",
		9
	],
	"./webcomponents/FloatingButton": [
		"./src/webcomponents/FloatingButton.js",
		9
	],
	"./webcomponents/FloatingButton.js": [
		"./src/webcomponents/FloatingButton.js",
		9
	],
	"./webcomponents/FormDialog": [
		"./src/webcomponents/FormDialog.js",
		9
	],
	"./webcomponents/FormDialog.js": [
		"./src/webcomponents/FormDialog.js",
		9
	],
	"./webcomponents/SelectList": [
		"./src/webcomponents/SelectList.js",
		9
	],
	"./webcomponents/SelectList.js": [
		"./src/webcomponents/SelectList.js",
		9
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(2).map(__webpack_require__.e)).then(function() {
		return __webpack_require__.t(id, ids[1])
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app-main.js":
/*!*************************!*\
  !*** ./src/app-main.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webcomponents_AppTitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcomponents/AppTitle */ "./src/webcomponents/AppTitle.js");
/* harmony import */ var _webcomponents_SelectList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcomponents/SelectList */ "./src/webcomponents/SelectList.js");
/* harmony import */ var _webcomponents_FormDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcomponents/FormDialog */ "./src/webcomponents/FormDialog.js");
/* harmony import */ var _webcomponents_FloatingButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webcomponents/FloatingButton */ "./src/webcomponents/FloatingButton.js");
/**
 * @file app-main.js
 */





const routes = [
    {
      uri: "/app/",
      module: "app-index"
    },
    {
      uri: "/app/list/",
      module: "app-list"
    },
    {
      uri: "/app/list/share/",
      module: "app-list-share"
    }
  ],
  mountElement = document.querySelector("main");

const loadpath = path => {
  let route = routes.find(r => r.uri === path);
  __webpack_require__("./src lazy recursive ^\\.\\/.*$")(`./${route.module}`).then(node => {
    mountElement.innerHTML = "";
    mountElement.append(node.render());
  });
};

const addListener = (rootElm, sel, func) => {
  rootElm.addEventListener("click", e => {
    let node = e.composedPath().find(n => n.nodeName === sel.toUpperCase());
    if (node !== undefined) {
      //console.log(e, node)
      func(e, node);
    }
  });
};

document.addEventListener("DOMContentLoaded", e => {
  const path = location.pathname;

  loadpath(path, mountElement);

  document.addEventListener("navigate", e => {
    let url = new URL(location.origin + e.detail.path);
    history.pushState({}, url.pathname, location.origin + url.pathname);
    loadpath(url.pathname, mountElement);
    e.preventDefault();
  });
});

window.onpopstate = () => {
  loadpath(window.location.pathname);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceworker.js", { scope: "/app/" });
}


/***/ }),

/***/ "./src/webcomponents/AppTitle.js":
/*!***************************************!*\
  !*** ./src/webcomponents/AppTitle.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
<div><h1></h1></div>
`;

class AppTitle extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "backbutton"];
  }

  connectedCallback() {
    // console.log("title connected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log("title attributechanged");
    // console.log(name, oldValue, newValue);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("app-title", AppTitle));


/***/ }),

/***/ "./src/webcomponents/FloatingButton.js":
/*!*********************************************!*\
  !*** ./src/webcomponents/FloatingButton.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename FloatingButton.js
 */
const template = document.createElement("template");
template.innerHTML = `<style>
    .fab {
      width: 70px;
      height: 70px;
      background-color: red;
      border-radius: 50%;
      box-shadow: 0 6px 10px 0 #666;
      font-size: 50px;
      line-height: 70px;
      color: #fff;
      text-align: center;
      position: fixed;
      right: 25px;
      bottom: 25px;
      transition: all 0.1s easi-in-out;
      cursor: pointer;
    }
    div:hover {
      box-shadow: 0 6px 14px 0 #666;
      transform: scale(1.05);
    }
  </style><div class="fab"> + </div>`;

class FloatingButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = this.shadowRoot.querySelector(".fab");
  }

  connectedCallback() {}
}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("floating-button", FloatingButton));


/***/ }),

/***/ "./src/webcomponents/FormDialog.js":
/*!*****************************************!*\
  !*** ./src/webcomponents/FormDialog.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename FormDialog.js
 */


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

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("form-dialog", FormDialog));


/***/ }),

/***/ "./src/webcomponents/SelectList.js":
/*!*****************************************!*\
  !*** ./src/webcomponents/SelectList.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename List.js
 */


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

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("select-list", SelectList));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7OztRQUlBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHdCQUF3QixrQ0FBa0M7UUFDMUQsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLDBDQUEwQyxvQkFBb0IsV0FBVzs7UUFFekU7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsdUJBQXVCO1FBQ3ZDOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7O0FDeE9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDZ0Q7QUFDSTtBQUNBO0FBQ1E7O0FBRTVEO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7O0FBRWUsK0dBQWdELEVBQUMiLCJmaWxlIjoiYXBwX21haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBfbWFpblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvanMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC1tYWluLmpzXCIpO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC1pbmRleFwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1pbmRleC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1saXN0XCI6IFtcblx0XHRcIi4vc3JjL2FwcC1saXN0LmpzXCIsXG5cdFx0OSxcblx0XHQzXG5cdF0sXG5cdFwiLi9hcHAtbGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0M1xuXHRdLFxuXHRcIi4vYXBwLW1haW5cIjogW1xuXHRcdFwiLi9zcmMvYXBwLW1haW4uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi9hcHAtbWFpbi5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbWFpbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3NlcnZpY2V3b3JrZXJcIjogW1xuXHRcdFwiLi9zcmMvc2VydmljZXdvcmtlci5qc1wiLFxuXHRcdDcsXG5cdFx0NFxuXHRdLFxuXHRcIi4vc2VydmljZXdvcmtlci5qc1wiOiBbXG5cdFx0XCIuL3NyYy9zZXJ2aWNld29ya2VyLmpzXCIsXG5cdFx0Nyxcblx0XHQ0XG5cdF0sXG5cdFwiLi90ZXN0cy9kYmZ1bmMudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MCxcblx0XHQ1XG5cdF0sXG5cdFwiLi90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MCxcblx0XHQ1XG5cdF0sXG5cdFwiLi90ZXN0cy9yb3V0ZXIudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MVxuXHRdLFxuXHRcIi4vdGVzdHMvcm91dGVyLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDFcblx0XSxcblx0XCIuL3Rlc3RzL3N0b3JhZ2UudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDZcblx0XSxcblx0XCIuL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDZcblx0XSxcblx0XCIuL3V0aWxzL2RiZnVuY1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9kYmZ1bmMuanNcIixcblx0XHQ5LFxuXHRcdDEzXG5cdF0sXG5cdFwiLi91dGlscy9kYmZ1bmMuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvZGJmdW5jLmpzXCIsXG5cdFx0OSxcblx0XHQxM1xuXHRdLFxuXHRcIi4vdXRpbHMvbmF2aWdhdGlvblwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9uYXZpZ2F0aW9uLmpzXCIsXG5cdFx0OSxcblx0XHQxMFxuXHRdLFxuXHRcIi4vdXRpbHMvbmF2aWdhdGlvbi5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9uYXZpZ2F0aW9uLmpzXCIsXG5cdFx0OSxcblx0XHQxMFxuXHRdLFxuXHRcIi4vdXRpbHMvcHVic3ViXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3B1YnN1Yi5qc1wiLFxuXHRcdDksXG5cdFx0MTRcblx0XSxcblx0XCIuL3V0aWxzL3B1YnN1Yi5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9wdWJzdWIuanNcIixcblx0XHQ5LFxuXHRcdDE0XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXJcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5LFxuXHRcdDE1XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5LFxuXHRcdDE1XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcERpYWxvZ1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1wiLFxuXHRcdDksXG5cdFx0OFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIixcblx0XHQ5LFxuXHRcdDhcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MThcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MThcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIixcblx0XHQ5LFxuXHRcdDExXG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxMVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OSxcblx0XHQxMlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OSxcblx0XHQxMlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OSxcblx0XHQxNlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OSxcblx0XHQxNlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2JhclwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCIsXG5cdFx0OSxcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIixcblx0XHQ5LFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGVcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvRmxvYXRpbmdCdXR0b25cIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvRmxvYXRpbmdCdXR0b24uanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvRm9ybURpYWxvZ1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0Zvcm1EaWFsb2cuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0Zvcm1EaWFsb2cuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0XCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdC5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanNcIixcblx0XHQ5XG5cdF1cbn07XG5mdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0KHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdFx0dGhyb3cgZTtcblx0XHR9KTtcblx0fVxuXG5cdHZhciBpZHMgPSBtYXBbcmVxXSwgaWQgPSBpZHNbMF07XG5cdHJldHVybiBQcm9taXNlLmFsbChpZHMuc2xpY2UoMikubWFwKF9fd2VicGFja19yZXF1aXJlX18uZSkpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udChpZCwgaWRzWzFdKVxuXHR9KTtcbn1cbndlYnBhY2tBc3luY0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQXN5bmNDb250ZXh0LmlkID0gXCIuL3NyYyBsYXp5IHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qJFwiO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQXN5bmNDb250ZXh0OyIsIi8qKlxuICogQGZpbGUgYXBwLW1haW4uanNcbiAqL1xuaW1wb3J0IEFwcFRpdGxlIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGVcIjtcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gXCIuL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdFwiO1xuaW1wb3J0IEZvcm1EaWFsb2cgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nXCI7XG5pbXBvcnQgRmxvYXRpbmdCdXR0b24gZnJvbSBcIi4vd2ViY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvblwiO1xuXG5jb25zdCByb3V0ZXMgPSBbXG4gICAge1xuICAgICAgdXJpOiBcIi9hcHAvXCIsXG4gICAgICBtb2R1bGU6IFwiYXBwLWluZGV4XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL2xpc3QvXCIsXG4gICAgICBtb2R1bGU6IFwiYXBwLWxpc3RcIlxuICAgIH0sXG4gICAge1xuICAgICAgdXJpOiBcIi9hcHAvbGlzdC9zaGFyZS9cIixcbiAgICAgIG1vZHVsZTogXCJhcHAtbGlzdC1zaGFyZVwiXG4gICAgfVxuICBdLFxuICBtb3VudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcblxuY29uc3QgbG9hZHBhdGggPSBwYXRoID0+IHtcbiAgbGV0IHJvdXRlID0gcm91dGVzLmZpbmQociA9PiByLnVyaSA9PT0gcGF0aCk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKG5vZGUgPT4ge1xuICAgIG1vdW50RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1vdW50RWxlbWVudC5hcHBlbmQobm9kZS5yZW5kZXIoKSk7XG4gIH0pO1xufTtcblxuY29uc3QgYWRkTGlzdGVuZXIgPSAocm9vdEVsbSwgc2VsLCBmdW5jKSA9PiB7XG4gIHJvb3RFbG0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgIGxldCBub2RlID0gZS5jb21wb3NlZFBhdGgoKS5maW5kKG4gPT4gbi5ub2RlTmFtZSA9PT0gc2VsLnRvVXBwZXJDYXNlKCkpO1xuICAgIGlmIChub2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vY29uc29sZS5sb2coZSwgbm9kZSlcbiAgICAgIGZ1bmMoZSwgbm9kZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGUgPT4ge1xuICBjb25zdCBwYXRoID0gbG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgbG9hZHBhdGgocGF0aCwgbW91bnRFbGVtZW50KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibmF2aWdhdGVcIiwgZSA9PiB7XG4gICAgbGV0IHVybCA9IG5ldyBVUkwobG9jYXRpb24ub3JpZ2luICsgZS5kZXRhaWwucGF0aCk7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIHVybC5wYXRobmFtZSwgbG9jYXRpb24ub3JpZ2luICsgdXJsLnBhdGhuYW1lKTtcbiAgICBsb2FkcGF0aCh1cmwucGF0aG5hbWUsIG1vdW50RWxlbWVudCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn0pO1xuXG53aW5kb3cub25wb3BzdGF0ZSA9ICgpID0+IHtcbiAgbG9hZHBhdGgod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEFwcFRpdGxlXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbjxzdHlsZT5cbmgxIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxkaXY+PGgxPjwvaDE+PC9kaXY+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJ0aXRsZVwiLCBcImJhY2tidXR0b25cIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGNvbm5lY3RlZFwiKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGF0dHJpYnV0ZWNoYW5nZWRcIik7XG4gICAgLy8gY29uc29sZS5sb2cobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtdGl0bGVcIiwgQXBwVGl0bGUpO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgRmxvYXRpbmdCdXR0b24uanNcbiAqL1xuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgPHN0eWxlPlxuICAgIC5mYWIge1xuICAgICAgd2lkdGg6IDcwcHg7XG4gICAgICBoZWlnaHQ6IDcwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBib3gtc2hhZG93OiAwIDZweCAxMHB4IDAgIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiA3MHB4O1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICByaWdodDogMjVweDtcbiAgICAgIGJvdHRvbTogMjVweDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjFzIGVhc2ktaW4tb3V0O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgICBkaXY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCA2cHggMTRweCAwICM2NjY7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIH1cbiAgPC9zdHlsZT48ZGl2IGNsYXNzPVwiZmFiXCI+ICsgPC9kaXY+YDtcblxuY2xhc3MgRmxvYXRpbmdCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZWxtID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuZmFiXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJmbG9hdGluZy1idXR0b25cIiwgRmxvYXRpbmdCdXR0b24pO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgRm9ybURpYWxvZy5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG48c3R5bGU+XG4gIGRpYWxvZyB7XG4gICAgbWF4LWhlaWdodDogMzYwcHg7XG4gICAgbWluLXdpZHRoOiAyNDBweDtcbiAgICBtYXgtd2lkdGg6IDI0MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLmRpYWxvZ19fdGl0bGUge1xuICAgIG1hcmdpbi10b3A6IDBweDtcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xMjVyZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwIDI0cHggOXB4O1xuICB9XG4gIGZvcm0ge1xuICAgIHBhZGRpbmc6IDAgMjRweCA5cHg7XG4gIH1cbiAgLmRpYWxvZ19fYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZmxleC1zaHJpbms6IHdyYXA7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIG1pbi1oZWlnaHQ6IDUycHg7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbjwvc3R5bGU+XG48ZGlhbG9nPlxuICA8aDIgY2xhc3M9XCJkaWFsb2dfX3RpdGxlXCI+Rm9ybSBUaXRsZTwvaDI+XG4gIDxmb3JtIG1ldGhvZD1cImRpYWxvZ1wiIGlkPVwiZm9ybVwiPlxuICA8Zm9vdGVyIGNsYXNzPVwiZGlhbG9nX19hY3Rpb25zXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+Q2FuY2VsPC9idXR0b24+XG4gIDwvZm9vdGVyPlxuICA8L2Zvcm0+XG48L2RpYWxvZz5gO1xuXG5jbGFzcyBGb3JtRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wib3BlblwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZGlhbG9nID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG4gICAgdGhpcy5mb3JtRGF0YSA9IHt9O1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5kaWFsb2cucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIEFycmF5LmZyb20oZS50YXJnZXQuZWxlbWVudHMpLmZvckVhY2goZWxtID0+IHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZm9ybURhdGEpLmluY2x1ZGVzKGVsbS5uYW1lKSkge1xuICAgICAgICAgIHRoaXMuZm9ybURhdGFbZWxtLm5hbWVdID0gZWxtLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxldCBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNsb3NlXCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgZm9ybURhdGE6IHRoaXMuZm9ybURhdGFcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlhbG9nXG4gICAgICAucXVlcnlTZWxlY3RvcihcIlt0eXBlPSdyZXNldCddXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdGhpcy5kaWFsb2cuY2xvc2UoKSk7XG4gIH1cblxuICBmb3JtRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtRGF0YTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZGlhbG9nLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZWRcIiwgbmFtZSwgbmV3VmFsLCBvbGRWYWwpO1xuICAgIGlmIChuYW1lID09PSBcIm9wZW5cIiAmJiB0aGlzLmRpYWxvZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLmhhc0F0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cblxuICBzZXQgb3Blbihpc09wZW4pIHtcbiAgICBpZiAoaXNPcGVuKSB0aGlzLmRpYWxvZy5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwiXCIpO1xuICAgIGVsc2UgdGhpcy5kaWFsb2cucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwib3BlblwiKSA9PT0gZmFsc2UpIHRoaXMuc2V0QXR0cmlidXRlKFwib3BlblwiLCBcIlwiKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgfVxuXG4gIGFkZEZpZWxkKGZpZWxkcykge1xuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZWxtLnR5cGUgPSBmaWVsZHMudHlwZTsgLy8gQnVpbGRlciBuZWVkZWRcbiAgICBlbG0ubmFtZSA9IGZpZWxkcy5uYW1lO1xuICAgIGVsbS52YWx1ZSA9IGZpZWxkcy52YWx1ZTtcbiAgICBlbG0ucGxhY2Vob2xkZXIgPSBmaWVsZHMucGxhY2Vob2xkZXI7XG4gICAgbGV0IGZvbyA9IHRoaXMuZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGZvby5wcmVwZW5kKGVsbSk7XG5cbiAgICB0aGlzLmZvcm1EYXRhW2ZpZWxkcy5uYW1lXSA9IGZpZWxkcy52YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJmb3JtLWRpYWxvZ1wiLCBGb3JtRGlhbG9nKTtcbiIsIi8qKlxuICogQGZpbGVuYW1lIExpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLmxpc3Qge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgfVxuICAubGlzdC1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBwYWRkaW5nOiAwIDE2cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIC5saXN0LWl0ZW1fX3RleHQge1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuICA8L3N0eWxlPlxuICA8dWwgY2xhc3M9XCJsaXN0XCI+PC91bD5gO1xuXG5jbGFzcyBTZWxlY3RMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5fcm9vdCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5saXN0XCIpO1xuXG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zZWxlY3QtaXRlbV1cIik7XG4gICAgdGhpcy5fcm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgb3B0ID0gZS50YXJnZXQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbaV0uZmlyc3RDaGlsZCA9PT0gb3B0KSB0aGlzLmluZGV4ID0gaTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwic2VsZWN0XCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgaWQ6IG9wdC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0LWl0ZW1cIiksXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJkaXNjb25uZWN0ZWRcIik7XG4gIH1cblxuICBhZGQob2JqKSB7XG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBlbG0uY2xhc3NOYW1lID0gXCJsaXN0LWl0ZW1cIjtcbiAgICBlbG0uc2V0QXR0cmlidXRlKFwiZGF0YS1zZWxlY3QtaXRlbVwiLCBvYmouaWQpO1xuICAgIGVsbS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJsaXN0LWl0ZW1fX3RleHRcIlwiPiR7b2JqLm5hbWV9PC9zcGFuPmA7XG4gICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZChlbG0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInNlbGVjdC1saXN0XCIsIFNlbGVjdExpc3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==