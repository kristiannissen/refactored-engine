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
		9
	],
	"./utils/dbfunc.js": [
		"./src/utils/dbfunc.js",
		9
	],
	"./utils/dbwrapper": [
		"./src/utils/dbwrapper.js",
		7,
		10
	],
	"./utils/dbwrapper.js": [
		"./src/utils/dbwrapper.js",
		7,
		10
	],
	"./utils/pubsub": [
		"./src/utils/pubsub.js",
		9
	],
	"./utils/pubsub.js": [
		"./src/utils/pubsub.js",
		9
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
		9
	],
	"./utils/storage.js": [
		"./src/utils/storage.js",
		9
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
		9
	],
	"./webcomponents/AppItemList.js": [
		"./src/webcomponents/AppItemList.js",
		9
	],
	"./webcomponents/AppList": [
		"./src/webcomponents/AppList.js",
		9
	],
	"./webcomponents/AppList.js": [
		"./src/webcomponents/AppList.js",
		9
	],
	"./webcomponents/AppListForm": [
		"./src/webcomponents/AppListForm.js",
		9
	],
	"./webcomponents/AppListForm.js": [
		"./src/webcomponents/AppListForm.js",
		9
	],
	"./webcomponents/AppListItem": [
		"./src/webcomponents/AppListItem.js",
		9
	],
	"./webcomponents/AppListItem.js": [
		"./src/webcomponents/AppListItem.js",
		9
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
		9,
		17
	],
	"./webcomponents/AppTitle.js": [
		"./src/webcomponents/AppTitle.js",
		9,
		17
	],
	"./webcomponents/SelectionList": [
		"./src/webcomponents/SelectionList.js",
		9
	],
	"./webcomponents/SelectionList.js": [
		"./src/webcomponents/SelectionList.js",
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
/* harmony import */ var _webcomponents_AppList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcomponents/AppList.js */ "./src/webcomponents/AppList.js");
/* harmony import */ var _webcomponents_AppListForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcomponents/AppListForm.js */ "./src/webcomponents/AppListForm.js");
/* harmony import */ var _webcomponents_AppListItem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcomponents/AppListItem.js */ "./src/webcomponents/AppListItem.js");
/* harmony import */ var _webcomponents_AppItemList_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webcomponents/AppItemList.js */ "./src/webcomponents/AppItemList.js");
/* harmony import */ var _webcomponents_SelectionList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./webcomponents/SelectionList.js */ "./src/webcomponents/SelectionList.js");
/**
 * @file app-main.js
 */

window.customElements.define("app-list", _webcomponents_AppList_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

window.customElements.define("app-list-form", _webcomponents_AppListForm_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

window.customElements.define("app-list-item", _webcomponents_AppListItem_js__WEBPACK_IMPORTED_MODULE_2__["default"]);

window.customElements.define("app-item-list", _webcomponents_AppItemList_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

window.customElements.define("selection-list", _webcomponents_SelectionList_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

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
  // console.log("loading", route);
  __webpack_require__("./src lazy recursive ^\\.\\/.*$")(`./${route.module}`).then(mod =>
    mod.default().then(html => (mountElement.innerHTML = html))
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

  addListener(document.querySelector("main"), "a", (e, elm) => {
    let url = new URL(elm.href);
    history.pushState(
      { userid: localStorage.getItem("_u") || 0 },
      url.pathname,
      location.origin + url.pathname
    );
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

/***/ "./src/utils/dbfunc.js":
/*!*****************************!*\
  !*** ./src/utils/dbfunc.js ***!
  \*****************************/
/*! exports provided: add, remove, get, getAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
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
      let store = event.target.result.createObjectStore(name, {
        autoIncrement: false,
        keyPath: "id"
      });
      store.createIndex("id", "id", { unique: true });
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
/**
 *
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readonly");
      let store = trans.objectStore(DB_NAME);
      store.getAll().onsuccess = event => resolve(event.target.result);
    });
  });
};




/***/ }),

/***/ "./src/utils/pubsub.js":
/*!*****************************!*\
  !*** ./src/utils/pubsub.js ***!
  \*****************************/
/*! exports provided: subscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
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

/***/ "./src/utils/storage.js":
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
/*! exports provided: storeItem, fetchItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeItem", function() { return storeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchItem", function() { return fetchItem; });
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

/***/ "./src/webcomponents/AppItemList.js":
/*!******************************************!*\
  !*** ./src/webcomponents/AppItemList.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename AppItemList.js
 */


const template = document.createElement("template");
template.innerHTML = `<style></style><div id="app-item-list-wrapper"></div>`;

class AppItemList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {}
}

/* harmony default export */ __webpack_exports__["default"] = (AppItemList);


/***/ }),

/***/ "./src/webcomponents/AppList.js":
/*!**************************************!*\
  !*** ./src/webcomponents/AppList.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/pubsub.js */ "./src/utils/pubsub.js");
/* harmony import */ var _utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils/dbfunc.js */ "./src/utils/dbfunc.js");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils/storage.js */ "./src/utils/storage.js");
/* harmony import */ var _AppListItem_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppListItem.js */ "./src/webcomponents/AppListItem.js");
/**
 * AppList.js
 */








