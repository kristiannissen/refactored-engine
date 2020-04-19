(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/app-list.js":
/*!*************************!*\
  !*** ./src/app-list.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/dbfunc.js */ "./src/lib/dbfunc.js");
/**
 * Filename: app-list.js
 */



const listid = localStorage.getItem("listid") || 0;

Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(listid).then(entry => console.log(entry));

const render = () => `<a href="/app/">Go to app</a>`;

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRXNDOztBQUV0Qzs7QUFFQSwwREFBRzs7QUFFSDs7QUFFZSxxRUFBTSxFQUFDIiwiZmlsZSI6IjMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlbmFtZTogYXBwLWxpc3QuanNcbiAqL1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiLi9saWIvZGJmdW5jLmpzXCI7XG5cbmNvbnN0IGxpc3RpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGlzdGlkXCIpIHx8IDA7XG5cbmdldChsaXN0aWQpLnRoZW4oZW50cnkgPT4gY29uc29sZS5sb2coZW50cnkpKTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4gYDxhIGhyZWY9XCIvYXBwL1wiPkdvIHRvIGFwcDwvYT5gO1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9