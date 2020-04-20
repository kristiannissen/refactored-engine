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
	"./lib/dbfunc": [
		"./src/lib/dbfunc.js",
		9
	],
	"./lib/dbfunc.js": [
		"./src/lib/dbfunc.js",
		9
	],
	"./lib/pubsub": [
		"./src/lib/pubsub.js",
		9
	],
	"./lib/pubsub.js": [
		"./src/lib/pubsub.js",
		9
	],
	"./lib/router": [
		"./src/lib/router.js",
		9,
		4
	],
	"./lib/router.js": [
		"./src/lib/router.js",
		9,
		4
	],
	"./lib/storage": [
		"./src/lib/storage.js",
		9
	],
	"./lib/storage.js": [
		"./src/lib/storage.js",
		9
	],
	"./serviceworker": [
		"./src/serviceworker.js",
		7,
		5
	],
	"./serviceworker.js": [
		"./src/serviceworker.js",
		7,
		5
	],
	"./tests/dbfunc.test": [
		"./src/tests/dbfunc.test.js",
		9,
		0,
		6
	],
	"./tests/dbfunc.test.js": [
		"./src/tests/dbfunc.test.js",
		9,
		0,
		6
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
		7
	],
	"./tests/storage.test.js": [
		"./src/tests/storage.test.js",
		9,
		7
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
		10
	],
	"./webcomponents/AppSnackbar.js": [
		"./src/webcomponents/AppSnackbar.js",
		9,
		10
	],
	"./webcomponents/AppTitle": [
		"./src/webcomponents/AppTitle.js",
		9
	],
	"./webcomponents/AppTitle.js": [
		"./src/webcomponents/AppTitle.js",
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
/* harmony import */ var _webcomponents_AppTitle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webcomponents/AppTitle.js */ "./src/webcomponents/AppTitle.js");
/* harmony import */ var _webcomponents_AppList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webcomponents/AppList.js */ "./src/webcomponents/AppList.js");
/* harmony import */ var _webcomponents_AppListItem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webcomponents/AppListItem.js */ "./src/webcomponents/AppListItem.js");
/* harmony import */ var _webcomponents_AppListForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./webcomponents/AppListForm.js */ "./src/webcomponents/AppListForm.js");
/**
 * @file app-main.js
 */


