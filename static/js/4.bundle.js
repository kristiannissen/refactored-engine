webpackJsonp([4,10],{

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_storage_js__ = __webpack_require__(3);
/**
 * storage.test.js
 * Async write/read local storage
 */
jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "getItem");



test("returns true when item is stored", () => {
  expect.assertions(1);
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_storage_js__["storeItem"])("test", { hello: "Kitty" }).then(len =>
    expect(len).toBe(17)
  );
});

test("return error when item cannot be fetched", () => {
  expect.assertions(1);
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_storage_js__["fetchItem"])("hello").catch(e => expect(e).toBe("hello not found"));
});

test("return object when item can be fetched", () => {
  let dummy = { hello: "Kitty" };

  expect.assertions(1);
  return Object(__WEBPACK_IMPORTED_MODULE_0__lib_storage_js__["fetchItem"])("test").then(obj => expect(obj.hello).toBe(dummy.hello));
});


/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRStCOztBQUUvQjtBQUNBO0FBQ0EscUZBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUMxQkQ7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLElBQUk7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRVEiLCJmaWxlIjoiNC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHN0b3JhZ2UudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCBsb2NhbCBzdG9yYWdlXG4gKi9cbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwic2V0SXRlbVwiKTtcbmplc3Quc3B5T24od2luZG93LmxvY2FsU3RvcmFnZS5fX3Byb3RvX18sIFwiZ2V0SXRlbVwiKTtcblxuaW1wb3J0IHsgc3RvcmVJdGVtLCBmZXRjaEl0ZW0gfSBmcm9tIFwiLi8uLi9saWIvc3RvcmFnZS5qc1wiO1xuXG50ZXN0KFwicmV0dXJucyB0cnVlIHdoZW4gaXRlbSBpcyBzdG9yZWRcIiwgKCkgPT4ge1xuICBleHBlY3QuYXNzZXJ0aW9ucygxKTtcbiAgcmV0dXJuIHN0b3JlSXRlbShcInRlc3RcIiwgeyBoZWxsbzogXCJLaXR0eVwiIH0pLnRoZW4obGVuID0+XG4gICAgZXhwZWN0KGxlbikudG9CZSgxNylcbiAgKTtcbn0pO1xuXG50ZXN0KFwicmV0dXJuIGVycm9yIHdoZW4gaXRlbSBjYW5ub3QgYmUgZmV0Y2hlZFwiLCAoKSA9PiB7XG4gIGV4cGVjdC5hc3NlcnRpb25zKDEpO1xuICByZXR1cm4gZmV0Y2hJdGVtKFwiaGVsbG9cIikuY2F0Y2goZSA9PiBleHBlY3QoZSkudG9CZShcImhlbGxvIG5vdCBmb3VuZFwiKSk7XG59KTtcblxudGVzdChcInJldHVybiBvYmplY3Qgd2hlbiBpdGVtIGNhbiBiZSBmZXRjaGVkXCIsICgpID0+IHtcbiAgbGV0IGR1bW15ID0geyBoZWxsbzogXCJLaXR0eVwiIH07XG5cbiAgZXhwZWN0LmFzc2VydGlvbnMoMSk7XG4gIHJldHVybiBmZXRjaEl0ZW0oXCJ0ZXN0XCIpLnRoZW4ob2JqID0+IGV4cGVjdChvYmouaGVsbG8pLnRvQmUoZHVtbXkuaGVsbG8pKTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGVzdHMvc3RvcmFnZS50ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKipcbiAqIHN0b3JhZ2UuanNcbiAqL1xuY29uc3Qgc3RvcmVJdGVtID0gKGtleSwgb2JqKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHIpO1xuICAgIHJlc29sdmUoc3RyLmxlbmd0aCk7XG4gIH0pO1xufTtcblxuY29uc3QgZmV0Y2hJdGVtID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHJlamVjdChgJHtrZXl9IG5vdCBmb3VuZGApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZShKU09OLnBhcnNlKGl0ZW0pKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgc3RvcmVJdGVtLCBmZXRjaEl0ZW0gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9zdG9yYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIl0sInNvdXJjZVJvb3QiOiIifQ==