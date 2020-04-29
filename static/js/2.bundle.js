(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/app-index.js":
/*!**************************!*\
  !*** ./src/app-index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dbfunc.js */ "./src/utils/dbfunc.js");
/* harmony import */ var _utils_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/navigation.js */ "./src/utils/navigation.js");
/**
 * Filename: app-index.js
 */




const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);

const title = document.querySelector("app-title");
const formDialog = document.querySelector("form-dialog");
// TODO: Could be extracted and be a component
const floatingButton = document.createElement("button");
floatingButton.innerHTML = `Add`;
floatingButton.addEventListener("click", e => {
  e.preventDefault();
  formDialog.toggleOpen();
});

const render = () =>
  new Promise(resolve =>
    Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["getAll"])().then(result => {
      title.setAttribute("title", "Index");
      div.innerHTML = "";
      let selectList = document.createElement("select-list");
      selectList.addEventListener("select", e => {
        e.preventDefault();
        localStorage.setItem("_l", e.detail.id);
        Object(_utils_navigation_js__WEBPACK_IMPORTED_MODULE_1__["navigate"])("/app/list/", e.target);
      });
      result.forEach(item => {
        selectList.add({ id: item.id, name: item.name });
      });
      div.appendChild(selectList);
      // Append floating button
      div.appendChild(floatingButton);
      return resolve(div);
    })
  );
/* harmony default export */ __webpack_exports__["default"] = (render);


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




/***/ }),

/***/ "./src/utils/navigation.js":
/*!*********************************!*\
  !*** ./src/utils/navigation.js ***!
  \*********************************/
/*! exports provided: navigate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/**
 * @filename navigation.js
 */
const navigate = (path, elm) => {
  let customEvent = new CustomEvent("navigate", {
    detail: {
      path: path,
      target: elm
    }
  });
  document.dispatchEvent(customEvent);
};




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kYmZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25hdmlnYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFMkM7QUFDTTs7QUFFakQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxJQUFJLCtEQUFNO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBUTtBQUNoQixPQUFPO0FBQ1A7QUFDQSx3QkFBd0IsK0JBQStCO0FBQ3ZELE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNlLHFFQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUMzQ3RCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVvQzs7Ozs7Ozs7Ozs7OztBQ2hGcEM7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVvQiIsImZpbGUiOiIyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1pbmRleC5qc1xuICovXG5cbmltcG9ydCB7IGdldEFsbCB9IGZyb20gXCIuL3V0aWxzL2RiZnVuYy5qc1wiO1xuaW1wb3J0IHsgbmF2aWdhdGUgfSBmcm9tIFwiLi91dGlscy9uYXZpZ2F0aW9uLmpzXCI7XG5cbmNvbnN0IHVpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX3VcIikgfHwgMDtcblxuY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmNvbnN0IGtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbmRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBrZXkpO1xuXG5jb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhcHAtdGl0bGVcIik7XG5jb25zdCBmb3JtRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm0tZGlhbG9nXCIpO1xuLy8gVE9ETzogQ291bGQgYmUgZXh0cmFjdGVkIGFuZCBiZSBhIGNvbXBvbmVudFxuY29uc3QgZmxvYXRpbmdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuZmxvYXRpbmdCdXR0b24uaW5uZXJIVE1MID0gYEFkZGA7XG5mbG9hdGluZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgZm9ybURpYWxvZy50b2dnbGVPcGVuKCk7XG59KTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIGdldEFsbCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiSW5kZXhcIik7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGxldCBzZWxlY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdC1saXN0XCIpO1xuICAgICAgc2VsZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0XCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX2xcIiwgZS5kZXRhaWwuaWQpO1xuICAgICAgICBuYXZpZ2F0ZShcIi9hcHAvbGlzdC9cIiwgZS50YXJnZXQpO1xuICAgICAgfSk7XG4gICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgc2VsZWN0TGlzdC5hZGQoeyBpZDogaXRlbS5pZCwgbmFtZTogaXRlbS5uYW1lIH0pO1xuICAgICAgfSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TGlzdCk7XG4gICAgICAvLyBBcHBlbmQgZmxvYXRpbmcgYnV0dG9uXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoZmxvYXRpbmdCdXR0b24pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoZGl2KTtcbiAgICB9KVxuICApO1xuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIiwiLyoqXG4gKiBGaWxlbmFtZTogZGJmdW5jLmpzXG4gKi9cblxuY29uc3QgREJfTkFNRSA9IFwiZ3JvY2VyeV9saXN0XCI7XG5jb25zdCBEQl9WRVJTSU9OID0gMTtcbi8qKlxuICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gKiBAcGFyYW0gdmVyc2lvbiBpbnRcbiAqL1xuY29uc3QgZGIgPSAobmFtZSwgdmVyc2lvbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCByZXEgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICByZXEub251cGdyYWRlbmVlZGVkID0gZXZlbnQgPT4ge1xuICAgICAgbGV0IHN0b3JlID0gZXZlbnQudGFyZ2V0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShuYW1lLCB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IGZhbHNlLFxuICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgIH0pO1xuICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoXCJpbmR4X2lkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICpcbiAqL1xuY29uc3QgZ2V0QWxsID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZG9ubHlcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmdldEFsbCgpLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH07XG4iLCIvKipcbiAqIEBmaWxlbmFtZSBuYXZpZ2F0aW9uLmpzXG4gKi9cbmNvbnN0IG5hdmlnYXRlID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJuYXZpZ2F0ZVwiLCB7XG4gICAgZGV0YWlsOiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgdGFyZ2V0OiBlbG1cbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbn07XG5cbmV4cG9ydCB7IG5hdmlnYXRlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9