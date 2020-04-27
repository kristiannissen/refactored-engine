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
/**
 * Filename: app-index.js
 */



const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * (new Date()).getTime())
div.setAttribute('data-key', key)

const title = document.querySelector("app-title");

const render = () => new Promise(resolve => Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["getAll"])().then(result => {
  title.setAttribute('title', 'Index')
  div.innerHTML = ''
  let selectList = document.createElement('select-list')
  selectList.setAttribute('data-path', '/app/list/')
  selectList.addEventListener('select', e => {
    e.preventDefault()
    localStorage.setItem('_l', e.detail.id)
  })
  result.forEach(item => {
    selectList.add({id: item.id, name: item.name})
  })
  div.appendChild(selectList)
  return resolve(div)
}))
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




/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9kYmZ1bmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRTJDOztBQUUzQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNENBQTRDLCtEQUFNO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRCxHQUFHO0FBQ0g7QUFDQTtBQUNBLENBQUM7QUFDYyxxRUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDN0J0QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFb0MiLCJmaWxlIjoiMi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGVuYW1lOiBhcHAtaW5kZXguanNcbiAqL1xuXG5pbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiLi91dGlscy9kYmZ1bmMuanNcIjtcblxuY29uc3QgdWlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfdVwiKSB8fCAwO1xuXG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3Qga2V5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG5ldyBEYXRlKCkpLmdldFRpbWUoKSlcbmRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jywga2V5KVxuXG5jb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhcHAtdGl0bGVcIik7XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gZ2V0QWxsKCkudGhlbihyZXN1bHQgPT4ge1xuICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0luZGV4JylcbiAgZGl2LmlubmVySFRNTCA9ICcnXG4gIGxldCBzZWxlY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0LWxpc3QnKVxuICBzZWxlY3RMaXN0LnNldEF0dHJpYnV0ZSgnZGF0YS1wYXRoJywgJy9hcHAvbGlzdC8nKVxuICBzZWxlY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdCcsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdfbCcsIGUuZGV0YWlsLmlkKVxuICB9KVxuICByZXN1bHQuZm9yRWFjaChpdGVtID0+IHtcbiAgICBzZWxlY3RMaXN0LmFkZCh7aWQ6IGl0ZW0uaWQsIG5hbWU6IGl0ZW0ubmFtZX0pXG4gIH0pXG4gIGRpdi5hcHBlbmRDaGlsZChzZWxlY3RMaXN0KVxuICByZXR1cm4gcmVzb2x2ZShkaXYpXG59KSlcbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcbiIsIi8qKlxuICogRmlsZW5hbWU6IGRiZnVuYy5qc1xuICovXG5cbmNvbnN0IERCX05BTUUgPSBcImdyb2NlcnlfbGlzdFwiO1xuY29uc3QgREJfVkVSU0lPTiA9IDE7XG4vKipcbiAqIEBwYXJhbSBuYW1lIHN0cmluZ1xuICogQHBhcmFtIHZlcnNpb24gaW50XG4gKi9cbmNvbnN0IGRiID0gKG5hbWUsIHZlcnNpb24pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgcmVxID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XG4gICAgcmVxLm9udXBncmFkZW5lZWRlZCA9IGV2ZW50ID0+IHtcbiAgICAgIGxldCBzdG9yZSA9IGV2ZW50LnRhcmdldC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUobmFtZSwge1xuICAgICAgICBhdXRvSW5jcmVtZW50OiBmYWxzZSxcbiAgICAgICAga2V5UGF0aDogXCJpZFwiXG4gICAgICB9KTtcbiAgICAgIHN0b3JlLmNyZWF0ZUluZGV4KFwiaW5keF9pZFwiLCBcImlkXCIsIHsgdW5pcXVlOiB0cnVlIH0pO1xuICAgIH07XG4gICAgcmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHJlc29sdmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQudGFyZ2V0KTtcbiAgfSk7XG59O1xuLyoqXG4gKiBAcGFyYW0gc2NoZW1hIHN0cmluZ1xuICogQHBhcmFtIG9iaiBvYmplY3QgfCBhcnJheVxuICovXG5jb25zdCBhZGQgPSBvYmogPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiKERCX05BTUUsIERCX1ZFUlNJT04pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCB0cmFucyA9IHJlcy50cmFuc2FjdGlvbihbREJfTkFNRV0sIFwicmVhZHdyaXRlXCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBzdG9yZS5hZGQob2JqKTtcbiAgICAgIHRyYW5zLm9uY29tcGxldGUgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnR5cGUpO1xuICAgICAgdHJhbnMub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChldmVudC50YXJnZXQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IHJlbW92ZSA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIGxldCByZXEgPSBzdG9yZS5kZWxldGUoa2V5KTtcbiAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqIEBwYXJhbSBrZXkgc3RyaW5nXG4gKi9cbmNvbnN0IGdldCA9IGtleSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIoREJfTkFNRSwgREJfVkVSU0lPTikudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHRyYW5zID0gcmVzLnRyYW5zYWN0aW9uKFtEQl9OQU1FXSwgXCJyZWFkd3JpdGVcIik7XG4gICAgICBsZXQgc3RvcmUgPSB0cmFucy5vYmplY3RTdG9yZShEQl9OQU1FKTtcbiAgICAgIGxldCByZXEgPSBzdG9yZS5nZXQoa2V5KTtcbiAgICAgIHJlcS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgICAgcmVxLm9uZXJyb3IgPSBldmVudCA9PiByZWplY3QoZXZlbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4vKipcbiAqXG4gKi9cbmNvbnN0IGdldEFsbCA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYihEQl9OQU1FLCBEQl9WRVJTSU9OKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdHJhbnMgPSByZXMudHJhbnNhY3Rpb24oW0RCX05BTUVdLCBcInJlYWRvbmx5XCIpO1xuICAgICAgbGV0IHN0b3JlID0gdHJhbnMub2JqZWN0U3RvcmUoREJfTkFNRSk7XG4gICAgICBzdG9yZS5nZXRBbGwoKS5vbnN1Y2Nlc3MgPSBldmVudCA9PiByZXNvbHZlKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7IGFkZCwgcmVtb3ZlLCBnZXQsIGdldEFsbCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==