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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pubsub_js__ = __webpack_require__(3);
/**
 *
 */






const TOKEN = "02124309c9867a7616972f52a55db1b4";
Object(__WEBPACK_IMPORTED_MODULE_0__user_js__["d" /* setToken */])(TOKEN);

window.palettes = [
  '916dd5', 'd89cf6', 'f0e3ff', 'e1ccec', 'c9b6e4', 'be9fe1'
]

window.user = {
  setToken: __WEBPACK_IMPORTED_MODULE_0__user_js__["d" /* setToken */],
  getToken: __WEBPACK_IMPORTED_MODULE_0__user_js__["a" /* getToken */],
  hasToken: __WEBPACK_IMPORTED_MODULE_0__user_js__["b" /* hasToken */],
  removeToken: __WEBPACK_IMPORTED_MODULE_0__user_js__["c" /* removeToken */]
};

window.pubSub = new __WEBPACK_IMPORTED_MODULE_2__pubsub_js__["a" /* PubSub */]();

window.fakeFetch = data => {
  let promise = new Promise((resolve, reject) => {
    resolve(data);
    reject("Uups");
  });
  return promise;
};

function updateHTML(html, elm) {
  let newChild = document.createElement("div"),
    oldChild = elm.querySelector("#container");
  newChild.innerHTML = html;

  elm.replaceChild(newChild.querySelector("#container"), oldChild);
  let script = elm.querySelector("[data-script]");
  eval(script.innerText);
}

if ("pushState" in history) {
  window.addEventListener("popstate", e => {
    console.log(e);
    // updateContent(e.state, document.getElementById("container"));
  });
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return removeToken; });
/**/


const hasToken = () => localStorage.getItem("_id_token");

const setToken = token => localStorage.setItem("_id_token", token);

const getToken = () => localStorage.getItem("_id_token");

const removeToken = () => localStorage.removeItem("_id_token");




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ErrorMessages */
/**/
const ErrorMessages = {
  "ReferenceError: response is not defined": "Ok, so something went wrong...",
  "generic error message": "Oh shoot, no clue what just happened!"
};




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PubSub; });
/**
 * https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/
 */
class PubSub {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    return self.events[event].push(callback);
  }

  publish(event, data) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      return [];
    }
    return self.events[event].map(callback => callback(data || {}));
  }
}
/* unused harmony export default */





/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGU1ZjNjYjRjZjI5MmY5ZDBmOTAiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy91c2VyLmpzIiwid2VicGFjazovLy8uL2pzL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9wdWJzdWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzdEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVvRDtBQUM1QjtBQUNQOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDOzs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFUTs7Ozs7Ozs7QUNYUjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7Ozs7Ozs7O0FDTlI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFBQTtBQUFBOztBQUVRIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGU1ZjNjYjRjZjI5MmY5ZDBmOTAiLCIvKipcbiAqXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBoYXNUb2tlbiwgc2V0VG9rZW4sIGdldFRva2VuLCByZW1vdmVUb2tlbiB9IGZyb20gXCIuL3VzZXIuanNcIjtcbmltcG9ydCB7IEVycm9yTWVzc2FnZXMgfSBmcm9tIFwiLi9lcnJvcnMuanNcIjtcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCBUT0tFTiA9IFwiMDIxMjQzMDljOTg2N2E3NjE2OTcyZjUyYTU1ZGIxYjRcIjtcbnNldFRva2VuKFRPS0VOKTtcblxud2luZG93LnBhbGV0dGVzID0gW1xuICAnOTE2ZGQ1JywgJ2Q4OWNmNicsICdmMGUzZmYnLCAnZTFjY2VjJywgJ2M5YjZlNCcsICdiZTlmZTEnXG5dXG5cbndpbmRvdy51c2VyID0ge1xuICBzZXRUb2tlbjogc2V0VG9rZW4sXG4gIGdldFRva2VuOiBnZXRUb2tlbixcbiAgaGFzVG9rZW46IGhhc1Rva2VuLFxuICByZW1vdmVUb2tlbjogcmVtb3ZlVG9rZW5cbn07XG5cbndpbmRvdy5wdWJTdWIgPSBuZXcgUHViU3ViKCk7XG5cbndpbmRvdy5mYWtlRmV0Y2ggPSBkYXRhID0+IHtcbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVzb2x2ZShkYXRhKTtcbiAgICByZWplY3QoXCJVdXBzXCIpO1xuICB9KTtcbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVIVE1MKGh0bWwsIGVsbSkge1xuICBsZXQgbmV3Q2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgIG9sZENoaWxkID0gZWxtLnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpO1xuICBuZXdDaGlsZC5pbm5lckhUTUwgPSBodG1sO1xuXG4gIGVsbS5yZXBsYWNlQ2hpbGQobmV3Q2hpbGQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIiksIG9sZENoaWxkKTtcbiAgbGV0IHNjcmlwdCA9IGVsbS5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc2NyaXB0XVwiKTtcbiAgZXZhbChzY3JpcHQuaW5uZXJUZXh0KTtcbn1cblxuaWYgKFwicHVzaFN0YXRlXCIgaW4gaGlzdG9yeSkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGUgPT4ge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIC8vIHVwZGF0ZUNvbnRlbnQoZS5zdGF0ZSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJcIikpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGhhc1Rva2VuID0gKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfaWRfdG9rZW5cIik7XG5cbmNvbnN0IHNldFRva2VuID0gdG9rZW4gPT4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfaWRfdG9rZW5cIiwgdG9rZW4pO1xuXG5jb25zdCBnZXRUb2tlbiA9ICgpID0+IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX2lkX3Rva2VuXCIpO1xuXG5jb25zdCByZW1vdmVUb2tlbiA9ICgpID0+IGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiX2lkX3Rva2VuXCIpO1xuXG5leHBvcnQgeyBoYXNUb2tlbiwgc2V0VG9rZW4sIGdldFRva2VuLCByZW1vdmVUb2tlbiB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy91c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKi9cbmNvbnN0IEVycm9yTWVzc2FnZXMgPSB7XG4gIFwiUmVmZXJlbmNlRXJyb3I6IHJlc3BvbnNlIGlzIG5vdCBkZWZpbmVkXCI6IFwiT2ssIHNvIHNvbWV0aGluZyB3ZW50IHdyb25nLi4uXCIsXG4gIFwiZ2VuZXJpYyBlcnJvciBtZXNzYWdlXCI6IFwiT2ggc2hvb3QsIG5vIGNsdWUgd2hhdCBqdXN0IGhhcHBlbmVkIVwiXG59O1xuXG5leHBvcnQgeyBFcnJvck1lc3NhZ2VzIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2Vycm9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vYnVpbGQtYS1zdGF0ZS1tYW5hZ2VtZW50LXN5c3RlbS13aXRoLXZhbmlsbGEtamF2YXNjcmlwdC9cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHViU3ViIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgfVxuXG4gIHN1YnNjcmliZShldmVudCwgY2FsbGJhY2spIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudCkpIHtcbiAgICAgIHNlbGYuZXZlbnRzW2V2ZW50XSA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZi5ldmVudHNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICB9XG5cbiAgcHVibGlzaChldmVudCwgZGF0YSkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzLmhhc093blByb3BlcnR5KGV2ZW50KSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZi5ldmVudHNbZXZlbnRdLm1hcChjYWxsYmFjayA9PiBjYWxsYmFjayhkYXRhIHx8IHt9KSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgUHViU3ViIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL3B1YnN1Yi5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9