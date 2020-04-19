(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/tests/dbfunc.test.js":
/*!**********************************!*\
  !*** ./src/tests/dbfunc.test.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/dbfunc.js */ "./src/lib/dbfunc.js");
/**
 * dbfunc.test.js
 * Async write/read to indexedDB
 */

__webpack_require__(/*! fake-indexeddb/auto */ "./node_modules/fake-indexeddb/auto.js");



test("resolves when object is stored", () => {
  return expect(
    Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["add"])({
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
  return expect(Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(1)).resolves.toMatchObject({ name: "Kitty" });
});

test("resolves with error when key is not found", () => {
  return expect(Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(42)).resolves.toBeUndefined();
});

test("resolves when key is deleted", () => {
  return expect(Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["remove"])(1)).resolves.toBeUndefined();
});

test("resolves when getall is called", () => {
  return expect(Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["getAll"])()).resolves.toBe(true);
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBTyxDQUFDLGtFQUFxQjs7QUFFaUM7O0FBRTlEO0FBQ0E7QUFDQSxJQUFJLDBEQUFHO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sNERBQTREO0FBQ25FLE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxnQkFBZ0IsMERBQUcsNkJBQTZCLGdCQUFnQjtBQUNoRSxDQUFDOztBQUVEO0FBQ0EsZ0JBQWdCLDBEQUFHO0FBQ25CLENBQUM7O0FBRUQ7QUFDQSxnQkFBZ0IsNkRBQU07QUFDdEIsQ0FBQzs7QUFFRDtBQUNBLGdCQUFnQiw2REFBTTtBQUN0QixDQUFDIiwiZmlsZSI6IjYuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYmZ1bmMudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCB0byBpbmRleGVkREJcbiAqL1xuXG5yZXF1aXJlKFwiZmFrZS1pbmRleGVkZGIvYXV0b1wiKTtcblxuaW1wb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH0gZnJvbSBcIi4vLi4vbGliL2RiZnVuYy5qc1wiO1xuXG50ZXN0KFwicmVzb2x2ZXMgd2hlbiBvYmplY3QgaXMgc3RvcmVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChcbiAgICBhZGQoe1xuICAgICAgbmFtZTogXCJLaXR0eVwiLFxuICAgICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpXG4gICAgfSlcbiAgKS5yZXNvbHZlcy50b01hdGNoKFwiY29tcGxldGVcIik7XG59KTtcbi8qXG50ZXN0KFwicmVzb2x2ZXMgd2hlbiBhcnJheSBpcyBzdG9yZWRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KFxuICAgIGFkZChbXG4gICAgICB7IG5hbWU6IFwiSGVsbG9cIiwgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpIH0sXG4gICAgICB7IG5hbWU6IFwiS2l0dHlcIiwgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIERhdGUubm93KCkpIH1cbiAgICBdKVxuICApLnJlc29sdmVzLnRvTWF0Y2goXCJjb21wbGV0ZVwiKTtcbn0pO1xuKi9cbnRlc3QoXCJyZXNvbHZlcyBvYmplY3Qgd2l0aCBrZXkgPSBrZXlcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KGdldCgxKSkucmVzb2x2ZXMudG9NYXRjaE9iamVjdCh7IG5hbWU6IFwiS2l0dHlcIiB9KTtcbn0pO1xuXG50ZXN0KFwicmVzb2x2ZXMgd2l0aCBlcnJvciB3aGVuIGtleSBpcyBub3QgZm91bmRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KGdldCg0MikpLnJlc29sdmVzLnRvQmVVbmRlZmluZWQoKTtcbn0pO1xuXG50ZXN0KFwicmVzb2x2ZXMgd2hlbiBrZXkgaXMgZGVsZXRlZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QocmVtb3ZlKDEpKS5yZXNvbHZlcy50b0JlVW5kZWZpbmVkKCk7XG59KTtcblxudGVzdChcInJlc29sdmVzIHdoZW4gZ2V0YWxsIGlzIGNhbGxlZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoZ2V0QWxsKCkpLnJlc29sdmVzLnRvQmUodHJ1ZSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=