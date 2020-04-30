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

const form = () => {
  const form = document.createElement("form-dialog");
  form.addField({
    name: "name",
    type: "text",
    value: "",
    placeholder: "List Name"
  });

  form.addEventListener("close", e => {
    Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["add"])({
      id: Math.floor(Math.random() * new Date().getTime()),
      name: e.detail.formData.name,
      items: [],
      synced: false
    }).then(res => Object(_utils_navigation_js__WEBPACK_IMPORTED_MODULE_1__["navigate"])("/app/list/", div));
  });
  return form;
};

const floatingButton = () => {
  const button = document.createElement("floating-button");
  button.addEventListener("click", e => {
    const foo = document.querySelector("form-dialog");
    foo.toggleOpen();
  });
  return button;
};

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
      div.appendChild(floatingButton());
      // Append form dialog
      div.appendChild(form());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kYmZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25hdmlnYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFZ0Q7QUFDQzs7QUFFakQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLElBQUksNERBQUc7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssY0FBYyxxRUFBUTtBQUMzQixHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksK0RBQU07QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFFQUFRO0FBQ2hCLE9BQU87QUFDUDtBQUNBLHdCQUF3QiwrQkFBK0I7QUFDdkQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNlLHFFQUFNLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUNsRXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVvQzs7Ozs7Ozs7Ozs7OztBQ2hGcEM7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVvQiIsImZpbGUiOiIyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1pbmRleC5qc1xuICovXG5cbmltcG9ydCB7IGdldEFsbCwgYWRkIH0gZnJvbSBcIi4vdXRpbHMvZGJmdW5jLmpzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZSB9IGZyb20gXCIuL3V0aWxzL25hdmlnYXRpb24uanNcIjtcblxuY29uc3QgdWlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfdVwiKSB8fCAwO1xuXG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3Qga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuZGl2LnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGtleSk7XG5cbmNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFwcC10aXRsZVwiKTtcblxuY29uc3QgZm9ybSA9ICgpID0+IHtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtLWRpYWxvZ1wiKTtcbiAgZm9ybS5hZGRGaWVsZCh7XG4gICAgbmFtZTogXCJuYW1lXCIsXG4gICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgdmFsdWU6IFwiXCIsXG4gICAgcGxhY2Vob2xkZXI6IFwiTGlzdCBOYW1lXCJcbiAgfSk7XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwgZSA9PiB7XG4gICAgYWRkKHtcbiAgICAgIGlkOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBuZXcgRGF0ZSgpLmdldFRpbWUoKSksXG4gICAgICBuYW1lOiBlLmRldGFpbC5mb3JtRGF0YS5uYW1lLFxuICAgICAgaXRlbXM6IFtdLFxuICAgICAgc3luY2VkOiBmYWxzZVxuICAgIH0pLnRoZW4ocmVzID0+IG5hdmlnYXRlKFwiL2FwcC9saXN0L1wiLCBkaXYpKTtcbiAgfSk7XG4gIHJldHVybiBmb3JtO1xufTtcblxuY29uc3QgZmxvYXRpbmdCdXR0b24gPSAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmbG9hdGluZy1idXR0b25cIik7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgY29uc3QgZm9vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm0tZGlhbG9nXCIpO1xuICAgIGZvby50b2dnbGVPcGVuKCk7XG4gIH0pO1xuICByZXR1cm4gYnV0dG9uO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIGdldEFsbCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiSW5kZXhcIik7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIGxldCBzZWxlY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdC1saXN0XCIpO1xuICAgICAgc2VsZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0XCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX2xcIiwgZS5kZXRhaWwuaWQpO1xuICAgICAgICBuYXZpZ2F0ZShcIi9hcHAvbGlzdC9cIiwgZS50YXJnZXQpO1xuICAgICAgfSk7XG4gICAgICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgc2VsZWN0TGlzdC5hZGQoeyBpZDogaXRlbS5pZCwgbmFtZTogaXRlbS5uYW1lIH0pO1xuICAgICAgfSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TGlzdCk7XG4gICAgICAvLyBBcHBlbmQgZmxvYXRpbmcgYnV0dG9uXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoZmxvYXRpbmdCdXR0b24oKSk7XG4gICAgICAvLyBBcHBlbmQgZm9ybSBkaWFsb2dcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChmb3JtKCkpO1xuICAgICAgcmV0dXJuIHJlc29sdmUoZGl2KTtcbiAgICB9KVxuICApO1xuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIiwiLyoqXG4gKiBGaWxlbmFtZTogZGJmdW5jLmpzXG4gKi9cblxuY29uc3QgREJfTkFNRSA9IFwiZ3JvY2VyeV9saXN0XCI7XG5jb25zdCBEQl9WRVJTSU9OID0gMTtcbi8qKlxuICogQHBhcmFtIG5hbWUgc3RyaW5nXG4gKiBAcGFyYW0gdmVyc2lvbiBpbnRcbiAqL1xuY29uc3QgZGIgPSAobmFtZSwgdmVyc2lvbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCByZXEgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcbiAgICByZXEub251cGdyYWRlbmVlZGVkID0gZXZlbnQgPT4ge1xuICAgICAgbGV0IHN0b3JlID0gZXZlbnQudGFyZ2V0LnJlc3VsdC5jcmVhdGVPYmplY3RTdG9yZShuYW1lLCB7XG4gICAgICAgIGF1dG9JbmNyZW1lbnQ6IGZhbHNlLFxuICAgICAgICBrZXlQYXRoOiBcImlkXCJcbiAgICAgIH0pO1xuICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoXCJpbmR4X2lkXCIsIFwiaWRcIiwgeyB1bmlxdWU6IHRydWUgfSk7XG4gICAgfTtcbiAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBzY2hlbWEgc3RyaW5nXG4gKiBAcGFyYW0gb2JqIG9iamVjdCB8IGFycmF5XG4gKi9cbmNvbnN0IGFkZCA9IG9iaiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmFkZChvYmopO1xuICAgICAgdHJhbnMub25jb21wbGV0ZSA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudHlwZSk7XG4gICAgICB0cmFucy5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgcmVtb3ZlID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmRlbGV0ZShrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIGtleSBzdHJpbmdcbiAqL1xuY29uc3QgZ2V0ID0ga2V5ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgbGV0IHJlcSA9IHN0b3JlLmdldChrZXkpO1xuICAgICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICByZXEub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufTtcbi8qKlxuICpcbiAqL1xuY29uc3QgZ2V0QWxsID0gKCkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZG9ubHlcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIHN0b3JlLmdldEFsbCgpLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgYWRkLCByZW1vdmUsIGdldCwgZ2V0QWxsIH07XG4iLCIvKipcbiAqIEBmaWxlbmFtZSBuYXZpZ2F0aW9uLmpzXG4gKi9cbmNvbnN0IG5hdmlnYXRlID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJuYXZpZ2F0ZVwiLCB7XG4gICAgZGV0YWlsOiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgdGFyZ2V0OiBlbG1cbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbn07XG5cbmV4cG9ydCB7IG5hdmlnYXRlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9