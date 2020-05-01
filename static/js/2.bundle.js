(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/app-index.js":
/*!**************************!*\
  !*** ./src/app-index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dbfunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dbfunc */ "./src/utils/dbfunc.js");
/* harmony import */ var _utils_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/navigation */ "./src/utils/navigation.js");
/* harmony import */ var _utils_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/pubsub */ "./src/utils/pubsub.js");
/**
 * Filename: app-index.js
 */





const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);
/**
 * create the form-dialog to add new lists
 */
const form = () => {
  const form = document.createElement("form-dialog");
  form.addField({
    name: "name",
    type: "text",
    value: "",
    placeholder: "List Name"
  });

  form.addEventListener("close", e => {
    Object(_utils_dbfunc__WEBPACK_IMPORTED_MODULE_0__["add"])({
      id: Math.floor(Math.random() * new Date().getTime()),
      name: e.detail.formData.name,
      items: [],
      synced: false
    }).then(res => Object(_utils_navigation__WEBPACK_IMPORTED_MODULE_1__["navigate"])("/app/list/", div));
  });
  return form;
};
/*
 * create floating button to open form-dialog
 */
const floatingButton = () => {
  const button = document.createElement("floating-button");
  button.addEventListener("click", e => {
    const foo = document.querySelector("form-dialog");
    foo.toggleOpen();
  });
  return button;
};
/*
 * the meat and potatoes
 */
const updateList = elm => {
  let selectList = document.createElement("select-list");
  Object(_utils_pubsub__WEBPACK_IMPORTED_MODULE_2__["subscribe"])("list-change", payload => {
    payload.forEach(item => selectList.add({ id: item.id, name: item.name }));
  });
  selectList.addEventListener("select", e => {
    e.preventDefault();
    localStorage.setItem("_l", e.detail.id);
    Object(_utils_navigation__WEBPACK_IMPORTED_MODULE_1__["navigate"])("/app/list/", e.target);
  });
  return selectList;
};
/*
 * Initial state
 */
Object(_utils_dbfunc__WEBPACK_IMPORTED_MODULE_0__["getAll"])().then(resp => Object(_utils_pubsub__WEBPACK_IMPORTED_MODULE_2__["publish"])("list-change", resp));
/*
 * render the UI
 */
const render = () =>
  new Promise(resolve => {
    div.append(updateList(div));
    div.append(floatingButton());
    div.append(form());

    resolve(div);
  });
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




/***/ }),

/***/ "./src/utils/pubsub.js":
/*!*****************************!*\
  !*** ./src/utils/pubsub.js ***!
  \*****************************/
/*! exports provided: subscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/**
 * PubSub.js
 * subscribers{key: []}
 */

let subscribers = {};

const subscribe = (message, callback) => {
  // console.log("subscribe", message, callback);
  if (Object.keys(subscribers).includes(message) === false) {
    subscribers[message] = [];
  }

  subscribers[message].push(callback);
};

