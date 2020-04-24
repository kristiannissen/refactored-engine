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

      selectList.addEventListener("select", e => console.log(e));

      div.appendChild(selectList);
      return resolve(div);
    });
  });

/* harmony default export */ __webpack_exports__["default"] = (render);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLWluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUUyQzs7QUFFM0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVywrREFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVZLHFFQUFNLEVBQUMiLCJmaWxlIjoiMi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZpbGVuYW1lOiBhcHAtaW5kZXguanNcbiAqL1xuXG5pbXBvcnQgeyBnZXRBbGwgfSBmcm9tIFwiLi91dGlscy9kYmZ1bmMuanNcIjtcblxuY29uc3QgdWlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfdVwiKSB8fCAwO1xuXG5jb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwid3JhcHBlclwiKTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgcmV0dXJuIGdldEFsbCgpLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBzZWxlY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdC1saXN0XCIpO1xuICAgICAgcmVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBvcHQgPSBuZXcgT3B0aW9uKGl0ZW0ubmFtZSwgaXRlbS5pZCk7XG4gICAgICAgIHNlbGVjdExpc3QuYWRkKG9wdCk7XG4gICAgICB9KTtcblxuICAgICAgc2VsZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0XCIsIGUgPT4gY29uc29sZS5sb2coZSkpO1xuXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0TGlzdCk7XG4gICAgICByZXR1cm4gcmVzb2x2ZShkaXYpO1xuICAgIH0pO1xuICB9KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==