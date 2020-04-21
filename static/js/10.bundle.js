(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./src/utils/dbwrapper.js":
/*!********************************!*\
  !*** ./src/utils/dbwrapper.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @filename dbwrapper.js
 */
let db, request;
const DB_VERS = 1;
const DB_NAME = "grocery_list";

request = indexedDB.open(DB_NAME, DB_VERS);
request.onerror = event => console.log(event);
request.onsuccess = event => console.log(event);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvZGJ3cmFwcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW5hbWUgZGJ3cmFwcGVyLmpzXG4gKi9cbmxldCBkYiwgcmVxdWVzdDtcbmNvbnN0IERCX1ZFUlMgPSAxO1xuY29uc3QgREJfTkFNRSA9IFwiZ3JvY2VyeV9saXN0XCI7XG5cbnJlcXVlc3QgPSBpbmRleGVkREIub3BlbihEQl9OQU1FLCBEQl9WRVJTKTtcbnJlcXVlc3Qub25lcnJvciA9IGV2ZW50ID0+IGNvbnNvbGUubG9nKGV2ZW50KTtcbnJlcXVlc3Qub25zdWNjZXNzID0gZXZlbnQgPT4gY29uc29sZS5sb2coZXZlbnQpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==