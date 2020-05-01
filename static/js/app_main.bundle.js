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

const loadpath = (path, elm) => {
  let route = routes.find(r => r.uri === path);
  mountElement.firstChild.remove();
  __webpack_require__("./src lazy recursive ^\\.\\/.*$")(`./${route.module}`).then(mod =>
    mod.default().then(node => mountElement.appendChild(node))
  );
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
  loadpath(window.location.pathname, mountElement);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9GbG9hdGluZ0J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7OztRQUlBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHdCQUF3QixrQ0FBa0M7UUFDMUQsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLDBDQUEwQyxvQkFBb0IsV0FBVzs7UUFFekU7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsdUJBQXVCO1FBQ3ZDOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7Ozs7Ozs7O0FDeE9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDZ0Q7QUFDSTtBQUNBO0FBQ1E7O0FBRTVEO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBOztBQUVlLCtHQUFnRCxFQUFDIiwiZmlsZSI6ImFwcF9tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwX21haW5cIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmJ1bmRsZS5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc3RhdGljL2pzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAtbWFpbi5qc1wiKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAtaW5kZXhcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWluZGV4LmpzXCIsXG5cdFx0OSxcblx0XHQyXG5cdF0sXG5cdFwiLi9hcHAtaW5kZXguanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWluZGV4LmpzXCIsXG5cdFx0OSxcblx0XHQyXG5cdF0sXG5cdFwiLi9hcHAtbGlzdFwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0M1xuXHRdLFxuXHRcIi4vYXBwLWxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWxpc3QuanNcIixcblx0XHQ5LFxuXHRcdDNcblx0XSxcblx0XCIuL2FwcC1tYWluXCI6IFtcblx0XHRcIi4vc3JjL2FwcC1tYWluLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vYXBwLW1haW4uanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLW1haW4uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi9zZXJ2aWNld29ya2VyXCI6IFtcblx0XHRcIi4vc3JjL3NlcnZpY2V3b3JrZXIuanNcIixcblx0XHQ3LFxuXHRcdDRcblx0XSxcblx0XCIuL3NlcnZpY2V3b3JrZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvc2VydmljZXdvcmtlci5qc1wiLFxuXHRcdDcsXG5cdFx0NFxuXHRdLFxuXHRcIi4vdGVzdHMvZGJmdW5jLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDAsXG5cdFx0NVxuXHRdLFxuXHRcIi4vdGVzdHMvZGJmdW5jLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDAsXG5cdFx0NVxuXHRdLFxuXHRcIi4vdGVzdHMvcm91dGVyLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDFcblx0XSxcblx0XCIuL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxXG5cdF0sXG5cdFwiLi90ZXN0cy9zdG9yYWdlLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQ2XG5cdF0sXG5cdFwiLi90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQ2XG5cdF0sXG5cdFwiLi91dGlscy9kYmZ1bmNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvZGJmdW5jLmpzXCIsXG5cdFx0OSxcblx0XHQxM1xuXHRdLFxuXHRcIi4vdXRpbHMvZGJmdW5jLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL2RiZnVuYy5qc1wiLFxuXHRcdDksXG5cdFx0MTNcblx0XSxcblx0XCIuL3V0aWxzL25hdmlnYXRpb25cIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvbmF2aWdhdGlvbi5qc1wiLFxuXHRcdDksXG5cdFx0MTBcblx0XSxcblx0XCIuL3V0aWxzL25hdmlnYXRpb24uanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvbmF2aWdhdGlvbi5qc1wiLFxuXHRcdDksXG5cdFx0MTBcblx0XSxcblx0XCIuL3V0aWxzL3B1YnN1YlwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9wdWJzdWIuanNcIixcblx0XHQ5LFxuXHRcdDE0XG5cdF0sXG5cdFwiLi91dGlscy9wdWJzdWIuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcHVic3ViLmpzXCIsXG5cdFx0OSxcblx0XHQxNFxuXHRdLFxuXHRcIi4vdXRpbHMvcm91dGVyXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3JvdXRlci5qc1wiLFxuXHRcdDksXG5cdFx0N1xuXHRdLFxuXHRcIi4vdXRpbHMvcm91dGVyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3JvdXRlci5qc1wiLFxuXHRcdDksXG5cdFx0N1xuXHRdLFxuXHRcIi4vdXRpbHMvc3RvcmFnZVwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9zdG9yYWdlLmpzXCIsXG5cdFx0OSxcblx0XHQxNVxuXHRdLFxuXHRcIi4vdXRpbHMvc3RvcmFnZS5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9zdG9yYWdlLmpzXCIsXG5cdFx0OSxcblx0XHQxNVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBEaWFsb2dcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIixcblx0XHQ5LFxuXHRcdDhcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCIsXG5cdFx0OSxcblx0XHQ4XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcEl0ZW1MaXN0XCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanNcIixcblx0XHQ5LFxuXHRcdDE4XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcEl0ZW1MaXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanNcIixcblx0XHQ5LFxuXHRcdDE4XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxMVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MTFcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm1cIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiLFxuXHRcdDksXG5cdFx0MTJcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm0uanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiLFxuXHRcdDksXG5cdFx0MTJcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW1cIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiLFxuXHRcdDksXG5cdFx0MTZcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW0uanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiLFxuXHRcdDksXG5cdFx0MTZcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXJcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiLFxuXHRcdDksXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCIsXG5cdFx0OSxcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0Zsb2F0aW5nQnV0dG9uXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvRmxvYXRpbmdCdXR0b24uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0Zsb2F0aW5nQnV0dG9uLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvRmxvYXRpbmdCdXR0b24uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0Zvcm1EaWFsb2dcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvRm9ybURpYWxvZy5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzXCIsXG5cdFx0OVxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHRcdHRocm93IGU7XG5cdFx0fSk7XG5cdH1cblxuXHR2YXIgaWRzID0gbWFwW3JlcV0sIGlkID0gaWRzWzBdO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoaWRzLnNsaWNlKDIpLm1hcChfX3dlYnBhY2tfcmVxdWlyZV9fLmUpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQoaWQsIGlkc1sxXSlcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiLCIvKipcbiAqIEBmaWxlIGFwcC1tYWluLmpzXG4gKi9cbmltcG9ydCBBcHBUaXRsZSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlXCI7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tIFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdExpc3RcIjtcbmltcG9ydCBGb3JtRGlhbG9nIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvRm9ybURpYWxvZ1wiO1xuaW1wb3J0IEZsb2F0aW5nQnV0dG9uIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvRmxvYXRpbmdCdXR0b25cIjtcblxuY29uc3Qgcm91dGVzID0gW1xuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1pbmRleFwiXG4gICAgfSxcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9saXN0L1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1saXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL2xpc3Qvc2hhcmUvXCIsXG4gICAgICBtb2R1bGU6IFwiYXBwLWxpc3Qtc2hhcmVcIlxuICAgIH1cbiAgXSxcbiAgbW91bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbmNvbnN0IGxvYWRwYXRoID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgcm91dGUgPSByb3V0ZXMuZmluZChyID0+IHIudXJpID09PSBwYXRoKTtcbiAgbW91bnRFbGVtZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKG1vZCA9PlxuICAgIG1vZC5kZWZhdWx0KCkudGhlbihub2RlID0+IG1vdW50RWxlbWVudC5hcHBlbmRDaGlsZChub2RlKSlcbiAgKTtcbn07XG5cbmNvbnN0IGFkZExpc3RlbmVyID0gKHJvb3RFbG0sIHNlbCwgZnVuYykgPT4ge1xuICByb290RWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUuY29tcG9zZWRQYXRoKCkuZmluZChuID0+IG4ubm9kZU5hbWUgPT09IHNlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGUsIG5vZGUpXG4gICAgICBmdW5jKGUsIG5vZGUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBlID0+IHtcbiAgY29uc3QgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIGxvYWRwYXRoKHBhdGgsIG1vdW50RWxlbWVudCk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdmlnYXRlXCIsIGUgPT4ge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLm9yaWdpbiArIGUuZGV0YWlsLnBhdGgpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCB1cmwucGF0aG5hbWUsIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gIGxvYWRwYXRoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgbW91bnRFbGVtZW50KTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEFwcFRpdGxlXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbjxzdHlsZT5cbmgxIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxkaXY+PGgxPjwvaDE+PC9kaXY+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJ0aXRsZVwiLCBcImJhY2tidXR0b25cIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGNvbm5lY3RlZFwiKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGF0dHJpYnV0ZWNoYW5nZWRcIik7XG4gICAgLy8gY29uc29sZS5sb2cobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtdGl0bGVcIiwgQXBwVGl0bGUpO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgRmxvYXRpbmdCdXR0b24uanNcbiAqL1xuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgPHN0eWxlPlxuICAgIC5mYWIge1xuICAgICAgd2lkdGg6IDcwcHg7XG4gICAgICBoZWlnaHQ6IDcwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBib3gtc2hhZG93OiAwIDZweCAxMHB4IDAgIzY2NjtcbiAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiA3MHB4O1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICByaWdodDogMjVweDtcbiAgICAgIGJvdHRvbTogMjVweDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjFzIGVhc2ktaW4tb3V0O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIH1cbiAgICBkaXY6aG92ZXIge1xuICAgICAgYm94LXNoYWRvdzogMCA2cHggMTRweCAwICM2NjY7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgIH1cbiAgPC9zdHlsZT48ZGl2IGNsYXNzPVwiZmFiXCI+ICsgPC9kaXY+YDtcblxuY2xhc3MgRmxvYXRpbmdCdXR0b24gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZWxtID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIuZmFiXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJmbG9hdGluZy1idXR0b25cIiwgRmxvYXRpbmdCdXR0b24pO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgRm9ybURpYWxvZy5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG48c3R5bGU+XG4gIGRpYWxvZyB7XG4gICAgbWF4LWhlaWdodDogMzYwcHg7XG4gICAgbWluLXdpZHRoOiAyNDBweDtcbiAgICBtYXgtd2lkdGg6IDI0MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gIH1cbiAgLmRpYWxvZ19fdGl0bGUge1xuICAgIG1hcmdpbi10b3A6IDBweDtcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xMjVyZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwIDI0cHggOXB4O1xuICB9XG4gIGZvcm0ge1xuICAgIHBhZGRpbmc6IDAgMjRweCA5cHg7XG4gIH1cbiAgLmRpYWxvZ19fYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZmxleC1zaHJpbms6IHdyYXA7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIG1pbi1oZWlnaHQ6IDUycHg7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbjwvc3R5bGU+XG48ZGlhbG9nPlxuICA8aDIgY2xhc3M9XCJkaWFsb2dfX3RpdGxlXCI+Rm9ybSBUaXRsZTwvaDI+XG4gIDxmb3JtIG1ldGhvZD1cImRpYWxvZ1wiIGlkPVwiZm9ybVwiPlxuICA8Zm9vdGVyIGNsYXNzPVwiZGlhbG9nX19hY3Rpb25zXCI+XG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U2F2ZTwvYnV0dG9uPlxuICAgIDxidXR0b24gdHlwZT1cInJlc2V0XCI+Q2FuY2VsPC9idXR0b24+XG4gIDwvZm9vdGVyPlxuICA8L2Zvcm0+XG48L2RpYWxvZz5gO1xuXG5jbGFzcyBGb3JtRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wib3BlblwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZGlhbG9nID0gdGhpcy5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG4gICAgdGhpcy5mb3JtRGF0YSA9IHt9O1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5kaWFsb2cucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIEFycmF5LmZyb20oZS50YXJnZXQuZWxlbWVudHMpLmZvckVhY2goZWxtID0+IHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZm9ybURhdGEpLmluY2x1ZGVzKGVsbS5uYW1lKSkge1xuICAgICAgICAgIHRoaXMuZm9ybURhdGFbZWxtLm5hbWVdID0gZWxtLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxldCBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChcImNsb3NlXCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgZm9ybURhdGE6IHRoaXMuZm9ybURhdGFcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuZGlhbG9nXG4gICAgICAucXVlcnlTZWxlY3RvcihcIlt0eXBlPSdyZXNldCddXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdGhpcy5kaWFsb2cuY2xvc2UoKSk7XG4gIH1cblxuICBmb3JtRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtRGF0YTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuZGlhbG9nLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZWRcIiwgbmFtZSwgbmV3VmFsLCBvbGRWYWwpO1xuICAgIGlmIChuYW1lID09PSBcIm9wZW5cIiAmJiB0aGlzLmRpYWxvZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5kaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG9wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nLmhhc0F0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cblxuICBzZXQgb3Blbihpc09wZW4pIHtcbiAgICBpZiAoaXNPcGVuKSB0aGlzLmRpYWxvZy5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwiXCIpO1xuICAgIGVsc2UgdGhpcy5kaWFsb2cucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7XG4gICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKFwib3BlblwiKSA9PT0gZmFsc2UpIHRoaXMuc2V0QXR0cmlidXRlKFwib3BlblwiLCBcIlwiKTtcbiAgICBlbHNlIHRoaXMucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgfVxuXG4gIGFkZEZpZWxkKGZpZWxkcykge1xuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgZWxtLnR5cGUgPSBmaWVsZHMudHlwZTsgLy8gQnVpbGRlciBuZWVkZWRcbiAgICBlbG0ubmFtZSA9IGZpZWxkcy5uYW1lO1xuICAgIGVsbS52YWx1ZSA9IGZpZWxkcy52YWx1ZTtcbiAgICBlbG0ucGxhY2Vob2xkZXIgPSBmaWVsZHMucGxhY2Vob2xkZXI7XG4gICAgbGV0IGZvbyA9IHRoaXMuZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGZvby5wcmVwZW5kKGVsbSk7XG5cbiAgICB0aGlzLmZvcm1EYXRhW2ZpZWxkcy5uYW1lXSA9IGZpZWxkcy52YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJmb3JtLWRpYWxvZ1wiLCBGb3JtRGlhbG9nKTtcbiIsIi8qKlxuICogQGZpbGVuYW1lIExpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuICA8c3R5bGU+XG4gICosICo6OmJlZm9yZSwgKjo6YWZ0ZXIge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cbiAgLmxpc3Qge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcbiAgfVxuICAubGlzdC1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBwYWRkaW5nOiAwIDE2cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gIC5saXN0LWl0ZW1fX3RleHQge1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuICA8L3N0eWxlPlxuICA8dWwgY2xhc3M9XCJsaXN0XCI+PC91bD5gO1xuXG5jbGFzcyBTZWxlY3RMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5fcm9vdCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIi5saXN0XCIpO1xuXG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zZWxlY3QtaXRlbV1cIik7XG4gICAgdGhpcy5fcm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgb3B0ID0gZS50YXJnZXQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbaV0uZmlyc3RDaGlsZCA9PT0gb3B0KSB0aGlzLmluZGV4ID0gaTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwic2VsZWN0XCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgaWQ6IG9wdC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0LWl0ZW1cIiksXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJkaXNjb25uZWN0ZWRcIik7XG4gIH1cblxuICBhZGQob2JqKSB7XG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBlbG0uY2xhc3NOYW1lID0gXCJsaXN0LWl0ZW1cIjtcbiAgICBlbG0uc2V0QXR0cmlidXRlKFwiZGF0YS1zZWxlY3QtaXRlbVwiLCBvYmouaWQpO1xuICAgIGVsbS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJsaXN0LWl0ZW1fX3RleHRcIlwiPiR7b2JqLm5hbWV9PC9zcGFuPmA7XG4gICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZChlbG0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInNlbGVjdC1saXN0XCIsIFNlbGVjdExpc3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==