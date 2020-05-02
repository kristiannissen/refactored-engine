(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/app-index.js":
/*!**************************!*\
  !*** ./src/app-index.js ***!
  \**************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _utils_dbfunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dbfunc */ "./src/utils/dbfunc.js");
/* harmony import */ var _utils_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/navigation */ "./src/utils/navigation.js");
/* harmony import */ var _utils_pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/pubsub */ "./src/utils/pubsub.js");
/**
 * Filename: app-index.js
 */




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
const updateList = () => {
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
 * render the UI
 */
const render = () => {
  Object(_utils_dbfunc__WEBPACK_IMPORTED_MODULE_0__["getAll"])().then(resp => Object(_utils_pubsub__WEBPACK_IMPORTED_MODULE_2__["publish"])("list-change", resp));
  const div = document.createElement("div");
  const key = Math.floor(Math.random() * new Date().getTime());
  div.setAttribute("data-key", key);

  div.append(updateList());
  div.append(floatingButton());
  div.append(form());

  return div;
};



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kYmZ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL25hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3B1YnN1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFNkM7QUFDQztBQUNNO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLElBQUkseURBQUc7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssY0FBYyxrRUFBUTtBQUMzQixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLCtEQUFTO0FBQ1gsNENBQTRDLCtCQUErQjtBQUMzRSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrRUFBUTtBQUNaLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDREQUFNLGdCQUFnQiw2REFBTztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDa0I7Ozs7Ozs7Ozs7Ozs7QUN0RWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVvQzs7Ozs7Ozs7Ozs7OztBQ2hGcEM7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVvQjs7Ozs7Ozs7Ozs7OztBQ2JwQjtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRThCIiwiZmlsZSI6IjIuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlbmFtZTogYXBwLWluZGV4LmpzXG4gKi9cblxuaW1wb3J0IHsgZ2V0QWxsLCBhZGQgfSBmcm9tIFwiLi91dGlscy9kYmZ1bmNcIjtcbmltcG9ydCB7IG5hdmlnYXRlIH0gZnJvbSBcIi4vdXRpbHMvbmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gZnJvbSBcIi4vdXRpbHMvcHVic3ViXCI7XG4vKipcbiAqIGNyZWF0ZSB0aGUgZm9ybS1kaWFsb2cgdG8gYWRkIG5ldyBsaXN0c1xuICovXG5jb25zdCBmb3JtID0gKCkgPT4ge1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm0tZGlhbG9nXCIpO1xuICBmb3JtLmFkZEZpZWxkKHtcbiAgICBuYW1lOiBcIm5hbWVcIixcbiAgICB0eXBlOiBcInRleHRcIixcbiAgICB2YWx1ZTogXCJcIixcbiAgICBwbGFjZWhvbGRlcjogXCJMaXN0IE5hbWVcIlxuICB9KTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCBlID0+IHtcbiAgICBhZGQoe1xuICAgICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSxcbiAgICAgIG5hbWU6IGUuZGV0YWlsLmZvcm1EYXRhLm5hbWUsXG4gICAgICBpdGVtczogW10sXG4gICAgICBzeW5jZWQ6IGZhbHNlXG4gICAgfSkudGhlbihyZXMgPT4gbmF2aWdhdGUoXCIvYXBwL2xpc3QvXCIsIGRpdikpO1xuICB9KTtcbiAgcmV0dXJuIGZvcm07XG59O1xuLypcbiAqIGNyZWF0ZSBmbG9hdGluZyBidXR0b24gdG8gb3BlbiBmb3JtLWRpYWxvZ1xuICovXG5jb25zdCBmbG9hdGluZ0J1dHRvbiA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZsb2F0aW5nLWJ1dHRvblwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICBjb25zdCBmb28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybS1kaWFsb2dcIik7XG4gICAgZm9vLnRvZ2dsZU9wZW4oKTtcbiAgfSk7XG4gIHJldHVybiBidXR0b247XG59O1xuLypcbiAqIHRoZSBtZWF0IGFuZCBwb3RhdG9lc1xuICovXG5jb25zdCB1cGRhdGVMaXN0ID0gKCkgPT4ge1xuICBsZXQgc2VsZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3QtbGlzdFwiKTtcbiAgc3Vic2NyaWJlKFwibGlzdC1jaGFuZ2VcIiwgcGF5bG9hZCA9PiB7XG4gICAgcGF5bG9hZC5mb3JFYWNoKGl0ZW0gPT4gc2VsZWN0TGlzdC5hZGQoeyBpZDogaXRlbS5pZCwgbmFtZTogaXRlbS5uYW1lIH0pKTtcbiAgfSk7XG4gIHNlbGVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdFwiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfbFwiLCBlLmRldGFpbC5pZCk7XG4gICAgbmF2aWdhdGUoXCIvYXBwL2xpc3QvXCIsIGUudGFyZ2V0KTtcbiAgfSk7XG4gIHJldHVybiBzZWxlY3RMaXN0O1xufTtcbi8qXG4gKiByZW5kZXIgdGhlIFVJXG4gKi9cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgZ2V0QWxsKCkudGhlbihyZXNwID0+IHB1Ymxpc2goXCJsaXN0LWNoYW5nZVwiLCByZXNwKSk7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGtleSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgZGl2LnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGtleSk7XG5cbiAgZGl2LmFwcGVuZCh1cGRhdGVMaXN0KCkpO1xuICBkaXYuYXBwZW5kKGZsb2F0aW5nQnV0dG9uKCkpO1xuICBkaXYuYXBwZW5kKGZvcm0oKSk7XG5cbiAgcmV0dXJuIGRpdjtcbn07XG5leHBvcnQgeyByZW5kZXIgfTtcbiIsIi8qKlxuICogRmlsZW5hbWU6IGRiZnVuYy5qc1xuICovXG5cbmNvbnN0IERCX05BTUUgPSBcImdyb2NlcnlfbGlzdFwiO1xuY29uc3QgREJfVkVSU0lPTiA9IDE7XG4vKipcbiAqIEBwYXJhbSBuYW1lIHN0cmluZ1xuICogQHBhcmFtIHZlcnNpb24gaW50XG4gKi9cbmNvbnN0IGRiID0gKG5hbWUsIHZlcnNpb24pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgcmVxID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XG4gICAgcmVxLm9udXBncmFkZW5lZWRlZCA9IGV2ZW50ID0+IHtcbiAgICAgIGxldCBzdG9yZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobmFtZSwge1xuICAgICAgICBhdXRvSW5jcmVtZW50OiBmYWxzZSxcbiAgICAgICAga2V5UGF0aDogXCJpZFwiXG4gICAgICB9KTtcbiAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KFwiaW5keF9pZFwiLCBcImlkXCIsIHsgdW5pcXVlOiB0cnVlIH0pO1xuICAgIH07XG4gICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQudGFyZ2V0KTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0gc2NoZW1hIHN0cmluZ1xuICogQHBhcmFtIG9iaiBvYmplY3QgfCBhcnJheVxuICovXG5jb25zdCBhZGQgPSBvYmogPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZHdyaXRlXCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBzdG9yZS5hZGQob2JqKTtcbiAgICAgIHRyYW5zLm9uY29tcGxldGUgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnR5cGUpO1xuICAgICAgdHJhbnMub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IHJlbW92ZSA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIGxldCByZXEgPSBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IGdldCA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIGxldCByZXEgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqXG4gKi9cbmNvbnN0IGdldEFsbCA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWRvbmx5XCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBzdG9yZS5nZXRBbGwoKS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFkZCwgcmVtb3ZlLCBnZXQsIGdldEFsbCB9O1xuIiwiLyoqXG4gKiBAZmlsZW5hbWUgbmF2aWdhdGlvbi5qc1xuICovXG5jb25zdCBuYXZpZ2F0ZSA9IChwYXRoLCBlbG0pID0+IHtcbiAgbGV0IGN1c3RvbUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibmF2aWdhdGVcIiwge1xuICAgIGRldGFpbDoge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIHRhcmdldDogZWxtXG4gICAgfVxuICB9KTtcbiAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21FdmVudCk7XG59O1xuXG5leHBvcnQgeyBuYXZpZ2F0ZSB9O1xuIiwiLyoqXG4gKiBQdWJTdWIuanNcbiAqIHN1YnNjcmliZXJze2tleTogW119XG4gKi9cblxubGV0IHN1YnNjcmliZXJzID0ge307XG5cbmNvbnN0IHN1YnNjcmliZSA9IChtZXNzYWdlLCBjYWxsYmFjaykgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInN1YnNjcmliZVwiLCBtZXNzYWdlLCBjYWxsYmFjayk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IGZhbHNlKSB7XG4gICAgc3Vic2NyaWJlcnNbbWVzc2FnZV0gPSBbXTtcbiAgfVxuXG4gIHN1YnNjcmliZXJzW21lc3NhZ2VdLnB1c2goY2FsbGJhY2spO1xufTtcblxuY29uc3QgcHVibGlzaCA9IChtZXNzYWdlLCBwYXlsb2FkKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwicHVibGlzaFwiLCBtZXNzYWdlLCBwYXlsb2FkKTtcbiAgaWYgKE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5pbmNsdWRlcyhtZXNzYWdlKSA9PT0gdHJ1ZSkge1xuICAgIGxldCBzdWJzID0gc3Vic2NyaWJlcnNbbWVzc2FnZV07XG4gICAgZm9yIChsZXQgcyBpbiBzdWJzKSB7XG4gICAgICBzdWJzW3NdKHBheWxvYWQpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdW5zdWJzY3JpYmUgPSAoKSA9PiBjb25zb2xlLmxvZyhcIlRPRE9cIik7XG5cbmV4cG9ydCB7IHN1YnNjcmliZSwgcHVibGlzaCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==