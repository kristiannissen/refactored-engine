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
div.setAttribute("id", "wrapper");

const selList = document.createElement("selection-list");
selList.onRender(resp => console.log(resp));

div.appendChild(selList);

const render = () => new Promise(resolve => resolve(div.innerHTML));

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUUyQzs7QUFFM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRWUscUVBQU0sRUFBQyIsImZpbGUiOiIyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1pbmRleC5qc1xuICovXG5cbmltcG9ydCB7IGdldEFsbCB9IGZyb20gXCIuL3V0aWxzL2RiZnVuYy5qc1wiO1xuXG5jb25zdCB1aWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl91XCIpIHx8IDA7XG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwid3JhcHBlclwiKTtcblxuY29uc3Qgc2VsTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3Rpb24tbGlzdFwiKTtcbnNlbExpc3Qub25SZW5kZXIocmVzcCA9PiBjb25zb2xlLmxvZyhyZXNwKSk7XG5cbmRpdi5hcHBlbmRDaGlsZChzZWxMaXN0KTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKGRpdi5pbm5lckhUTUwpKTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==