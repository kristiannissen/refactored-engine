(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/tests/storage.test.js":
/*!***********************************!*\
  !*** ./src/tests/storage.test.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/storage.js */ "./src/utils/storage.js");
/**
 * storage.test.js
 * Async write/read local storage
 */
jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");



test("returns true when item is stored", () => {
  expect.assertions(1);
  return Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__["storeItem"])("test", { hello: "Kitty" }).then(len =>
    expect(len).toBe(17)
  );
});

test("return error when item cannot be fetched", () => {
  expect.assertions(1);
  return Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__["fetchItem"])("hello").catch(e => expect(e).toBe("hello not found"));
});

test("return object when item can be fetched", () => {
  let dummy = { hello: "Kitty" };

  expect.assertions(1);
  return Object(_utils_storage_js__WEBPACK_IMPORTED_MODULE_0__["fetchItem"])("test").then(obj => expect(obj.hello).toBe(dummy.hello));
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2RDs7QUFFN0Q7QUFDQTtBQUNBLFNBQVMsbUVBQVMsVUFBVSxpQkFBaUI7QUFDN0M7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFNBQVMsbUVBQVM7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBLGVBQWU7O0FBRWY7QUFDQSxTQUFTLG1FQUFTO0FBQ2xCLENBQUMiLCJmaWxlIjoiNi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHN0b3JhZ2UudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCBsb2NhbCBzdG9yYWdlXG4gKi9cbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwic2V0SXRlbVwiKTtcbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwiZ2V0SXRlbVwiKTtcblxuaW1wb3J0IHsgc3RvcmVJdGVtLCBmZXRjaEl0ZW0gfSBmcm9tIFwiLi8uLi91dGlscy9zdG9yYWdlLmpzXCI7XG5cbnRlc3QoXCJyZXR1cm5zIHRydWUgd2hlbiBpdGVtIGlzIHN0b3JlZFwiLCAoKSA9PiB7XG4gIGV4cGVjdC5hc3NlcnRpb25zKDEpO1xuICByZXR1cm4gc3RvcmVJdGVtKFwidGVzdFwiLCB7IGhlbGxvOiBcIktpdHR5XCIgfSkudGhlbihsZW4gPT5cbiAgICBleHBlY3QobGVuKS50b0JlKDE3KVxuICApO1xufSk7XG5cbnRlc3QoXCJyZXR1cm4gZXJyb3Igd2hlbiBpdGVtIGNhbm5vdCBiZSBmZXRjaGVkXCIsICgpID0+IHtcbiAgZXhwZWN0LmFzc2VydGlvbnMoMSk7XG4gIHJldHVybiBmZXRjaEl0ZW0oXCJoZWxsb1wiKS5jYXRjaChlID0+IGV4cGVjdChlKS50b0JlKFwiaGVsbG8gbm90IGZvdW5kXCIpKTtcbn0pO1xuXG50ZXN0KFwicmV0dXJuIG9iamVjdCB3aGVuIGl0ZW0gY2FuIGJlIGZldGNoZWRcIiwgKCkgPT4ge1xuICBsZXQgZHVtbXkgPSB7IGhlbGxvOiBcIktpdHR5XCIgfTtcblxuICBleHBlY3QuYXNzZXJ0aW9ucygxKTtcbiAgcmV0dXJuIGZldGNoSXRlbShcInRlc3RcIikudGhlbihvYmogPT4gZXhwZWN0KG9iai5oZWxsbykudG9CZShkdW1teS5oZWxsbykpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9