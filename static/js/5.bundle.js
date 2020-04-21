(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/tests/dbfunc.test.js":
/*!**********************************!*\
  !*** ./src/tests/dbfunc.test.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/dbfunc.js */ "./src/utils/dbfunc.js");
/**
 * dbfunc.test.js
 * Async write/read to indexedDB
 */

__webpack_require__(/*! fake-indexeddb/auto */ "./node_modules/fake-indexeddb/auto.js");



test("resolves when object is stored", () => {
  return expect(
    Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["add"])({
      name: "Kitty",
      id: Math.floor(Math.random() * Date.now())
    })
  ).resolves.toMatch("complete");
});
/*
test("resolves when array is stored", () => {
  return expect(
    add([
      { name: "Hello", id: Math.floor(Math.random() * Date.now()) },
      { name: "Kitty", id: Math.floor(Math.random() * Date.now()) }
    ])
  ).resolves.toMatch("complete");
});
*/
test("resolves object with key = key", () => {
  return expect(Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(1)).resolves.toMatchObject({ name: "Kitty" });
});

test("resolves with error when key is not found", () => {
  return expect(Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(42)).resolves.toBeUndefined();
});

test("resolves when key is deleted", () => {
  return expect(Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(1)).resolves.toBeUndefined();
});

test("resolves when getall is called", () => {
  return expect(Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["getAll"])()).resolves.toBe(true);
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBTyxDQUFDLGtFQUFxQjs7QUFFbUM7O0FBRWhFO0FBQ0E7QUFDQSxJQUFJLDREQUFHO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNERBQTREO0FBQ25FLE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxnQkFBZ0IsNERBQUcsNkJBQTZCLGdCQUFnQjtBQUNoRSxDQUFDOztBQUVEO0FBQ0EsZ0JBQWdCLDREQUFHO0FBQ25CLENBQUM7O0FBRUQ7QUFDQSxnQkFBZ0IsK0RBQU07QUFDdEIsQ0FBQzs7QUFFRDtBQUNBLGdCQUFnQiwrREFBTTtBQUN0QixDQUFDIiwiZmlsZSI6IjUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYmZ1bmMudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCB0byBpbmRleGVkREJcbiAqL1xuXG5yZXF1aXJlKFwiZmFrZS1pbmRleGVkZGIvYXV0b1wiKTtcblxuaW1wb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH0gZnJvbSBcIi4vLi4vdXRpbHMvZGJmdW5jLmpzXCI7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aGVuIG9iamVjdCBpcyBzdG9yZWRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KFxuICAgIGFkZCh7XG4gICAgICBuYW1lOiBcIktpdHR5XCIsXG4gICAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSlcbiAgICB9KVxuICApLnJlc29sdmVzLnRvTWF0Y2goXCJjb21wbGV0ZVwiKTtcbn0pO1xuLypcbnRlc3QoXCJyZXNvbHZlcyB3aGVuIGFycmF5IGlzIHN0b3JlZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoXG4gICAgYWRkKFtcbiAgICAgIHsgbmFtZTogXCJIZWxsb1wiLCBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSkgfSxcbiAgICAgIHsgbmFtZTogXCJLaXR0eVwiLCBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSkgfVxuICAgIF0pXG4gICkucmVzb2x2ZXMudG9NYXRjaChcImNvbXBsZXRlXCIpO1xufSk7XG4qL1xudGVzdChcInJlc29sdmVzIG9iamVjdCB3aXRoIGtleSA9IGtleVwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoZ2V0KDEpKS5yZXNvbHZlcy50b01hdGNoT2JqZWN0KHsgbmFtZTogXCJLaXR0eVwiIH0pO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aXRoIGVycm9yIHdoZW4ga2V5IGlzIG5vdCBmb3VuZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoZ2V0KDQyKSkucmVzb2x2ZXMudG9CZVVuZGVmaW5lZCgpO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aGVuIGtleSBpcyBkZWxldGVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChyZW1vdmUoMSkpLnJlc29sdmVzLnRvQmVVbmRlZmluZWQoKTtcbn0pO1xuXG50ZXN0KFwicmVzb2x2ZXMgd2hlbiBnZXRhbGwgaXMgY2FsbGVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChnZXRBbGwoKSkucmVzb2x2ZXMudG9CZSh0cnVlKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==