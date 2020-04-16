webpackJsonp([5,11],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_router_js__ = __webpack_require__(4);
/**
 * @file router.test.js
 */



const router = new __WEBPACK_IMPORTED_MODULE_0__lib_router_js__["default"]("[data-navigation]");

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


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLE9BQU8sV0FBVzs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOzs7Ozs7Ozs7QUMzQkQ7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IjUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSByb3V0ZXIudGVzdC5qc1xuICovXG5cbmltcG9ydCBSb3V0ZXIgZnJvbSBcIi4vLi4vbGliL3JvdXRlci5qc1wiO1xuXG5jb25zdCByb3V0ZXIgPSBuZXcgUm91dGVyKFwiW2RhdGEtbmF2aWdhdGlvbl1cIik7XG5cbmNvbnN0IHsgbG9jYXRpb24gfSA9IHdpbmRvdztcblxuYmVmb3JlQWxsKCgpID0+IHtcbiAgZGVsZXRlIHdpbmRvdy5sb2NhdGlvbjtcbiAgd2luZG93LmxvY2F0aW9uID0ge1xuICAgIGhyZWY6IFwiXCJcbiAgfTtcbn0pO1xuXG5hZnRlckFsbCgoKSA9PiAod2luZG93LmxvY2F0aW9uID0gbG9jYXRpb24pKTtcblxudGVzdChcInJldHVybnMgSGVsbG8gS2l0dHkgd2hlbiBwYXRobmFtZSBpcyAvaGVsbG8ta2l0dHlcIiwgKCkgPT4ge1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2hlbGxvLWtpdHR5L1wiO1xuXG4gIGV4cGVjdChcbiAgICByb3V0ZXIuZ2V0KFwiL2hlbGxvLWtpdHR5XCIsIHBhdGggPT4ge1xuICAgICAgcmV0dXJuIFwiSGVsbG8gS2l0dHlcIjtcbiAgICB9KVxuICApLnRvQmUoXCJIZWxsbyBLaXR0eVwiKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGVzdHMvcm91dGVyLnRlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIi8qKlxuICogQGZpbGUgUm91dGVyLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jbGFzcyBSb3V0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICB9XG4gIGdldChyZWcsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHJvdXRlID0gdGhpcy5yb3V0ZXMuZmluZChyID0+IHIudXJpID09PSByZWcpO1xuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgciA9IHtcbiAgICAgICAgdXJpOiByZWcsXG4gICAgICAgIGZ1bmM6IGNhbGxiYWNrXG4gICAgICB9O1xuICAgICAgdGhpcy5yb3V0ZXMucHVzaChyKTtcbiAgICAgIHJvdXRlID0gcjtcbiAgICB9XG4gICAgcmV0dXJuIHJvdXRlLmZ1bmMuY2FsbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9yb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSA1IDExIl0sInNvdXJjZVJvb3QiOiIifQ==