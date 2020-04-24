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

const render = () =>
  new Promise(resolve => {
    return Object(_utils_dbfunc_js__WEBPACK_IMPORTED_MODULE_0__["getAll"])().then(res => {
      let selectList = document.createElement("select-list");
      res.forEach(item => {
        let opt = new Option(item.name, item.id);
        selectList.add(opt);
      });
      div.appendChild(selectList);
      return resolve(div);
    });
  });

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUUyQzs7QUFFM0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVywrREFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRVkscUVBQU0sRUFBQyIsImZpbGUiOiIyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlsZW5hbWU6IGFwcC1pbmRleC5qc1xuICovXG5cbmltcG9ydCB7IGdldEFsbCB9IGZyb20gXCIuL3V0aWxzL2RiZnVuYy5qc1wiO1xuXG5jb25zdCB1aWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl91XCIpIHx8IDA7XG5cbmNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5kaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ3cmFwcGVyXCIpO1xuXG5jb25zdCByZW5kZXIgPSAoKSA9PlxuICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICByZXR1cm4gZ2V0QWxsKCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHNlbGVjdExpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0LWxpc3RcIik7XG4gICAgICByZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgbGV0IG9wdCA9IG5ldyBPcHRpb24oaXRlbS5uYW1lLCBpdGVtLmlkKTtcbiAgICAgICAgc2VsZWN0TGlzdC5hZGQob3B0KTtcbiAgICAgIH0pO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdExpc3QpO1xuICAgICAgcmV0dXJuIHJlc29sdmUoZGl2KTtcbiAgICB9KTtcbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=