const publish = (message, payload) => {
  console.log("publish", message, payload);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kYmZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3B1YnN1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRTZDO0FBQ0M7QUFDTTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsSUFBSSx5REFBRztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxjQUFjLGtFQUFRO0FBQzNCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0RBQVM7QUFDWCw0Q0FBNEMsK0JBQStCO0FBQzNFLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtFQUFRO0FBQ1osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBTSxnQkFBZ0IsNkRBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDWSxxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDMUV0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFb0M7Ozs7Ozs7Ozs7Ozs7QUNoRnBDO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFb0I7Ozs7Ozs7Ozs7Ozs7QUNicEI7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUU4QiIsImZpbGUiOiIyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1pbmRleC5qc1xuICovXG5cbmltcG9ydCB7IGdldEFsbCwgYWRkIH0gZnJvbSBcIi4vdXRpbHMvZGJmdW5jXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZSB9IGZyb20gXCIuL3V0aWxzL25hdmlnYXRpb25cIjtcbmltcG9ydCB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9IGZyb20gXCIuL3V0aWxzL3B1YnN1YlwiO1xuXG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3Qga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuZGl2LnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGtleSk7XG4vKipcbiAqIGNyZWF0ZSB0aGUgZm9ybS1kaWFsb2cgdG8gYWRkIG5ldyBsaXN0c1xuICovXG5jb25zdCBmb3JtID0gKCkgPT4ge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm0tZGlhbG9nXCIpO1xuICBmb3JtLmFkZEZpZWxkKHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICB0eXBlOiBcInRleHRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgICBwbGFjZWhvbGRlcjogXCJMaXN0IE5hbWVcIlxuICB9KTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCBlID0+IHtcbiAgICBhZGQoe1xuICAgICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSxcbiAgICAgIG5hbWU6IGUuZGV0YWlsLmZvcm1EYXRhLm5hbWUsXG4gICAgICBpdGVtczogW10sXG4gICAgICBzeW5jZWQ6IGZhbHNlXG4gICAgfSkudGhlbihyZXMgPT4gbmF2aWdhdGUoXCIvYXBwL2xpc3QvXCIsIGRpdikpO1xuICB9KTtcbiAgcmV0dXJuIGZvcm07XG59O1xuLypcbiAqIGNyZWF0ZSBmbG9hdGluZyBidXR0b24gdG8gb3BlbiBmb3JtLWRpYWxvZ1xuICovXG5jb25zdCBmbG9hdGluZ0J1dHRvbiA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZsb2F0aW5nLWJ1dHRvblwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBjb25zdCBmb28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybS1kaWFsb2dcIik7XG4gICAgZm9vLnRvZ2dsZU9wZW4oKTtcbiAgfSk7XG4gIHJldHVybiBidXR0b247XG59O1xuLypcbiAqIHRoZSBtZWF0IGFuZCBwb3RhdG9lc1xuICovXG5jb25zdCB1cGRhdGVMaXN0ID0gZWxtID0+IHtcbiAgbGV0IHNlbGVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0LWxpc3RcIik7XG4gIHN1YnNjcmliZShcImxpc3QtY2hhbmdlXCIsIHBheWxvYWQgPT4ge1xuICAgIHBheWxvYWQuZm9yRWFjaChpdGVtID0+IHNlbGVjdExpc3QuYWRkKHsgaWQ6IGl0ZW0uaWQsIG5hbWU6IGl0ZW0ubmFtZSB9KSk7XG4gIH0pO1xuICBzZWxlY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RcIiwgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX2xcIiwgZS5kZXRhaWwuaWQpO1xuICAgIG5hdmlnYXRlKFwiL2FwcC9saXN0L1wiLCBlLnRhcmdldCk7XG4gIH0pO1xuICByZXR1cm4gc2VsZWN0TGlzdDtcbn07XG4vKlxuICogSW5pdGlhbCBzdGF0ZVxuICovXG5nZXRBbGwoKS50aGVuKHJlc3AgPT4gcHVibGlzaChcImxpc3QtY2hhbmdlXCIsIHJlc3ApKTtcbi8qXG4gKiByZW5kZXIgdGhlIFVJXG4gKi9cbmNvbnN0IHJlbmRlciA9ICgpID0+XG4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGRpdi5hcHBlbmQodXBkYXRlTGlzdChkaXYpKTtcbiAgICBkaXYuYXBwZW5kKGZsb2F0aW5nQnV0dG9uKCkpO1xuICAgIGRpdi5hcHBlbmQoZm9ybSgpKTtcblxuICAgIHJlc29sdmUoZGl2KTtcbiAgfSk7XG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG4iLCIvKipcbiAqIEZpbGVuYW1lOiBkYmZ1bmMuanNcbiAqL1xuXG5jb25zdCBEQl9OQU1FID0gXCJncm9jZXJ5X2xpc3RcIjtcbmNvbnN0IERCX1ZFUlNJT04gPSAxO1xuLyoqXG4gKiBAcGFyYW0gbmFtZSBzdHJpbmdcbiAqIEBwYXJhbSB2ZXJzaW9uIGludFxuICovXG5jb25zdCBkYiA9IChuYW1lLCB2ZXJzaW9uKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHJlcSA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIHJlcS5vbnVwZ3JhZGVuZWVkZWQgPSBldmVudCA9PiB7XG4gICAgICBsZXQgc3RvcmUgPSBldmVudC50YXJnZXQucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKG5hbWUsIHtcbiAgICAgICAgYXV0b0luY3JlbWVudDogZmFsc2UsXG4gICAgICAgIGtleVBhdGg6IFwiaWRcIlxuICAgICAgfSk7XG4gICAgICBzdG9yZS5jcmVhdGVJbmRleChcImluZHhfaWRcIiwgXCJpZFwiLCB7IHVuaXF1ZTogdHJ1ZSB9KTtcbiAgICB9O1xuICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50LnRhcmdldCk7XG4gIH0pO1xufTtcbi8qKlxuICogQHBhcmFtIHNjaGVtYSBzdHJpbmdcbiAqIEBwYXJhbSBvYmogb2JqZWN0IHwgYXJyYXlcbiAqL1xuY29uc3QgYWRkID0gb2JqID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWR3cml0ZVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgc3RvcmUuYWRkKG9iaik7XG4gICAgICB0cmFucy5vbmNvbXBsZXRlID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50eXBlKTtcbiAgICAgIHRyYW5zLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQudGFyZ2V0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0ga2V5IHN0cmluZ1xuICovXG5jb25zdCByZW1vdmUgPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZHdyaXRlXCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBsZXQgcmVxID0gc3RvcmUuZGVsZXRlKGtleSk7XG4gICAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0ga2V5IHN0cmluZ1xuICovXG5jb25zdCBnZXQgPSBrZXkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZHdyaXRlXCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBsZXQgcmVxID0gc3RvcmUuZ2V0KGtleSk7XG4gICAgICByZXEub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICAgIHJlcS5vbmVycm9yID0gZXZlbnQgPT4gcmVqZWN0KGV2ZW50KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuLyoqXG4gKlxuICovXG5jb25zdCBnZXRBbGwgPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkb25seVwiKTtcbiAgICAgIGxldCBzdG9yZSA9IHRyYW5zLm9iamVjdFN0b3JlKERCX05BTUUpO1xuICAgICAgc3RvcmUuZ2V0QWxsKCkub25zdWNjZXNzID0gZXZlbnQgPT4gcmVzb2x2ZShldmVudC50YXJnZXQucmVzdWx0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhZGQsIHJlbW92ZSwgZ2V0LCBnZXRBbGwgfTtcbiIsIi8qKlxuICogQGZpbGVuYW1lIG5hdmlnYXRpb24uanNcbiAqL1xuY29uc3QgbmF2aWdhdGUgPSAocGF0aCwgZWxtKSA9PiB7XG4gIGxldCBjdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChcIm5hdmlnYXRlXCIsIHtcbiAgICBkZXRhaWw6IHtcbiAgICAgIHBhdGg6IHBhdGgsXG4gICAgICB0YXJnZXQ6IGVsbVxuICAgIH1cbiAgfSk7XG4gIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoY3VzdG9tRXZlbnQpO1xufTtcblxuZXhwb3J0IHsgbmF2aWdhdGUgfTtcbiIsIi8qKlxuICogUHViU3ViLmpzXG4gKiBzdWJzY3JpYmVyc3trZXk6IFtdfVxuICovXG5cbmxldCBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAobWVzc2FnZSwgY2FsbGJhY2spID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJzdWJzY3JpYmVcIiwgbWVzc2FnZSwgY2FsbGJhY2spO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSBmYWxzZSkge1xuICAgIHN1YnNjcmliZXJzW21lc3NhZ2VdID0gW107XG4gIH1cblxuICBzdWJzY3JpYmVyc1ttZXNzYWdlXS5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbmNvbnN0IHB1Ymxpc2ggPSAobWVzc2FnZSwgcGF5bG9hZCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInB1Ymxpc2hcIiwgbWVzc2FnZSwgcGF5bG9hZCk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IHRydWUpIHtcbiAgICBsZXQgc3VicyA9IHN1YnNjcmliZXJzW21lc3NhZ2VdO1xuICAgIGZvciAobGV0IHMgaW4gc3Vicykge1xuICAgICAgc3Vic1tzXShwYXlsb2FkKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4gY29uc29sZS5sb2coXCJUT0RPXCIpO1xuXG5leHBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=