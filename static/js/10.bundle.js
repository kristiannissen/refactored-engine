(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvbmF2aWdhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVvQiIsImZpbGUiOiIxMC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlbmFtZSBuYXZpZ2F0aW9uLmpzXG4gKi9cbmNvbnN0IG5hdmlnYXRlID0gKHBhdGgsIGVsbSkgPT4ge1xuICBsZXQgY3VzdG9tRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJuYXZpZ2F0ZVwiLCB7XG4gICAgZGV0YWlsOiB7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgdGFyZ2V0OiBlbG1cbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGN1c3RvbUV2ZW50KTtcbn07XG5cbmV4cG9ydCB7IG5hdmlnYXRlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9