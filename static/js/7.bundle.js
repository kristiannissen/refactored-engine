(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./src/tests/storage.test.js":
/*!***********************************!*\
  !*** ./src/tests/storage.test.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/storage.js */ "./src/lib/storage.js");
/**
 * storage.test.js
 * Async write/read local storage
 */
jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");



test("returns true when item is stored", () => {
  expect.assertions(1);
  return Object(_lib_storage_js__WEBPACK_IMPORTED_MODULE_0__["storeItem"])("test", { hello: "Kitty" }).then(len =>
    expect(len).toBe(17)
  );
});

test("return error when item cannot be fetched", () => {
  expect.assertions(1);
  return Object(_lib_storage_js__WEBPACK_IMPORTED_MODULE_0__["fetchItem"])("hello").catch(e => expect(e).toBe("hello not found"));
});

test("return object when item can be fetched", () => {
  let dummy = { hello: "Kitty" };

  expect.assertions(1);
  return Object(_lib_storage_js__WEBPACK_IMPORTED_MODULE_0__["fetchItem"])("test").then(obj => expect(obj.hello).toBe(dummy.hello));
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUUyRDs7QUFFM0Q7QUFDQTtBQUNBLFNBQVMsaUVBQVMsVUFBVSxpQkFBaUI7QUFDN0M7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFNBQVMsaUVBQVM7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBLGVBQWU7O0FBRWY7QUFDQSxTQUFTLGlFQUFTO0FBQ2xCLENBQUMiLCJmaWxlIjoiNy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHN0b3JhZ2UudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCBsb2NhbCBzdG9yYWdlXG4gKi9cbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwic2V0SXRlbVwiKTtcbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwiZ2V0SXRlbVwiKTtcblxuaW1wb3J0IHsgc3RvcmVJdGVtLCBmZXRjaEl0ZW0gfSBmcm9tIFwiLi8uLi9saWIvc3RvcmFnZS5qc1wiO1xuXG50ZXN0KFwicmV0dXJucyB0cnVlIHdoZW4gaXRlbSBpcyBzdG9yZWRcIiwgKCkgPT4ge1xuICBleHBlY3QuYXNzZXJ0aW9ucygxKTtcbiAgcmV0dXJuIHN0b3JlSXRlbShcInRlc3RcIiwgeyBoZWxsbzogXCJLaXR0eVwiIH0pLnRoZW4obGVuID0+XG4gICAgZXhwZWN0KGxlbikudG9CZSgxNylcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmV0dXJuIGVycm9yIHdoZW4gaXRlbSBjYW5ub3QgYmUgZmV0Y2hlZFwiLCAoKSA9PiB7XG4gIGV4cGVjdC5hc3NlcnRpb25zKDEpO1xuICByZXR1cm4gZmV0Y2hJdGVtKFwiaGVsbG9cIikuY2F0Y2goZSA9PiBleHBlY3QoZSkudG9CZShcImhlbGxvIG5vdCBmb3VuZFwiKSk7XG59KTtcblxudGVzdChcInJldHVybiBvYmplY3Qgd2hlbiBpdGVtIGNhbiBiZSBmZXRjaGVkXCIsICgpID0+IHtcbiAgbGV0IGR1bW15ID0geyBoZWxsbzogXCJLaXR0eVwiIH07XG5cbiAgZXhwZWN0LmFzc2VydGlvbnMoMSk7XG4gIHJldHVybiBmZXRjaEl0ZW0oXCJ0ZXN0XCIpLnRoZW4ob2JqID0+IGV4cGVjdChvYmouaGVsbG8pLnRvQmUoZHVtbXkuaGVsbG8pKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==