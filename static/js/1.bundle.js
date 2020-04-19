(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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


/***/ }),

/***/ "./src/tests/router.test.js":
/*!**********************************!*\
  !*** ./src/tests/router.test.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/router.js */ "./src/lib/router.js");
/**
 * @file router.test.js
 */



const router = new _lib_router_js__WEBPACK_IMPORTED_MODULE_0__["default"]("[data-navigation]");

const { location } = window;

beforeAll(() => {
  delete window.location;
  window.location = {
    href: ""
  };
});

afterAll(() => (window.location = location));

test("returns Hello Kitty when pathname is /hello-kitty", () => {
  window.location.href = "http://localhost:8080/hello-kitty/";

  expect(
    router.get("/hello-kitty", path => {
      return "Hello Kitty";
    })
  ).toBe("Hello Kitty");
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDdkJ0QjtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUV3Qzs7QUFFeEMsbUJBQW1CLHNEQUFNOztBQUV6QixPQUFPLFdBQVc7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyIsImZpbGUiOiIxLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgUm91dGVyLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICB9XG4gIGdldChyZWcsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIudXJpID09PSByZWcpO1xuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgciA9IHtcbiAgICAgICAgdXJpOiByZWcsXG4gICAgICAgIGZ1bmM6IGNhbGxiYWNrXG4gICAgICB9O1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChyKTtcbiAgICAgIHJvdXRlID0gcjtcbiAgICB9XG4gICAgcmV0dXJuIHJvdXRlLmZ1bmMuY2FsbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiIsIi8qKlxuICogQGZpbGUgcm91dGVyLnRlc3QuanNcbiAqL1xuXG5pbXBvcnQgUm91dGVyIGZyb20gXCIuLy4uL2xpYi9yb3V0ZXIuanNcIjtcblxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcihcIltkYXRhLW5hdmlnYXRpb25dXCIpO1xuXG5jb25zdCB7IGxvY2F0aW9uIH0gPSB3aW5kb3c7XG5cbmJlZm9yZUFsbCgoKSA9PiB7XG4gIGRlbGV0ZSB3aW5kb3cubG9jYXRpb247XG4gIHdpbmRvdy5sb2NhdGlvbiA9IHtcbiAgICBocmVmOiBcIlwiXG4gIH07XG59KTtcblxuYWZ0ZXJBbGwoKCkgPT4gKHdpbmRvdy5sb2NhdGlvbiA9IGxvY2F0aW9uKSk7XG5cbnRlc3QoXCJyZXR1cm5zIEhlbGxvIEtpdHR5IHdoZW4gcGF0aG5hbWUgaXMgL2hlbGxvLWtpdHR5XCIsICgpID0+IHtcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9oZWxsby1raXR0eS9cIjtcblxuICBleHBlY3QoXG4gICAgcm91dGVyLmdldChcIi9oZWxsby1raXR0eVwiLCBwYXRoID0+IHtcbiAgICAgIHJldHVybiBcIkhlbGxvIEtpdHR5XCI7XG4gICAgfSlcbiAgKS50b0JlKFwiSGVsbG8gS2l0dHlcIik7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=