(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./src/utils/router.js":
/*!*****************************!*\
  !*** ./src/utils/router.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file Router.js
 */


class Router {
  constructor() {
    this.routes = [];
  }
  get(reg, callback) {
    let route = this.routes.find(r => r.uri === reg);
    if (route === undefined) {
      let r = {
        uri: reg,
        func: callback
      };
      this.routes.push(r);
      route = r;
    }
    return route.func.call();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcm91dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRUFBQyIsImZpbGUiOiI3LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgUm91dGVyLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICB9XG4gIGdldChyZWcsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIudXJpID09PSByZWcpO1xuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgciA9IHtcbiAgICAgICAgdXJpOiByZWcsXG4gICAgICAgIGZ1bmM6IGNhbGxiYWNrXG4gICAgICB9O1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChyKTtcbiAgICAgIHJvdXRlID0gcjtcbiAgICB9XG4gICAgcmV0dXJuIHJvdXRlLmZ1bmMuY2FsbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=