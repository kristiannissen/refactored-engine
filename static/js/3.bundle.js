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
div.innerHTML = `<select-list></select-list>`;

const render = () => new Promise(resolve => resolve(div.innerHTML));

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRXdDOztBQUV4Qzs7QUFFQTtBQUNBOztBQUVBOztBQUVlLHFFQUFNLEVBQUMiLCJmaWxlIjoiMy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGVuYW1lOiBhcHAtbGlzdC5qc1xuICovXG5cbmltcG9ydCB7IGdldCB9IGZyb20gXCIuL3V0aWxzL2RiZnVuYy5qc1wiO1xuXG5jb25zdCBsaXN0aWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpc3RpZFwiKSB8fCAwO1xuXG5sZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmRpdi5pbm5lckhUTUwgPSBgPHNlbGVjdC1saXN0Pjwvc2VsZWN0LWxpc3Q+YDtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiByZXNvbHZlKGRpdi5pbm5lckhUTUwpKTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==