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

  /*
  addListener(document.querySelector("main"), "select-list", (e, elm) => {
    let path =
      elm.getAttribute("data-path") !== null
        ? elm.getAttribute("data-path")
        : "/app/";
    let url = new URL(location.origin + path);
    history.pushState({}, url.pathname, location.origin + url.pathname);
    loadpath(url.pathname, mountElement);
    e.preventDefault();
  });
  */
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

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("app-title", AppTitle));


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
template.innerHTML = `<style>
    [data-select-item] {
      padding: 10px 20px;
    }
  </style>
  <div id="select-list"></div>`;

class SelectList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._root = this._shadowRoot.querySelector("#select-list");

    this.index = -1;
  }

  get selectedIndex() {
    return this.index;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {
    console.log("connected");
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
    console.log("disconnected");
  }

  add(obj) {
    let elm = document.createElement("div");
    elm.setAttribute("data-select-item", obj.id);
    elm.innerHTML = `<span>${obj.name}</span>`;
    this._root.appendChild(elm);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("select-list", SelectList));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7Ozs7UUFJQTtRQUNBO1FBQ0EsMENBQTBDO1FBQzFDOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7O1FBR0E7O1FBRUE7UUFDQSxpQ0FBaUM7O1FBRWpDO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx3QkFBd0Isa0NBQWtDO1FBQzFELE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7O1FBRUE7UUFDQSwwQ0FBMEMsb0JBQW9CLFdBQVc7O1FBRXpFO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLHVCQUF1QjtRQUN2Qzs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUN4TkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ2dEO0FBQ0k7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBTyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQsaUJBQWlCO0FBQzFFOzs7Ozs7Ozs7Ozs7O0FDeEVBO0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwyR0FBNEMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2hFNUQ7QUFBQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUztBQUN0QztBQUNBO0FBQ0E7O0FBRWUsK0dBQWdELEVBQUMiLCJmaWxlIjoiYXBwX21haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBfbWFpblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe31bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9zdGF0aWMvanMvXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC1tYWluLmpzXCIpO1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC1pbmRleFwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1pbmRleC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtaW5kZXguanNcIixcblx0XHQ5LFxuXHRcdDJcblx0XSxcblx0XCIuL2FwcC1saXN0XCI6IFtcblx0XHRcIi4vc3JjL2FwcC1saXN0LmpzXCIsXG5cdFx0OSxcblx0XHQzXG5cdF0sXG5cdFwiLi9hcHAtbGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0M1xuXHRdLFxuXHRcIi4vYXBwLW1haW5cIjogW1xuXHRcdFwiLi9zcmMvYXBwLW1haW4uanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi9hcHAtbWFpbi5qc1wiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbWFpbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3NlcnZpY2V3b3JrZXJcIjogW1xuXHRcdFwiLi9zcmMvc2VydmljZXdvcmtlci5qc1wiLFxuXHRcdDcsXG5cdFx0NFxuXHRdLFxuXHRcIi4vc2VydmljZXdvcmtlci5qc1wiOiBbXG5cdFx0XCIuL3NyYy9zZXJ2aWNld29ya2VyLmpzXCIsXG5cdFx0Nyxcblx0XHQ0XG5cdF0sXG5cdFwiLi90ZXN0cy9kYmZ1bmMudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MCxcblx0XHQ1XG5cdF0sXG5cdFwiLi90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9kYmZ1bmMudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MCxcblx0XHQ1XG5cdF0sXG5cdFwiLi90ZXN0cy9yb3V0ZXIudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MVxuXHRdLFxuXHRcIi4vdGVzdHMvcm91dGVyLnRlc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDFcblx0XSxcblx0XCIuL3Rlc3RzL3N0b3JhZ2UudGVzdFwiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDZcblx0XSxcblx0XCIuL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9zdG9yYWdlLnRlc3QuanNcIixcblx0XHQ5LFxuXHRcdDZcblx0XSxcblx0XCIuL3V0aWxzL2RiZnVuY1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9kYmZ1bmMuanNcIixcblx0XHQ5LFxuXHRcdDEzXG5cdF0sXG5cdFwiLi91dGlscy9kYmZ1bmMuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvZGJmdW5jLmpzXCIsXG5cdFx0OSxcblx0XHQxM1xuXHRdLFxuXHRcIi4vdXRpbHMvbmF2aWdhdGlvblwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9uYXZpZ2F0aW9uLmpzXCIsXG5cdFx0OSxcblx0XHQxMFxuXHRdLFxuXHRcIi4vdXRpbHMvbmF2aWdhdGlvbi5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9uYXZpZ2F0aW9uLmpzXCIsXG5cdFx0OSxcblx0XHQxMFxuXHRdLFxuXHRcIi4vdXRpbHMvcHVic3ViXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3B1YnN1Yi5qc1wiLFxuXHRcdDksXG5cdFx0MTRcblx0XSxcblx0XCIuL3V0aWxzL3B1YnN1Yi5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9wdWJzdWIuanNcIixcblx0XHQ5LFxuXHRcdDE0XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXJcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9yb3V0ZXIuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcm91dGVyLmpzXCIsXG5cdFx0OSxcblx0XHQ3XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5LFxuXHRcdDE1XG5cdF0sXG5cdFwiLi91dGlscy9zdG9yYWdlLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3N0b3JhZ2UuanNcIixcblx0XHQ5LFxuXHRcdDE1XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcERpYWxvZ1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1wiLFxuXHRcdDksXG5cdFx0OFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanNcIixcblx0XHQ5LFxuXHRcdDhcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MThcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwSXRlbUxpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MThcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIixcblx0XHQ5LFxuXHRcdDExXG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxMVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OSxcblx0XHQxMlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0Rm9ybS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCIsXG5cdFx0OSxcblx0XHQxMlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OSxcblx0XHQxNlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCIsXG5cdFx0OSxcblx0XHQxNlxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBTbmFja2JhclwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCIsXG5cdFx0OSxcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIixcblx0XHQ5LFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGVcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzXCIsXG5cdFx0OVxuXHRdXG59O1xuZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dChyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcblx0XHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHRcdHRocm93IGU7XG5cdFx0fSk7XG5cdH1cblxuXHR2YXIgaWRzID0gbWFwW3JlcV0sIGlkID0gaWRzWzBdO1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoaWRzLnNsaWNlKDIpLm1hcChfX3dlYnBhY2tfcmVxdWlyZV9fLmUpKS50aGVuKGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQoaWQsIGlkc1sxXSlcblx0fSk7XG59XG53ZWJwYWNrQXN5bmNDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQXN5bmNDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0FzeW5jQ29udGV4dC5pZCA9IFwiLi9zcmMgbGF6eSByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKiRcIjtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0FzeW5jQ29udGV4dDsiLCIvKipcbiAqIEBmaWxlIGFwcC1tYWluLmpzXG4gKi9cbmltcG9ydCBBcHBUaXRsZSBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0FwcFRpdGxlXCI7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tIFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdExpc3RcIjtcblxuY29uc3Qgcm91dGVzID0gW1xuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1pbmRleFwiXG4gICAgfSxcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9saXN0L1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1saXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL2xpc3Qvc2hhcmUvXCIsXG4gICAgICBtb2R1bGU6IFwiYXBwLWxpc3Qtc2hhcmVcIlxuICAgIH1cbiAgXSxcbiAgbW91bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbmNvbnN0IGxvYWRwYXRoID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgcm91dGUgPSByb3V0ZXMuZmluZChyID0+IHIudXJpID09PSBwYXRoKTtcbiAgbW91bnRFbGVtZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKG1vZCA9PlxuICAgIG1vZC5kZWZhdWx0KCkudGhlbihub2RlID0+IG1vdW50RWxlbWVudC5hcHBlbmRDaGlsZChub2RlKSlcbiAgKTtcbn07XG5cbmNvbnN0IGFkZExpc3RlbmVyID0gKHJvb3RFbG0sIHNlbCwgZnVuYykgPT4ge1xuICByb290RWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUuY29tcG9zZWRQYXRoKCkuZmluZChuID0+IG4ubm9kZU5hbWUgPT09IHNlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGUsIG5vZGUpXG4gICAgICBmdW5jKGUsIG5vZGUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBlID0+IHtcbiAgY29uc3QgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIGxvYWRwYXRoKHBhdGgsIG1vdW50RWxlbWVudCk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdmlnYXRlXCIsIGUgPT4ge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLm9yaWdpbiArIGUuZGV0YWlsLnBhdGgpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCB1cmwucGF0aG5hbWUsIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgLypcbiAgYWRkTGlzdGVuZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIiksIFwic2VsZWN0LWxpc3RcIiwgKGUsIGVsbSkgPT4ge1xuICAgIGxldCBwYXRoID1cbiAgICAgIGVsbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIikgIT09IG51bGxcbiAgICAgICAgPyBlbG0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpXG4gICAgICAgIDogXCIvYXBwL1wiO1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLm9yaWdpbiArIHBhdGgpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCB1cmwucGF0aG5hbWUsIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gICovXG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gIGxvYWRwYXRoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgbW91bnRFbGVtZW50KTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEFwcFRpdGxlXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbjxzdHlsZT5cbmgxIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxoMT48L2gxPlxuYDtcblxuY2xhc3MgQXBwVGl0bGUgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widGl0bGVcIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudChcInRpdGxlXCIsIHRoaXMuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMudXBkYXRlQ29tcG9uZW50KG5hbWUsIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb21wb25lbnQobmFtZSwgdmFsdWUpIHtcbiAgICBsZXQgZWxtID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiaDFcIik7XG4gICAgaWYgKHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWUudHJpbSgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtdGl0bGVcIiwgQXBwVGl0bGUpO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgTGlzdC5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgPHN0eWxlPlxuICAgIFtkYXRhLXNlbGVjdC1pdGVtXSB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8ZGl2IGlkPVwic2VsZWN0LWxpc3RcIj48L2Rpdj5gO1xuXG5jbGFzcyBTZWxlY3RMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5fcm9vdCA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNzZWxlY3QtbGlzdFwiKTtcblxuICAgIHRoaXMuaW5kZXggPSAtMTtcbiAgfVxuXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkXCIpO1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtc2VsZWN0LWl0ZW1dXCIpO1xuICAgIHRoaXMuX3Jvb3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IG9wdCA9IGUudGFyZ2V0O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChvcHRpb25zW2ldLmZpcnN0Q2hpbGQgPT09IG9wdCkgdGhpcy5pbmRleCA9IGk7XG4gICAgICB9XG4gICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcInNlbGVjdFwiLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIGlkOiBvcHQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdC1pdGVtXCIpLFxuICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnNvbGUubG9nKFwiZGlzY29ubmVjdGVkXCIpO1xuICB9XG5cbiAgYWRkKG9iaikge1xuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGVsbS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdC1pdGVtXCIsIG9iai5pZCk7XG4gICAgZWxtLmlubmVySFRNTCA9IGA8c3Bhbj4ke29iai5uYW1lfTwvc3Bhbj5gO1xuICAgIHRoaXMuX3Jvb3QuYXBwZW5kQ2hpbGQoZWxtKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJzZWxlY3QtbGlzdFwiLCBTZWxlY3RMaXN0KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=