window.customElements.define("app-title", _webcomponents_AppTitle_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


window.customElements.define("app-list", _webcomponents_AppList_js__WEBPACK_IMPORTED_MODULE_1__["default"]);


window.customElements.define("app-list-item", _webcomponents_AppListItem_js__WEBPACK_IMPORTED_MODULE_2__["default"]);


window.customElements.define("app-list-form", _webcomponents_AppListForm_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

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
  __webpack_require__("./src lazy recursive ^\\.\\/.*$")(`./${route.module}`).then(
    mod => (mountElement.innerHTML = mod.default())
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

/***/ "./src/lib/dbfunc.js":
/*!***************************!*\
  !*** ./src/lib/dbfunc.js ***!
  \***************************/
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

/***/ "./src/lib/pubsub.js":
/*!***************************!*\
  !*** ./src/lib/pubsub.js ***!
  \***************************/
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

/***/ "./src/lib/storage.js":
/*!****************************!*\
  !*** ./src/lib/storage.js ***!
  \****************************/
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

/***/ "./src/webcomponents/AppList.js":
/*!**************************************!*\
  !*** ./src/webcomponents/AppList.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/pubsub.js */ "./src/lib/pubsub.js");
/* harmony import */ var _lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/dbfunc.js */ "./src/lib/dbfunc.js");
/* harmony import */ var _lib_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/storage.js */ "./src/lib/storage.js");
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
    Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__["getAll"])().then(resp => this.render(resp));
    Object(_lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["subscribe"])("list-added", payload =>
      Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__["getAll"])().then(resp => this.render(resp))
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
/* harmony import */ var _lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/dbfunc.js */ "./src/lib/dbfunc.js");
/* harmony import */ var _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/pubsub.js */ "./src/lib/pubsub.js");
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
        Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["add"])({
          id: Math.floor(Math.random() * Date.now()),
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
        Object(_lib_pubsub_js__WEBPACK_IMPORTED_MODULE_1__["publish"])("list-added", { listname: name });
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
<h1></h1>
`;

class AppTitle extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.updateComponent("title", this.getAttribute("title"));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateComponent(name, newValue);
    }
  }

  updateComponent(name, value) {
    let elm = this._shadowRoot.querySelector("h1");
    if (value !== "") {
      elm.innerHTML = value.trim();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppTitle);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2RiZnVuYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLDBDQUEwQztRQUMxQzs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtR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dGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBfbWFpblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvanMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC1tYWluLmpzXCIpO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC1pbmRleFwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1pbmRleC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1saXN0XCI6IFtcblx0XHRcIi4vc3JjL2FwcC1saXN0LmpzXCIsXG5cdFx0OSxcblx0XHQzXG5cdF0sXG5cdFwiLi9hcHAtbGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0M1xuXHRdLFxuXHRcIi4vYXBwLW1haW5cIjogW1xuXHRcdFwiLi9zcmMvYXBwLW1haW4uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi9hcHAtbWFpbi5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbWFpbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9kYmZ1bmNcIjogW1xuXHRcdFwiLi9zcmMvbGliL2RiZnVuYy5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9kYmZ1bmMuanNcIjogW1xuXHRcdFwiLi9zcmMvbGliL2RiZnVuYy5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9wdWJzdWJcIjogW1xuXHRcdFwiLi9zcmMvbGliL3B1YnN1Yi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9wdWJzdWIuanNcIjogW1xuXHRcdFwiLi9zcmMvbGliL3B1YnN1Yi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9yb3V0ZXJcIjogW1xuXHRcdFwiLi9zcmMvbGliL3JvdXRlci5qc1wiLFxuXHRcdDksXG5cdFx0NFxuXHRdLFxuXHRcIi4vbGliL3JvdXRlci5qc1wiOiBbXG5cdFx0XCIuL3NyYy9saWIvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ0XG5cdF0sXG5cdFwiLi9saWIvc3RvcmFnZVwiOiBbXG5cdFx0XCIuL3NyYy9saWIvc3RvcmFnZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2xpYi9zdG9yYWdlLmpzXCI6IFtcblx0XHRcIi4vc3JjL2xpYi9zdG9yYWdlLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vc2VydmljZXdvcmtlclwiOiBbXG5cdFx0XCIuL3NyYy9zZXJ2aWNld29ya2VyLmpzXCIsXG5cdFx0Nyxcblx0XHQ1XG5cdF0sXG5cdFwiLi9zZXJ2aWNld29ya2VyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3NlcnZpY2V3b3JrZXIuanNcIixcblx0XHQ3LFxuXHRcdDVcblx0XSxcblx0XCIuL3Rlc3RzL2RiZnVuYy50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQwLFxuXHRcdDZcblx0XSxcblx0XCIuL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQwLFxuXHRcdDZcblx0XSxcblx0XCIuL3Rlc3RzL3JvdXRlci50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxXG5cdF0sXG5cdFwiLi90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MVxuXHRdLFxuXHRcIi4vdGVzdHMvc3RvcmFnZS50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0N1xuXHRdLFxuXHRcIi4vdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0N1xuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBEaWFsb2dcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIixcblx0XHQ5LFxuXHRcdDhcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCIsXG5cdFx0OSxcblx0XHQ4XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm1cIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm0uanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW1cIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW0uanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXJcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiLFxuXHRcdDksXG5cdFx0MTBcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiLFxuXHRcdDksXG5cdFx0MTBcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGVcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIFByb21pc2UuYWxsKGlkcy5zbGljZSgyKS5tYXAoX193ZWJwYWNrX3JlcXVpcmVfXy5lKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KGlkLCBpZHNbMV0pXG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vc3JjIGxhenkgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tBc3luY0NvbnRleHQ7IiwiLyoqXG4gKiBAZmlsZSBhcHAtbWFpbi5qc1xuICovXG5cbmltcG9ydCBBcHBUaXRsZSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLXRpdGxlXCIsIEFwcFRpdGxlKTtcblxuaW1wb3J0IEFwcExpc3QgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWxpc3RcIiwgQXBwTGlzdCk7XG5cbmltcG9ydCBBcHBMaXN0SXRlbSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWxpc3QtaXRlbVwiLCBBcHBMaXN0SXRlbSk7XG5cbmltcG9ydCBBcHBMaXN0Rm9ybSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCI7XG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiYXBwLWxpc3QtZm9ybVwiLCBBcHBMaXN0Rm9ybSk7XG5cbmNvbnN0IHJvdXRlcyA9IFtcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9cIixcbiAgICAgIG1vZHVsZTogXCJhcHAtaW5kZXhcIlxuICAgIH0sXG4gICAge1xuICAgICAgdXJpOiBcIi9hcHAvbGlzdC9cIixcbiAgICAgIG1vZHVsZTogXCJhcHAtbGlzdFwiXG4gICAgfSxcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9saXN0L3NoYXJlL1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1saXN0LXNoYXJlXCJcbiAgICB9XG4gIF0sXG4gIG1vdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuXG5jb25zdCBsb2FkcGF0aCA9IChwYXRoLCBlbG0pID0+IHtcbiAgbGV0IHJvdXRlID0gcm91dGVzLmZpbmQociA9PiByLnVyaSA9PT0gcGF0aCk7XG4gIC8vIGNvbnNvbGUubG9nKFwibG9hZGluZ1wiLCByb3V0ZSk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKFxuICAgIG1vZCA9PiAobW91bnRFbGVtZW50LmlubmVySFRNTCA9IG1vZC5kZWZhdWx0KCkpXG4gICk7XG59O1xuXG5jb25zdCBhZGRMaXN0ZW5lciA9IChyb290RWxtLCBzZWwsIGZ1bmMpID0+IHtcbiAgcm9vdEVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgbGV0IG5vZGUgPSBlLmNvbXBvc2VkUGF0aCgpLmZpbmQobiA9PiBuLm5vZGVOYW1lID09PSBzZWwudG9VcHBlckNhc2UoKSk7XG4gICAgaWYgKG5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy9jb25zb2xlLmxvZyhlLCBub2RlKVxuICAgICAgZnVuYyhlLCBub2RlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZSA9PiB7XG4gIGNvbnN0IHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZTtcblxuICBsb2FkcGF0aChwYXRoLCBtb3VudEVsZW1lbnQpO1xuXG4gIGFkZExpc3RlbmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpLCBcImFcIiwgKGUsIGVsbSkgPT4ge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGVsbS5ocmVmKTtcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShcbiAgICAgIHsgdXNlcmlkOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl91XCIpIHx8IDAgfSxcbiAgICAgIHVybC5wYXRobmFtZSxcbiAgICAgIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZVxuICAgICk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gIGxvYWRwYXRoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgbW91bnRFbGVtZW50KTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEZpbGVuYW1lOiBkYmZ1bmMuanNcbiAqL1xuXG5jb25zdCBEQl9OQU1FID0gXCJncm9jZXJ5X2xpc3RcIjtcbmNvbnN0IERCX1ZFUlNJT04gPSAxO1xuLyoqXG4gKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAqIEBwYXJhbSB2ZXJzaW9uIGludFxuICovXG5jb25zdCBkYiA9IChuYW1lLCB2ZXJzaW9uKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHJlcSA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIHJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBldmVudCA9PiB7XG4gICAgICBsZXQgc3RvcmUgPSBldmVudC50YXJnZXQucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIHtcbiAgICAgICAgYXV0b0luY3JlbWVudDogZmFsc2UsXG4gICAgICAgIGtleVBhdGg6IFwiaWRcIlxuICAgICAgfSk7XG4gICAgICBzdG9yZS5jcmVhdGVJbmRleChcImlkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWRvbmx5XCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBsZXQgcmVxID0gc3RvcmUuZ2V0KGtleSk7XG4gICAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKlxuICovXG5jb25zdCBnZXRBbGwgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkb25seVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgc3RvcmUuZ2V0QWxsKCkub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhZGQsIHJlbW92ZSwgZ2V0LCBnZXRBbGwgfTtcbiIsIi8qKlxuICogUHViU3ViLmpzXG4gKiBzdWJzY3JpYmVyc3trZXk6IFtdfVxuICovXG5cbmxldCBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAobWVzc2FnZSwgY2FsbGJhY2spID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJzdWJzY3JpYmVcIiwgbWVzc2FnZSwgY2FsbGJhY2spO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSBmYWxzZSkge1xuICAgIHN1YnNjcmliZXJzW21lc3NhZ2VdID0gW107XG4gIH1cblxuICBzdWJzY3JpYmVyc1ttZXNzYWdlXS5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbmNvbnN0IHB1Ymxpc2ggPSAobWVzc2FnZSwgcGF5bG9hZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInB1Ymxpc2hcIiwgbWVzc2FnZSwgcGF5bG9hZCk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IHRydWUpIHtcbiAgICBsZXQgc3VicyA9IHN1YnNjcmliZXJzW21lc3NhZ2VdO1xuICAgIGZvciAobGV0IHMgaW4gc3Vicykge1xuICAgICAgc3Vic1tzXShwYXlsb2FkKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4gY29uc29sZS5sb2coXCJUT0RPXCIpO1xuXG5leHBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfTtcbiIsIi8qKlxuICogc3RvcmFnZS5qc1xuICovXG5jb25zdCBzdG9yZUl0ZW0gPSAoa2V5LCBvYmopID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cik7XG4gICAgcmVzb2x2ZShzdHIubGVuZ3RoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmZXRjaEl0ZW0gPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KGAke2tleX0gbm90IGZvdW5kYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNvbHZlKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9O1xuIiwiLyoqXG4gKiBBcHBMaXN0LmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi9saWIvcHVic3ViLmpzXCI7XG5pbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiLi8uLi9saWIvZGJmdW5jLmpzXCI7XG5pbXBvcnQgeyBzdG9yZUl0ZW0gfSBmcm9tIFwiLi8uLi9saWIvc3RvcmFnZS5qc1wiO1xuXG5pbXBvcnQgQXBwTGlzdEl0ZW0gZnJvbSBcIi4vQXBwTGlzdEl0ZW0uanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgPC9zdHlsZT5cbiAgPGRpdiBpZD1cImFwcC1saXN0XCI+PC9kaXY+YDtcblxuY2xhc3MgQXBwTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLnJvb3RFbG0gPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwLWxpc3RcIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGdldEFsbCgpLnRoZW4ocmVzcCA9PiB0aGlzLnJlbmRlcihyZXNwKSk7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1hZGRlZFwiLCBwYXlsb2FkID0+XG4gICAgICBnZXRBbGwoKS50aGVuKHJlc3AgPT4gdGhpcy5yZW5kZXIocmVzcCkpXG4gICAgKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXBwLXRpdGxlXCIpLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiQWxsIExpc3RzXCIpO1xuICB9XG5cbiAgcmVuZGVyKGFycikge1xuICAgIHRoaXMucm9vdEVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGFyci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcHAtbGlzdC1pdGVtXCIpO1xuICAgICAgZWxtLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgaXRlbS5uYW1lKTtcbiAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpdGVtLmlkKTtcbiAgICAgIHRoaXMucm9vdEVsbS5hcHBlbmRDaGlsZChlbG0pO1xuICAgIH0pO1xuICAgIC8vIFRPRE9cbiAgICBsZXQgZm9vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFwcC1saXN0LWZvcm1cIik7XG4gICAgZm9vLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJoZWxsbyBLaXR0eVwiKTtcbiAgICB0aGlzLnJvb3RFbG0uYXBwZW5kQ2hpbGQoZm9vKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBMaXN0O1xuIiwiLyoqXG4gKiBBcHBGb3JtLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhZGQgfSBmcm9tIFwiLi8uLi9saWIvZGJmdW5jLmpzXCI7XG5pbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAuZi1nIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIGZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICB9XG4gIGlucHV0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM0ODEzODA7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGhlaWdodDogM3JlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG4gIGlucHV0OmZvY3VzIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzI2YTY5YTtcbiAgICBib3gtc2hhZG93OiAwIDFweCAwIDAgIzI2YTY5YTtcbiAgfVxuICBpbnB1dDpmb2N1cyArIGxhYmVsIHtcbiAgICBjb2xvcjogIzI2YTY5YTtcbiAgICB0b3A6IC0uMjVyZW07XG4gIH1cbiAgbGFiZWwge1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAxcmVtO1xuICAgIGNvbG9yOiAjOWU5ZTllO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gIH1cbiAgYnV0dG9uIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC41cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG91dGxpbmU6IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsMC4xNCksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsMC4xMiksIDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsMC4yKTtcbiAgfVxuICA8L3N0eWxlPlxuICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+ICAgICAgXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGlzdF9uYW1lXCIgdmFsdWU9XCJcIj5cbiAgICAgIDxsYWJlbD5OYW1lIG9mIExpc3Q8L2xhYmVsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPlxuICBgO1xuXG5jbGFzcyBBcHBGb3JtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibmFtZVwiLCBcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdXNlcklkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ1c2VyaWRcIik7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0W1wibGlzdF9uYW1lXCJdLnZhbHVlLnRyaW0oKTtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBuYW1lKTtcbiAgICAgIGlmIChuYW1lICE9PSBcIlwiKSB7XG4gICAgICAgIGFkZCh7XG4gICAgICAgICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgIHN5bmNlZDogZmFsc2VcbiAgICAgICAgfSkudGhlbihyZXNwID0+IHtcbiAgICAgICAgICBpZiAoXCJTeW5jTWFuYWdlclwiIGluIHdpbmRvdykge1xuICAgICAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVhZHkudGhlbihyZWcgPT5cbiAgICAgICAgICAgICAgcmVnLnN5bmMucmVnaXN0ZXIoXCJsaXN0LWFkZGVkXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHB1Ymxpc2goXCJsaXN0LWFkZGVkXCIsIHsgbGlzdG5hbWU6IG5hbWUgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRm9ybTtcbiIsIi8qKlxuICpcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYDxzdHlsZT5cbiAgICAubGlzdC1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICB9XG4gIDwvc3R5bGU+PGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPjwvZGl2PmA7XG5cbmNsYXNzIEFwcExpc3RJdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wiaWRcIiwgXCJuYW1lXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgZWxtID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpO1xuICAgIGVsbS5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIi9hcHAvbGlzdC9cIiBkYXRhLWl0ZW0taWQ9XCIke3RoaXNbXCJpZFwiXX1cIj4ke1xuICAgICAgdGhpc1tcIm5hbWVcIl1cbiAgICB9PC9hPmA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwTGlzdEl0ZW07XG4iLCIvKipcbiAqIEFwcFRpdGxlXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbjxzdHlsZT5cbmgxIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxoMT48L2gxPlxuYDtcblxuY2xhc3MgQXBwVGl0bGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widGl0bGVcIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudChcInRpdGxlXCIsIHRoaXMuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KG5hbWUsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQobmFtZSwgdmFsdWUpIHtcbiAgICBsZXQgZWxtID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gICAgaWYgKHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBUaXRsZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=