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
template.innerHTML = `<style></style>
<dialog>
  <form method="dialog">
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
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("changed", name, newVal, oldVal);
    if (name === "open" && this.dialog.hasAttribute("open")) {
      this.dialog.removeAttribute("open");
    } else {
      this.dialog.setAttribute("open", "");
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
    let elm = document.createElement("div");
    elm.setAttribute("data-select-item", obj.id);
    elm.innerHTML = `<span>${obj.name}</span>`;
    this._root.appendChild(elm);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("select-list", SelectList));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIGxhenkgXlxcLlxcLy4qJCBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9hcHAtbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL1NlbGVjdExpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7OztRQUlBO1FBQ0E7UUFDQSwwQ0FBMEM7UUFDMUM7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHdCQUF3QixrQ0FBa0M7UUFDMUQsTUFBTTtRQUNOO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBLDBDQUEwQyxvQkFBb0IsV0FBVzs7UUFFekU7UUFDQTtRQUNBO1FBQ0E7UUFDQSxnQkFBZ0IsdUJBQXVCO1FBQ3ZDOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7QUNoT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDZ0Q7QUFDSTtBQUNBOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsdURBQU8sR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzdCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EseURBQXlELGlCQUFpQjtBQUMxRTs7Ozs7Ozs7Ozs7OztBQ3pFQTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsMkdBQTRDLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUN4RDVEO0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLCtHQUFnRCxFQUFDOzs7Ozs7Ozs7Ozs7O0FDcERoRTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFZSwrR0FBZ0QsRUFBQyIsImZpbGUiOiJhcHBfbWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcF9tYWluXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7fVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5idW5kbGUuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3N0YXRpYy9qcy9cIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLW1haW4uanNcIik7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLWluZGV4XCI6IFtcblx0XHRcIi4vc3JjL2FwcC1pbmRleC5qc1wiLFxuXHRcdDksXG5cdFx0MlxuXHRdLFxuXHRcIi4vYXBwLWluZGV4LmpzXCI6IFtcblx0XHRcIi4vc3JjL2FwcC1pbmRleC5qc1wiLFxuXHRcdDksXG5cdFx0MlxuXHRdLFxuXHRcIi4vYXBwLWxpc3RcIjogW1xuXHRcdFwiLi9zcmMvYXBwLWxpc3QuanNcIixcblx0XHQ5LFxuXHRcdDNcblx0XSxcblx0XCIuL2FwcC1saXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL2FwcC1saXN0LmpzXCIsXG5cdFx0OSxcblx0XHQzXG5cdF0sXG5cdFwiLi9hcHAtbWFpblwiOiBbXG5cdFx0XCIuL3NyYy9hcHAtbWFpbi5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL2FwcC1tYWluLmpzXCI6IFtcblx0XHRcIi4vc3JjL2FwcC1tYWluLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vc2VydmljZXdvcmtlclwiOiBbXG5cdFx0XCIuL3NyYy9zZXJ2aWNld29ya2VyLmpzXCIsXG5cdFx0Nyxcblx0XHQ0XG5cdF0sXG5cdFwiLi9zZXJ2aWNld29ya2VyLmpzXCI6IFtcblx0XHRcIi4vc3JjL3NlcnZpY2V3b3JrZXIuanNcIixcblx0XHQ3LFxuXHRcdDRcblx0XSxcblx0XCIuL3Rlc3RzL2RiZnVuYy50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQwLFxuXHRcdDVcblx0XSxcblx0XCIuL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL2RiZnVuYy50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQwLFxuXHRcdDVcblx0XSxcblx0XCIuL3Rlc3RzL3JvdXRlci50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3JvdXRlci50ZXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxXG5cdF0sXG5cdFwiLi90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy90ZXN0cy9yb3V0ZXIudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0MVxuXHRdLFxuXHRcIi4vdGVzdHMvc3RvcmFnZS50ZXN0XCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0NlxuXHRdLFxuXHRcIi4vdGVzdHMvc3RvcmFnZS50ZXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3Rlc3RzL3N0b3JhZ2UudGVzdC5qc1wiLFxuXHRcdDksXG5cdFx0NlxuXHRdLFxuXHRcIi4vdXRpbHMvZGJmdW5jXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL2RiZnVuYy5qc1wiLFxuXHRcdDksXG5cdFx0MTNcblx0XSxcblx0XCIuL3V0aWxzL2RiZnVuYy5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9kYmZ1bmMuanNcIixcblx0XHQ5LFxuXHRcdDEzXG5cdF0sXG5cdFwiLi91dGlscy9uYXZpZ2F0aW9uXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL25hdmlnYXRpb24uanNcIixcblx0XHQ5LFxuXHRcdDEwXG5cdF0sXG5cdFwiLi91dGlscy9uYXZpZ2F0aW9uLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL25hdmlnYXRpb24uanNcIixcblx0XHQ5LFxuXHRcdDEwXG5cdF0sXG5cdFwiLi91dGlscy9wdWJzdWJcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvcHVic3ViLmpzXCIsXG5cdFx0OSxcblx0XHQxNFxuXHRdLFxuXHRcIi4vdXRpbHMvcHVic3ViLmpzXCI6IFtcblx0XHRcIi4vc3JjL3V0aWxzL3B1YnN1Yi5qc1wiLFxuXHRcdDksXG5cdFx0MTRcblx0XSxcblx0XCIuL3V0aWxzL3JvdXRlclwiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9yb3V0ZXIuanNcIixcblx0XHQ5LFxuXHRcdDdcblx0XSxcblx0XCIuL3V0aWxzL3JvdXRlci5qc1wiOiBbXG5cdFx0XCIuL3NyYy91dGlscy9yb3V0ZXIuanNcIixcblx0XHQ5LFxuXHRcdDdcblx0XSxcblx0XCIuL3V0aWxzL3N0b3JhZ2VcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvc3RvcmFnZS5qc1wiLFxuXHRcdDksXG5cdFx0MTVcblx0XSxcblx0XCIuL3V0aWxzL3N0b3JhZ2UuanNcIjogW1xuXHRcdFwiLi9zcmMvdXRpbHMvc3RvcmFnZS5qc1wiLFxuXHRcdDksXG5cdFx0MTVcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwRGlhbG9nLmpzXCIsXG5cdFx0OSxcblx0XHQ4XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qc1wiLFxuXHRcdDksXG5cdFx0OFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdFwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcEl0ZW1MaXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxOFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBJdGVtTGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcEl0ZW1MaXN0LmpzXCIsXG5cdFx0OSxcblx0XHQxOFxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBMaXN0XCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiLFxuXHRcdDksXG5cdFx0MTFcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwTGlzdC5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcExpc3QuanNcIixcblx0XHQ5LFxuXHRcdDExXG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm0uanNcIixcblx0XHQ5LFxuXHRcdDEyXG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RGb3JtLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdEZvcm0uanNcIixcblx0XHQ5LFxuXHRcdDEyXG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW0uanNcIixcblx0XHQ5LFxuXHRcdDE2XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcExpc3RJdGVtLmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwTGlzdEl0ZW0uanNcIixcblx0XHQ5LFxuXHRcdDE2XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIixcblx0XHQ5LFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvQXBwU25hY2tiYXIuanNcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qc1wiLFxuXHRcdDksXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZVwiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0FwcFRpdGxlLmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvRm9ybURpYWxvZy5qc1wiLFxuXHRcdDlcblx0XSxcblx0XCIuL3dlYmNvbXBvbmVudHMvRm9ybURpYWxvZy5qc1wiOiBbXG5cdFx0XCIuL3NyYy93ZWJjb21wb25lbnRzL0Zvcm1EaWFsb2cuanNcIixcblx0XHQ5XG5cdF0sXG5cdFwiLi93ZWJjb21wb25lbnRzL1NlbGVjdExpc3RcIjogW1xuXHRcdFwiLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzXCIsXG5cdFx0OVxuXHRdLFxuXHRcIi4vd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzXCI6IFtcblx0XHRcIi4vc3JjL3dlYmNvbXBvbmVudHMvU2VsZWN0TGlzdC5qc1wiLFxuXHRcdDlcblx0XVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tBc3luY0NvbnRleHQocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0XHR0aHJvdyBlO1xuXHRcdH0pO1xuXHR9XG5cblx0dmFyIGlkcyA9IG1hcFtyZXFdLCBpZCA9IGlkc1swXTtcblx0cmV0dXJuIFByb21pc2UuYWxsKGlkcy5zbGljZSgyKS5tYXAoX193ZWJwYWNrX3JlcXVpcmVfXy5lKSkudGhlbihmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KGlkLCBpZHNbMV0pXG5cdH0pO1xufVxud2VicGFja0FzeW5jQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0FzeW5jQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tBc3luY0NvbnRleHQuaWQgPSBcIi4vc3JjIGxhenkgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLiokXCI7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tBc3luY0NvbnRleHQ7IiwiLyoqXG4gKiBAZmlsZSBhcHAtbWFpbi5qc1xuICovXG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9BcHBUaXRsZVwiO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSBcIi4vd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0XCI7XG5pbXBvcnQgRm9ybURpYWxvZyBmcm9tIFwiLi93ZWJjb21wb25lbnRzL0Zvcm1EaWFsb2dcIjtcblxuY29uc3Qgcm91dGVzID0gW1xuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1pbmRleFwiXG4gICAgfSxcbiAgICB7XG4gICAgICB1cmk6IFwiL2FwcC9saXN0L1wiLFxuICAgICAgbW9kdWxlOiBcImFwcC1saXN0XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIHVyaTogXCIvYXBwL2xpc3Qvc2hhcmUvXCIsXG4gICAgICBtb2R1bGU6IFwiYXBwLWxpc3Qtc2hhcmVcIlxuICAgIH1cbiAgXSxcbiAgbW91bnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG5cbmNvbnN0IGxvYWRwYXRoID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgcm91dGUgPSByb3V0ZXMuZmluZChyID0+IHIudXJpID09PSBwYXRoKTtcbiAgbW91bnRFbGVtZW50LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gIGltcG9ydChgLi8ke3JvdXRlLm1vZHVsZX1gKS50aGVuKG1vZCA9PlxuICAgIG1vZC5kZWZhdWx0KCkudGhlbihub2RlID0+IG1vdW50RWxlbWVudC5hcHBlbmRDaGlsZChub2RlKSlcbiAgKTtcbn07XG5cbmNvbnN0IGFkZExpc3RlbmVyID0gKHJvb3RFbG0sIHNlbCwgZnVuYykgPT4ge1xuICByb290RWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBsZXQgbm9kZSA9IGUuY29tcG9zZWRQYXRoKCkuZmluZChuID0+IG4ubm9kZU5hbWUgPT09IHNlbC50b1VwcGVyQ2FzZSgpKTtcbiAgICBpZiAobm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGUsIG5vZGUpXG4gICAgICBmdW5jKGUsIG5vZGUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBlID0+IHtcbiAgY29uc3QgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIGxvYWRwYXRoKHBhdGgsIG1vdW50RWxlbWVudCk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm5hdmlnYXRlXCIsIGUgPT4ge1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLm9yaWdpbiArIGUuZGV0YWlsLnBhdGgpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCB1cmwucGF0aG5hbWUsIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG5cbiAgLypcbiAgYWRkTGlzdGVuZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIiksIFwic2VsZWN0LWxpc3RcIiwgKGUsIGVsbSkgPT4ge1xuICAgIGxldCBwYXRoID1cbiAgICAgIGVsbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhdGhcIikgIT09IG51bGxcbiAgICAgICAgPyBlbG0uZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXRoXCIpXG4gICAgICAgIDogXCIvYXBwL1wiO1xuICAgIGxldCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLm9yaWdpbiArIHBhdGgpO1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCB1cmwucGF0aG5hbWUsIGxvY2F0aW9uLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG4gICAgbG9hZHBhdGgodXJsLnBhdGhuYW1lLCBtb3VudEVsZW1lbnQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG4gICovXG59KTtcblxud2luZG93Lm9ucG9wc3RhdGUgPSAoKSA9PiB7XG4gIGxvYWRwYXRoKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgbW91bnRFbGVtZW50KTtcbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCIvc2VydmljZXdvcmtlci5qc1wiLCB7IHNjb3BlOiBcIi9hcHAvXCIgfSk7XG59XG4iLCIvKipcbiAqIEFwcFRpdGxlXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbjxzdHlsZT5cbmgxIHtcbiAgY29sb3I6ICNmZmY7XG4gIG1hcmdpbjogMDtcbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIDU3NnB4IGFuZCB1cCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA1NzUuOThweCkge1xuICBoMSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgbGVzcyB0aGFuIDc2OHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2Ny45OHB4KSB7XG5cbn1cbi8qIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCBsZXNzIHRoYW4gOTkycHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblxufVxuLyogTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIGxlc3MgdGhhbiAxMjAwcHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogMTE5OS45OHB4KSB7XG4gIFxufVxuPC9zdHlsZT5cbjxkaXY+PGgxPjwvaDE+PC9kaXY+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJ0aXRsZVwiLCBcImJhY2tidXR0b25cIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGNvbm5lY3RlZFwiKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcInRpdGxlIGF0dHJpYnV0ZWNoYW5nZWRcIik7XG4gICAgLy8gY29uc29sZS5sb2cobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJhcHAtdGl0bGVcIiwgQXBwVGl0bGUpO1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgRm9ybURpYWxvZy5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgPHN0eWxlPjwvc3R5bGU+XG48ZGlhbG9nPlxuICA8Zm9ybSBtZXRob2Q9XCJkaWFsb2dcIj5cbiAgPC9mb3JtPlxuPC9kaWFsb2c+YDtcblxuY2xhc3MgRm9ybURpYWxvZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcIm9wZW5cIl07XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmRpYWxvZyA9IHRoaXMuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZGlhbG9nXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge31cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZWRcIiwgbmFtZSwgbmV3VmFsLCBvbGRWYWwpO1xuICAgIGlmIChuYW1lID09PSBcIm9wZW5cIiAmJiB0aGlzLmRpYWxvZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpKSB7XG4gICAgICB0aGlzLmRpYWxvZy5yZW1vdmVBdHRyaWJ1dGUoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZy5zZXRBdHRyaWJ1dGUoXCJvcGVuXCIsIFwiXCIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcGVuKCkge1xuICAgIHJldHVybiB0aGlzLmRpYWxvZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpO1xuICB9XG5cbiAgc2V0IG9wZW4oaXNPcGVuKSB7XG4gICAgaWYgKGlzT3BlbikgdGhpcy5kaWFsb2cuc2V0QXR0cmlidXRlKFwib3BlblwiLCBcIlwiKTtcbiAgICBlbHNlIHRoaXMuZGlhbG9nLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cblxuICB0b2dnbGVPcGVuKCkge1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZShcIm9wZW5cIikgPT09IGZhbHNlKSB0aGlzLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgXCJcIik7XG4gICAgZWxzZSB0aGlzLnJlbW92ZUF0dHJpYnV0ZShcIm9wZW5cIik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwiZm9ybS1kaWFsb2dcIiwgRm9ybURpYWxvZyk7XG4iLCIvKipcbiAqIEBmaWxlbmFtZSBMaXN0LmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGA8c3R5bGU+XG4gICAgW2RhdGEtc2VsZWN0LWl0ZW1dIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxkaXYgaWQ9XCJzZWxlY3QtbGlzdFwiPjwvZGl2PmA7XG5cbmNsYXNzIFNlbGVjdExpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLl9yb290ID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdC1saXN0XCIpO1xuXG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zZWxlY3QtaXRlbV1cIik7XG4gICAgdGhpcy5fcm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgb3B0ID0gZS50YXJnZXQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbaV0uZmlyc3RDaGlsZCA9PT0gb3B0KSB0aGlzLmluZGV4ID0gaTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwic2VsZWN0XCIsIHtcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgaWQ6IG9wdC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0LWl0ZW1cIiksXG4gICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJkaXNjb25uZWN0ZWRcIik7XG4gIH1cblxuICBhZGQob2JqKSB7XG4gICAgbGV0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZWxtLnNldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0LWl0ZW1cIiwgb2JqLmlkKTtcbiAgICBlbG0uaW5uZXJIVE1MID0gYDxzcGFuPiR7b2JqLm5hbWV9PC9zcGFuPmA7XG4gICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZChlbG0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInNlbGVjdC1saXN0XCIsIFNlbGVjdExpc3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==