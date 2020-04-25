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
      selectList.setAttribute('data-id', listid)
      selectList.addEventListener("select", e => console.log(e));
      div.appendChild(selectList);
      title.setAttribute("title", res.name);
      return resolve(div);
    });
  });

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRTZDOztBQUU3Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLDREQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFWSxxRUFBTSxFQUFDIiwiZmlsZSI6IjMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlbmFtZTogYXBwLWxpc3QuanNcbiAqL1xuXG5pbXBvcnQgeyBnZXQsIGFkZCB9IGZyb20gXCIuL3V0aWxzL2RiZnVuYy5qc1wiO1xuXG5jb25zdCBsaXN0aWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxpc3RpZFwiKSB8fCAwO1xuXG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXBwLXRpdGxlXCIpO1xuXG5jb25zdCByZW5kZXIgPSAoKSA9PlxuICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICByZXR1cm4gZ2V0KGxpc3RpZCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHNlbGVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0LWxpc3RcIik7XG4gICAgICByZXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHNlbGVjdExpc3QuYWRkKG5ldyBPcHRpb24oaXRlbS5uYW1lKSkpO1xuICAgICAgc2VsZWN0TGlzdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnLCBsaXN0aWQpXG4gICAgICBzZWxlY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RcIiwgZSA9PiBjb25zb2xlLmxvZyhlKSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TGlzdCk7XG4gICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCByZXMubmFtZSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZShkaXYpO1xuICAgIH0pO1xuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==