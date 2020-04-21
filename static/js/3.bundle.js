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
Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["get"])(listid).then(r => console.log(r))
const render = () => `<a href="/app/">Go to app</a>`;

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRXNDOztBQUV0QztBQUNBLDBEQUFHO0FBQ0g7O0FBRWUscUVBQU0sRUFBQyIsImZpbGUiOiIzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1saXN0LmpzXG4gKi9cblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSBcIi4vbGliL2RiZnVuYy5qc1wiO1xuXG5jb25zdCBsaXN0aWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpc3RpZFwiKSB8fCAwO1xuZ2V0KGxpc3RpZCkudGhlbihyID0+IGNvbnNvbGUubG9nKHIpKVxuY29uc3QgcmVuZGVyID0gKCkgPT4gYDxhIGhyZWY9XCIvYXBwL1wiPkdvIHRvIGFwcDwvYT5gO1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9