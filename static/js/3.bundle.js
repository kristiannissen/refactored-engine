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

let div = document.createElement("div");
let selList = document.createElement("selection-list");
selList.onRender(data => console.log(data));
selList.selections = ["hello", "kitty"];

div.appendChild(selList);

const render = () => new Promise(resolve => resolve(div.innerHTML));

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRXdDOztBQUV4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFZSxxRUFBTSxFQUFDIiwiZmlsZSI6IjMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlbmFtZTogYXBwLWxpc3QuanNcbiAqL1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tIFwiLi91dGlscy9kYmZ1bmMuanNcIjtcblxuY29uc3QgbGlzdGlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsaXN0aWRcIikgfHwgMDtcblxubGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5sZXQgc2VsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3Rpb24tbGlzdFwiKTtcbnNlbExpc3Qub25SZW5kZXIoZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSk7XG5zZWxMaXN0LnNlbGVjdGlvbnMgPSBbXCJoZWxsb1wiLCBcImtpdHR5XCJdO1xuXG5kaXYuYXBwZW5kQ2hpbGQoc2VsTGlzdCk7XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gcmVzb2x2ZShkaXYuaW5uZXJIVE1MKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=