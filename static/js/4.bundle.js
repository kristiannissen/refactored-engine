(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./src/lib/router.js":
/*!***************************!*\
  !*** ./src/lib/router.js ***!
  \***************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHFFQUFNLEVBQUMiLCJmaWxlIjoiNC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIFJvdXRlci5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgUm91dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yb3V0ZXMgPSBbXTtcbiAgfVxuICBnZXQocmVnLCBjYWxsYmFjaykge1xuICAgIGxldCByb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQociA9PiByLnVyaSA9PT0gcmVnKTtcbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IHIgPSB7XG4gICAgICAgIHVyaTogcmVnLFxuICAgICAgICBmdW5jOiBjYWxsYmFja1xuICAgICAgfTtcbiAgICAgIHRoaXMucm91dGVzLnB1c2gocik7XG4gICAgICByb3V0ZSA9IHI7XG4gICAgfVxuICAgIHJldHVybiByb3V0ZS5mdW5jLmNhbGwoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9