const template = document.createElement("template");
template.innerHTML = `
  <style>
  </style>
  <div id="app-list"></div>`;

class AppList extends HTMLElement {
  static get observedAttributes() {
    return ["userid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.rootElm = this._shadowRoot.querySelector("#app-list");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__["getAll"])().then(resp => this.render(resp));
    Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["subscribe"])("list-added", payload =>
      Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__["getAll"])().then(resp => this.render(resp))
    );
    document.querySelector("app-title").setAttribute("title", "All Lists");
  }

  render(arr) {
    this.rootElm.innerHTML = "";
    arr.forEach(item => {
      let elm = document.createElement("app-list-item");
      elm.setAttribute("name", item.name);
      elm.setAttribute("id", item.id);
      this.rootElm.appendChild(elm);
    });
    // TODO
    let foo = document.createElement("app-list-form");
    foo.setAttribute("name", "hello Kitty");
    this.rootElm.appendChild(foo);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppList);


/***/ }),

/***/ "./src/webcomponents/AppListForm.js":
/*!******************************************!*\
  !*** ./src/webcomponents/AppListForm.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/dbfunc.js */ "./src/utils/dbfunc.js");
/* harmony import */ var _utils_pubsub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils/pubsub.js */ "./src/utils/pubsub.js");
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
    padding: 5px 10px;
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
      <input type="text" name="list_name" value="" placeholder="List name">
    </div>
    <div class="f-g">
      <button type="submit">Save</button>
    </div>
  </form>
  `;

class AppForm extends HTMLElement {
  static get observedAttributes() {
    return ["name"];
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
    this._shadowRoot.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();

      let name = e.target["list_name"].value.trim();
      this.setAttribute("name", name);
      if (name !== "") {
        Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["add"])({
          id: Math.floor(Math.random() * Date.now()).toString(),
          name: name,
          items: [],
          synced: false
        }).then(resp => {
          if ("SyncManager" in window) {
            navigator.serviceWorker.ready.then(reg =>
              reg.sync.register("list-added")
            );
          }
        });
        Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_1__["publish"])("list-added", { listname: name });
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppForm);


/***/ }),

/***/ "./src/webcomponents/AppListItem.js":
/*!******************************************!*\
  !*** ./src/webcomponents/AppListItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *
 */


const template = document.createElement("template");
template.innerHTML = `<style>
    .list-item {
      padding: 0 10px;
    }
  </style><div class="list-item"></div>`;

class AppListItem extends HTMLElement {
  static get observedAttributes() {
    return ["id", "name"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    let elm = this._shadowRoot.querySelector("div");
    elm.innerHTML = `<a href="/app/list/" data-item-id="${this["id"]}">${
      this["name"]
    }</a>`;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppListItem);


/***/ }),

/***/ "./src/webcomponents/SelectionList.js":
/*!********************************************!*\
  !*** ./src/webcomponents/SelectionList.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename List.js
 */


const template = document.createElement("template");
template.innerHTML = `<style></style>
  <div id="selection-list">Hello Kitty</div>`;

class SelectionList extends HTMLElement {
  static get observedAttributes() {
    return ["selections"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.onRender = this.onRender.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {}

  onRender(callback) {
    callback("Hello Kitty Pussy");
  }

  onSelect(callback) {}

  onChange(callback) {}

  setSelections(data) {
    this.data = data;
    console.log(data);
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }

  adopedCallback() {}
}

/* harmony default export */ __webpack_exports__["default"] = (SelectionList);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZGJmdW5jLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3Rpb25MaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0EsMENBQTBDO1FBQzFDOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQSxpQ0FBaUM7O1FBRWpDO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx3QkFBd0Isa0NBQWtDO1FBQzFELE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQSwwQ0FBMEMsb0JBQW9CLFdBQVc7O1FBRXpFO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLHVCQUF1QjtRQUN2Qzs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUM1TUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ2lEO0FBQ2pELHlDQUF5Qyxp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O0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFZSw0RUFBYSxFQUFDIiwiZmlsZSI6ImFwcF9tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwiYXBwX21haW5cIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmJ1bmRsZS5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvc3RhdGljL2pzL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAtbWFpbi5qc1wiKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAtaW5kZXhcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWluZGV4LmpzXCIsXG5cdFx0OSxcblx0XHQyXG5cdF0sXG5cdFwiLi9hcHAtaW5kZXguanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWluZGV4LmpzXCIsXG5cdFx0OSxcblx0XHQyXG5cdF0sXG5cdFwiLi9hcHAtbGlzdFwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0M1xuXHRdLFxuXHRcIi4vYXBwLWxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWxpc3QuanNcIixcblx0XHQ5LFxuXHRcdDNcblx0XSxcblx0XCIuL2FwcC1tYWluXCI6IFtcblx0XHRcIi4vc3JjL2FwcC1tYWluLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vYXBwLW1haW4uanNcIjogW1xuXHRcdFwiLi9zcmMvYXBwLW1haW4uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi9zZXJ2aWNld29ya2VyXCI6IFtcblx0XHRcIi4vc3JjL3NlcnZpY2V3b3JrZXIuanNcIixcblx0XHQ3LFxuXHRcdDRcblx0XSxcblx0XCIuL3NlcnZpY2V3b3JrZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvc2VydmljZXdvcmtlci5qc1wiLFxuXHRcdDcsXG5cdFx0NFxuXHRdLFxuXHRcIi4vdGVzdHMvZGJmdW5jLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDAsXG5cdFx0NVxuXHRdLFxuXHRcIi4vdGVzdHMvZGJmdW5jLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDAsXG5cdFx0NVxuXHRdLFxuXHRcIi4vdGVzdHMvcm91dGVyLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDFcblx0XSxcblx0XCIuL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxXG5cdF0sXG5cdFwiLi90ZXN0cy9zdG9yYWdlLnRlc3RcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQ2XG5cdF0sXG5cdFwiLi90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQ2XG5cdF0sXG5cdFwiLi91dGlscy9kYmZ1bmNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvZGJmdW5jLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vdXRpbHMvZGJmdW5jLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL2RiZnVuYy5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3V0aWxzL2Rid3JhcHBlclwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9kYndyYXBwZXIuanNcIixcblx0XHQ3LFxuXHRcdDEwXG5cdF0sXG5cdFwiLi91dGlscy9kYndyYXBwZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvZGJ3cmFwcGVyLmpzXCIsXG5cdFx0Nyxcblx0XHQxMFxuXHRdLFxuXHRcIi4vdXRpbHMvcHVic3ViXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3B1YnN1Yi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3V0aWxzL3B1YnN1Yi5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9wdWJzdWIuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXJcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcERpYWxvZ1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1wiLFxuXHRcdDksXG5cdFx0OFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIixcblx0XHQ5LFxuXHRcdDhcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2JhclwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCIsXG5cdFx0OSxcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIixcblx0XHQ5LFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGVcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDksXG5cdFx0MTdcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDksXG5cdFx0MTdcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvU2VsZWN0aW9uTGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdGlvbkxpc3QuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdGlvbkxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3Rpb25MaXN0LmpzXCIsXG5cdFx0OVxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHRcdHRocm93IGU7XG5cdFx0fSk7XG5cdH1cblxuXHR2YXIgaWRzID0gbWFwW3JlcV0sIGlkID0gaWRzWzBdO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoaWRzLnNsaWNlKDIpLm1hcChfX3dlYnBhY2tfcmVxdWlyZV9fLmUpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQoaWQsIGlkc1sxXSlcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiLCIvKipcbiAqIEBmaWxlIGFwcC1tYWluLmpzXG4gKi9cbmltcG9ydCBBcHBMaXN0IGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1saXN0XCIsIEFwcExpc3QpO1xuaW1wb3J0IEFwcExpc3RGb3JtIGZyb20gXCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm0uanNcIjtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtbGlzdC1mb3JtXCIsIEFwcExpc3RGb3JtKTtcbmltcG9ydCBBcHBMaXN0SXRlbSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWxpc3QtaXRlbVwiLCBBcHBMaXN0SXRlbSk7XG5pbXBvcnQgQXBwSXRlbUxpc3QgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcImFwcC1pdGVtLWxpc3RcIiwgQXBwSXRlbUxpc3QpO1xuaW1wb3J0IFNlbGVjdGlvbkxpc3QgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9TZWxlY3Rpb25MaXN0LmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwic2VsZWN0aW9uLWxpc3RcIiwgU2VsZWN0aW9uTGlzdCk7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9cIixcbiAgICAgIG1vZHVsZTogXCJhcHAtaW5kZXhcIlxuICAgIH0sXG4gICAge1xuICAgICAgdXJpOiBcIi9hcHAvbGlzdC9cIixcbiAgICAgIG1vZHVsZTogXCJhcHAtbGlzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9saXN0L3NoYXJlL1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1saXN0LXNoYXJlXCJcbiAgICB9XG4gIF0sXG4gIG1vdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5jb25zdCBsb2FkcGF0aCA9IChwYXRoLCBlbG0pID0+IHtcbiAgbGV0IHJvdXRlID0gcm91dGVzLmZpbmQociA9PiByLnVyaSA9PT0gcGF0aCk7XG4gIC8vIGNvbnNvbGUubG9nKFwibG9hZGluZ1wiLCByb3V0ZSk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKG1vZCA9PlxuICAgIG1vZC5kZWZhdWx0KCkudGhlbihodG1sID0+IChtb3VudEVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbCkpXG4gICk7XG59O1xuXG5jb25zdCBhZGRMaXN0ZW5lciA9IChyb290RWxtLCBzZWwsIGZ1bmMpID0+IHtcbiAgcm9vdEVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgbGV0IG5vZGUgPSBlLmNvbXBvc2VkUGF0aCgpLmZpbmQobiA9PiBuLm5vZGVOYW1lID09PSBzZWwudG9VcHBlckNhc2UoKSk7XG4gICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhlLCBub2RlKVxuICAgICAgZnVuYyhlLCBub2RlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZSA9PiB7XG4gIGNvbnN0IHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcblxuICBsb2FkcGF0aChwYXRoLCBtb3VudEVsZW1lbnQpO1xuXG4gIGFkZExpc3RlbmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpLCBcImFcIiwgKGUsIGVsbSkgPT4ge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGVsbS5ocmVmKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShcbiAgICAgIHsgdXNlcmlkOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl91XCIpIHx8IDAgfSxcbiAgICAgIHVybC5wYXRobmFtZSxcbiAgICAgIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZVxuICAgICk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gIGxvYWRwYXRoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgbW91bnRFbGVtZW50KTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEZpbGVuYW1lOiBkYmZ1bmMuanNcbiAqL1xuXG5jb25zdCBEQl9OQU1FID0gXCJncm9jZXJ5X2xpc3RcIjtcbmNvbnN0IERCX1ZFUlNJT04gPSAxO1xuLyoqXG4gKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAqIEBwYXJhbSB2ZXJzaW9uIGludFxuICovXG5jb25zdCBkYiA9IChuYW1lLCB2ZXJzaW9uKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHJlcSA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIHJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBldmVudCA9PiB7XG4gICAgICBsZXQgc3RvcmUgPSBldmVudC50YXJnZXQucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIHtcbiAgICAgICAgYXV0b0luY3JlbWVudDogZmFsc2UsXG4gICAgICAgIGtleVBhdGg6IFwiaWRcIlxuICAgICAgfSk7XG4gICAgICBzdG9yZS5jcmVhdGVJbmRleChcImlkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWRvbmx5XCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBsZXQgcmVxID0gc3RvcmUuZ2V0KGtleSk7XG4gICAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKlxuICovXG5jb25zdCBnZXRBbGwgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkb25seVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgc3RvcmUuZ2V0QWxsKCkub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhZGQsIHJlbW92ZSwgZ2V0LCBnZXRBbGwgfTtcbiIsIi8qKlxuICogUHViU3ViLmpzXG4gKiBzdWJzY3JpYmVyc3trZXk6IFtdfVxuICovXG5cbmxldCBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAobWVzc2FnZSwgY2FsbGJhY2spID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJzdWJzY3JpYmVcIiwgbWVzc2FnZSwgY2FsbGJhY2spO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSBmYWxzZSkge1xuICAgIHN1YnNjcmliZXJzW21lc3NhZ2VdID0gW107XG4gIH1cblxuICBzdWJzY3JpYmVyc1ttZXNzYWdlXS5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbmNvbnN0IHB1Ymxpc2ggPSAobWVzc2FnZSwgcGF5bG9hZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInB1Ymxpc2hcIiwgbWVzc2FnZSwgcGF5bG9hZCk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IHRydWUpIHtcbiAgICBsZXQgc3VicyA9IHN1YnNjcmliZXJzW21lc3NhZ2VdO1xuICAgIGZvciAobGV0IHMgaW4gc3Vicykge1xuICAgICAgc3Vic1tzXShwYXlsb2FkKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4gY29uc29sZS5sb2coXCJUT0RPXCIpO1xuXG5leHBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfTtcbiIsIi8qKlxuICogc3RvcmFnZS5qc1xuICovXG5jb25zdCBzdG9yZUl0ZW0gPSAoa2V5LCBvYmopID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cik7XG4gICAgcmVzb2x2ZShzdHIubGVuZ3RoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmZXRjaEl0ZW0gPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KGAke2tleX0gbm90IGZvdW5kYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNvbHZlKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9O1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgQXBwSXRlbUxpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYDxzdHlsZT48L3N0eWxlPjxkaXYgaWQ9XCJhcHAtaXRlbS1saXN0LXdyYXBwZXJcIj48L2Rpdj5gO1xuXG5jbGFzcyBBcHBJdGVtTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcEl0ZW1MaXN0O1xuIiwiLyoqXG4gKiBBcHBMaXN0LmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi91dGlscy9wdWJzdWIuanNcIjtcbmltcG9ydCB7IGdldEFsbCB9IGZyb20gXCIuLy4uL3V0aWxzL2RiZnVuYy5qc1wiO1xuaW1wb3J0IHsgc3RvcmVJdGVtIH0gZnJvbSBcIi4vLi4vdXRpbHMvc3RvcmFnZS5qc1wiO1xuXG5pbXBvcnQgQXBwTGlzdEl0ZW0gZnJvbSBcIi4vQXBwTGlzdEl0ZW0uanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cImFwcC1saXN0XCI+PC9kaXY+YDtcblxuY2xhc3MgQXBwTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLnJvb3RFbG0gPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLWxpc3RcIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGdldEFsbCgpLnRoZW4ocmVzcCA9PiB0aGlzLnJlbmRlcihyZXNwKSk7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1hZGRlZFwiLCBwYXlsb2FkID0+XG4gICAgICBnZXRBbGwoKS50aGVuKHJlc3AgPT4gdGhpcy5yZW5kZXIocmVzcCkpXG4gICAgKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXBwLXRpdGxlXCIpLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiQWxsIExpc3RzXCIpO1xuICB9XG5cbiAgcmVuZGVyKGFycikge1xuICAgIHRoaXMucm9vdEVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFyci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcHAtbGlzdC1pdGVtXCIpO1xuICAgICAgZWxtLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgaXRlbS5uYW1lKTtcbiAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpdGVtLmlkKTtcbiAgICAgIHRoaXMucm9vdEVsbS5hcHBlbmRDaGlsZChlbG0pO1xuICAgIH0pO1xuICAgIC8vIFRPRE9cbiAgICBsZXQgZm9vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFwcC1saXN0LWZvcm1cIik7XG4gICAgZm9vLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJoZWxsbyBLaXR0eVwiKTtcbiAgICB0aGlzLnJvb3RFbG0uYXBwZW5kQ2hpbGQoZm9vKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBMaXN0O1xuIiwiLyoqXG4gKiBBcHBGb3JtLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhZGQgfSBmcm9tIFwiLi8uLi91dGlscy9kYmZ1bmMuanNcIjtcbmltcG9ydCB7IHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi91dGlscy9wdWJzdWIuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgLmYtZyB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuICBmb3JtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgfVxuICBpbnB1dCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDgxMzgwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBoZWlnaHQ6IDNyZW07XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbjogMCAwIDhweCAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgfVxuICBpbnB1dDpmb2N1cyB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyNmE2OWE7XG4gICAgYm94LXNoYWRvdzogMCAxcHggMCAwICMyNmE2OWE7XG4gIH1cbiAgaW5wdXQ6Zm9jdXMgKyBsYWJlbCB7XG4gICAgY29sb3I6ICMyNmE2OWE7XG4gICAgdG9wOiAtLjI1cmVtO1xuICB9XG4gIGxhYmVsIHtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMXJlbTtcbiAgICBjb2xvcjogIzllOWU5ZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICB9XG4gIGJ1dHRvbiB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNmE2OWE7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGxldHRlci1zcGFjaW5nOiAuNXB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBvdXRsaW5lOiAwO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGhlaWdodDogMzZweDtcbiAgICBsaW5lLWhlaWdodDogMzZweDtcbiAgICBwYWRkaW5nOiAwIDE2cHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsMCwwLDAuMTQpLCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLDAuMik7XG4gIH1cbiAgPC9zdHlsZT5cbiAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4gICAgPGRpdiBjbGFzcz1cImYtZ1wiPiAgICAgIFxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxpc3RfbmFtZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJMaXN0IG5hbWVcIj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TYXZlPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZm9ybT5cbiAgYDtcblxuY2xhc3MgQXBwRm9ybSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcIm5hbWVcIl07XG4gIH1cblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0W1wibGlzdF9uYW1lXCJdLnZhbHVlLnRyaW0oKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBuYW1lKTtcbiAgICAgIGlmIChuYW1lICE9PSBcIlwiKSB7XG4gICAgICAgIGFkZCh7XG4gICAgICAgICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpLnRvU3RyaW5nKCksXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgc3luY2VkOiBmYWxzZVxuICAgICAgICB9KS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgIGlmIChcIlN5bmNNYW5hZ2VyXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKHJlZyA9PlxuICAgICAgICAgICAgICByZWcuc3luYy5yZWdpc3RlcihcImxpc3QtYWRkZWRcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcHVibGlzaChcImxpc3QtYWRkZWRcIiwgeyBsaXN0bmFtZTogbmFtZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBGb3JtO1xuIiwiLyoqXG4gKlxuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgPHN0eWxlPlxuICAgIC5saXN0LWl0ZW0ge1xuICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgIH1cbiAgPC9zdHlsZT48ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCI+PC9kaXY+YDtcblxuY2xhc3MgQXBwTGlzdEl0ZW0gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJpZFwiLCBcIm5hbWVcIl07XG4gIH1cblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGxldCBlbG0gPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaXZcIik7XG4gICAgZWxtLmlubmVySFRNTCA9IGA8YSBocmVmPVwiL2FwcC9saXN0L1wiIGRhdGEtaXRlbS1pZD1cIiR7dGhpc1tcImlkXCJdfVwiPiR7XG4gICAgICB0aGlzW1wibmFtZVwiXVxuICAgIH08L2E+YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBMaXN0SXRlbTtcbiIsIi8qKlxuICogQGZpbGVuYW1lIExpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYDxzdHlsZT48L3N0eWxlPlxuICA8ZGl2IGlkPVwic2VsZWN0aW9uLWxpc3RcIj5IZWxsbyBLaXR0eTwvZGl2PmA7XG5cbmNsYXNzIFNlbGVjdGlvbkxpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJzZWxlY3Rpb25zXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuXG4gICAgdGhpcy5vblJlbmRlciA9IHRoaXMub25SZW5kZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZyhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge31cblxuICBvblJlbmRlcihjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKFwiSGVsbG8gS2l0dHkgUHVzc3lcIik7XG4gIH1cblxuICBvblNlbGVjdChjYWxsYmFjaykge31cblxuICBvbkNoYW5nZShjYWxsYmFjaykge31cblxuICBzZXRTZWxlY3Rpb25zKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFkb3BlZENhbGxiYWNrKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uTGlzdDtcbiJdLCJzb3VyY2VSb290IjoiIn0=