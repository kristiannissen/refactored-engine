(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/app-list.js":
/*!*************************!*\
  !*** ./src/app-list.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dbfunc.js */ "./src/utils/dbfunc.js");
/**
 * Filename: app-list.js
 */



const listid = localStorage.getItem("listid") || 0;

const div = document.createElement("div");
const title = document.querySelector("app-title");

const render = () =>
  new Promise(resolve => {
    return Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(listid).then(res => {
      let selectList = document.createElement("select-list");
      res.items.forEach(item => selectList.add(new Option(item.name)));
      div.appendChild(selectList);
      title.setAttribute("title", res.name);
      return resolve(div);
    });
  });

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRTZDOztBQUU3Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLDREQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVZLHFFQUFNLEVBQUMiLCJmaWxlIjoiMy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGVuYW1lOiBhcHAtbGlzdC5qc1xuICovXG5cbmltcG9ydCB7IGdldCwgYWRkIH0gZnJvbSBcIi4vdXRpbHMvZGJmdW5jLmpzXCI7XG5cbmNvbnN0IGxpc3RpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGlzdGlkXCIpIHx8IDA7XG5cbmNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhcHAtdGl0bGVcIik7XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+XG4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIHJldHVybiBnZXQobGlzdGlkKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgc2VsZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3QtbGlzdFwiKTtcbiAgICAgIHJlcy5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gc2VsZWN0TGlzdC5hZGQobmV3IE9wdGlvbihpdGVtLm5hbWUpKSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TGlzdCk7XG4gICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCByZXMubmFtZSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZShkaXYpO1xuICAgIH0pO1xuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==