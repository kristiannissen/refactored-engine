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


/***/ }),

/***/ "./src/utils/dbfunc.js":
/*!*****************************!*\
  !*** ./src/utils/dbfunc.js ***!
  \*****************************/
/*! exports provided: add, remove, get, getAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/**
 * Filename: dbfunc.js
 */

const DB_NAME = "grocery_list";
const DB_VERSION = 1;
/**
 * @param name string
 * @param version int
 */
const db = (name, version) => {
  return new Promise((resolve, reject) => {
    let req = indexedDB.open(name, version);
    req.onupgradeneeded = event => {
      let store = event.target.result.createObjectStore(name, {
        autoIncrement: false,
        keyPath: "id"
      });
      store.createIndex("indx_id", "id", { unique: true });
    };
    req.onsuccess = event => resolve(event.target.result);
    req.onerror = event => reject(event.target);
  });
};
/**
 * @param schema string
 * @param obj object | array
 */
const add = obj => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      store.add(obj);
      trans.oncomplete = event => resolve(event.type);
      trans.onerror = event => reject(event.target);
    });
  });
};
/**
 * @param key string
 */
const remove = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      let req = store.delete(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};
/**
 * @param key string
 */
const get = key => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readwrite");
      let store = trans.objectStore(DB_NAME);
      let req = store.get(key);
      req.onsuccess = event => resolve(event.target.result);
      req.onerror = event => reject(event);
    });
  });
};
/**
 *
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db(DB_NAME, DB_VERSION).then(res => {
      let trans = res.transaction([DB_NAME], "readonly");
      let store = trans.objectStore(DB_NAME);
      store.getAll().onsuccess = event => resolve(event.target.result);
    });
  });
};




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVzdHMvZGJmdW5jLnRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2RiZnVuYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFPLENBQUMsa0VBQXFCOztBQUVtQzs7QUFFaEU7QUFDQTtBQUNBLElBQUksNERBQUc7QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0REFBNEQ7QUFDbkUsT0FBTztBQUNQO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGdCQUFnQiw0REFBRyw2QkFBNkIsZ0JBQWdCO0FBQ2hFLENBQUM7O0FBRUQ7QUFDQSxnQkFBZ0IsNERBQUc7QUFDbkIsQ0FBQzs7QUFFRDtBQUNBLGdCQUFnQiwrREFBTTtBQUN0QixDQUFDOztBQUVEO0FBQ0EsZ0JBQWdCLCtEQUFNO0FBQ3RCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6Q0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRW9DIiwiZmlsZSI6IjUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYmZ1bmMudGVzdC5qc1xuICogQXN5bmMgd3JpdGUvcmVhZCB0byBpbmRleGVkREJcbiAqL1xuXG5yZXF1aXJlKFwiZmFrZS1pbmRleGVkZGIvYXV0b1wiKTtcblxuaW1wb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH0gZnJvbSBcIi4vLi4vdXRpbHMvZGJmdW5jLmpzXCI7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aGVuIG9iamVjdCBpcyBzdG9yZWRcIiwgKCkgPT4ge1xuICByZXR1cm4gZXhwZWN0KFxuICAgIGFkZCh7XG4gICAgICBuYW1lOiBcIktpdHR5XCIsXG4gICAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSlcbiAgICB9KVxuICApLnJlc29sdmVzLnRvTWF0Y2goXCJjb21wbGV0ZVwiKTtcbn0pO1xuLypcbnRlc3QoXCJyZXNvbHZlcyB3aGVuIGFycmF5IGlzIHN0b3JlZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoXG4gICAgYWRkKFtcbiAgICAgIHsgbmFtZTogXCJIZWxsb1wiLCBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSkgfSxcbiAgICAgIHsgbmFtZTogXCJLaXR0eVwiLCBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSkgfVxuICAgIF0pXG4gICkucmVzb2x2ZXMudG9NYXRjaChcImNvbXBsZXRlXCIpO1xufSk7XG4qL1xudGVzdChcInJlc29sdmVzIG9iamVjdCB3aXRoIGtleSA9IGtleVwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoZ2V0KDEpKS5yZXNvbHZlcy50b01hdGNoT2JqZWN0KHsgbmFtZTogXCJLaXR0eVwiIH0pO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aXRoIGVycm9yIHdoZW4ga2V5IGlzIG5vdCBmb3VuZFwiLCAoKSA9PiB7XG4gIHJldHVybiBleHBlY3QoZ2V0KDQyKSkucmVzb2x2ZXMudG9CZVVuZGVmaW5lZCgpO1xufSk7XG5cbnRlc3QoXCJyZXNvbHZlcyB3aGVuIGtleSBpcyBkZWxldGVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChyZW1vdmUoMSkpLnJlc29sdmVzLnRvQmVVbmRlZmluZWQoKTtcbn0pO1xuXG50ZXN0KFwicmVzb2x2ZXMgd2hlbiBnZXRhbGwgaXMgY2FsbGVkXCIsICgpID0+IHtcbiAgcmV0dXJuIGV4cGVjdChnZXRBbGwoKSkucmVzb2x2ZXMudG9CZSh0cnVlKTtcbn0pO1xuIiwiLyoqXG4gKiBGaWxlbmFtZTogZGJmdW5jLmpzXG4gKi9cblxuY29uc3QgREJfTkFNRSA9IFwiZ3JvY2VyeV9saXN0XCI7XG5jb25zdCBEQl9WRVJTSU9OID0gMTtcbi8qKlxuICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gKiBAcGFyYW0gdmVyc2lvbiBpbnRcbiAqL1xuY29uc3QgZGIgPSAobmFtZSwgdmVyc2lvbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCByZXEgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICByZXEub251cGdyYWRlbmVlZGVkID0gZXZlbnQgPT4ge1xuICAgICAgbGV0IHN0b3JlID0gZXZlbnQudGFyZ2V0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShuYW1lLCB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IGZhbHNlLFxuICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgIH0pO1xuICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoXCJpbmR4X2lkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICpcbiAqL1xuY29uc3QgZ2V0QWxsID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZG9ubHlcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmdldEFsbCgpLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH07XG4iXSwic291cmNlUm9vdCI6IiJ9