webpackJsonp([11],{

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL3JvdXRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMTEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBSb3V0ZXIuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNsYXNzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucm91dGVzID0gW107XG4gIH1cbiAgZ2V0KHJlZywgY2FsbGJhY2spIHtcbiAgICBsZXQgcm91dGUgPSB0aGlzLnJvdXRlcy5maW5kKHIgPT4gci51cmkgPT09IHJlZyk7XG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCByID0ge1xuICAgICAgICB1cmk6IHJlZyxcbiAgICAgICAgZnVuYzogY2FsbGJhY2tcbiAgICAgIH07XG4gICAgICB0aGlzLnJvdXRlcy5wdXNoKHIpO1xuICAgICAgcm91dGUgPSByO1xuICAgIH1cbiAgICByZXR1cm4gcm91dGUuZnVuYy5jYWxsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGliL3JvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDUgMTEiXSwic291cmNlUm9vdCI6IiJ9