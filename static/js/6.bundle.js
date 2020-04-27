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


/***/ }),

/***/ "./src/utils/storage.js":
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
/*! exports provided: storeItem, fetchItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeItem", function() { return storeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchItem", function() { return fetchItem; });
/**
 * storage.js
 */
const storeItem = (key, obj) => {
  return new Promise((resolve, reject) => {
    let str = JSON.stringify(obj);
    localStorage.setItem(key, str);
    resolve(str.length);
  });
};

const fetchItem = key => {
  return new Promise((resolve, reject) => {
    let item = localStorage.getItem(key);
    if (item == null) {
      return reject(`${key} not found`);
    } else {
      return resolve(JSON.parse(item));
    }
  });
};




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU2RDs7QUFFN0Q7QUFDQTtBQUNBLFNBQVMsbUVBQVMsVUFBVSxpQkFBaUI7QUFDN0M7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLFNBQVMsbUVBQVM7QUFDbEIsQ0FBQzs7QUFFRDtBQUNBLGVBQWU7O0FBRWY7QUFDQSxTQUFTLG1FQUFTO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUMxQkQ7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixJQUFJO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVnQyIsImZpbGUiOiI2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogc3RvcmFnZS50ZXN0LmpzXG4gKiBBc3luYyB3cml0ZS9yZWFkIGxvY2FsIHN0b3JhZ2VcbiAqL1xuamVzdC5zcHlPbih3aW5kb3cubG9jYWxTdG9yYWdlLl9fcHJvdG9fXywgXCJzZXRJdGVtXCIpO1xuamVzdC5zcHlPbih3aW5kb3cubG9jYWxTdG9yYWdlLl9fcHJvdG9fXywgXCJnZXRJdGVtXCIpO1xuXG5pbXBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9IGZyb20gXCIuLy4uL3V0aWxzL3N0b3JhZ2UuanNcIjtcblxudGVzdChcInJldHVybnMgdHJ1ZSB3aGVuIGl0ZW0gaXMgc3RvcmVkXCIsICgpID0+IHtcbiAgZXhwZWN0LmFzc2VydGlvbnMoMSk7XG4gIHJldHVybiBzdG9yZUl0ZW0oXCJ0ZXN0XCIsIHsgaGVsbG86IFwiS2l0dHlcIiB9KS50aGVuKGxlbiA9PlxuICAgIGV4cGVjdChsZW4pLnRvQmUoMTcpXG4gICk7XG59KTtcblxudGVzdChcInJldHVybiBlcnJvciB3aGVuIGl0ZW0gY2Fubm90IGJlIGZldGNoZWRcIiwgKCkgPT4ge1xuICBleHBlY3QuYXNzZXJ0aW9ucygxKTtcbiAgcmV0dXJuIGZldGNoSXRlbShcImhlbGxvXCIpLmNhdGNoKGUgPT4gZXhwZWN0KGUpLnRvQmUoXCJoZWxsbyBub3QgZm91bmRcIikpO1xufSk7XG5cbnRlc3QoXCJyZXR1cm4gb2JqZWN0IHdoZW4gaXRlbSBjYW4gYmUgZmV0Y2hlZFwiLCAoKSA9PiB7XG4gIGxldCBkdW1teSA9IHsgaGVsbG86IFwiS2l0dHlcIiB9O1xuXG4gIGV4cGVjdC5hc3NlcnRpb25zKDEpO1xuICByZXR1cm4gZmV0Y2hJdGVtKFwidGVzdFwiKS50aGVuKG9iaiA9PiBleHBlY3Qob2JqLmhlbGxvKS50b0JlKGR1bW15LmhlbGxvKSk7XG59KTtcbiIsIi8qKlxuICogc3RvcmFnZS5qc1xuICovXG5jb25zdCBzdG9yZUl0ZW0gPSAoa2V5LCBvYmopID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0cik7XG4gICAgcmVzb2x2ZShzdHIubGVuZ3RoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmZXRjaEl0ZW0gPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoaXRlbSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVqZWN0KGAke2tleX0gbm90IGZvdW5kYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNvbHZlKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgeyBzdG9yZUl0ZW0sIGZldGNoSXRlbSB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==