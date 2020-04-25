(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./src/utils/IndxDB.js":
/*!*****************************!*\
  !*** ./src/utils/IndxDB.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IndxDB; });
/**
 * @filename dbwrapper.js
 */

class IndxDB {
  constructor() {
    let dbObj = null
    let openReq = indexedDB.open("grocery_list", 1)
    openReq.onupgradeneeded = event => {
      let db = event.target.result
      if (!db.objectStoreNames.contains("grocery_list")) {
        let store = db.createObjectStore("grocery_list", {
          keyPath: 'id', autoIncrement: false
        })
        store.createIndex('id_indx', 'id')
      }
    }
    openReq.onerror = event => console.log(event)
    openReq.onsuccess = event => this.db = event.result
  }

  get(key){
    console.log(this.dbObj)
    return `Hello ${key}`
  }

  getAll() {}
  put(obj) {}
  add(obj) {}
  remove(key) {}
}
/*
const DB_NAME = 'books'
let openRequest = indexedDB.open(DB_NAME, 1)
openRequest.onupgradeneeded = () => {
  let db = openRequest.result
  if (!db.objectStoreNames.contains(DB_NAME)) {
    db.createObjectStore(DB_NAME, {keyPath: 'id', autoIncrement: false})
  }
}
openRequest.onerror = () => console.log('error', openRequest.error)
openRequest.onsuccess = () => {
  let db = openRequest.result;
  let transaction = db.transaction(DB_NAME, "readwrite")
  let books = transaction.objectStore(DB_NAME)
  let obj = {
    id: Math.floor(Math.random() * 10),
    price: 10,
    name: 'Book',
    created: new Date()
  }
  let request = books.add(obj)
  request.onsuccess = event => console.log('book add', event.result)
  request.onerror = event => console.log('book add', event.error)
  let bookRequest = books.get(6)
  bookRequest.onsuccess = event => console.log('book object', event.target.result)
  bookRequest.onerror = event => console.log('error', event)
  let allBooks = books.getAll()
  // console.log('all books', allBooks)
}
*/


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvSW5keERCLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQixJQUFJO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsb0NBQW9DO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiMTEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW5hbWUgZGJ3cmFwcGVyLmpzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5keERCIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IGRiT2JqID0gbnVsbFxuICAgIGxldCBvcGVuUmVxID0gaW5kZXhlZERCLm9wZW4oXCJncm9jZXJ5X2xpc3RcIiwgMSlcbiAgICBvcGVuUmVxLm9udXBncmFkZW5lZWRlZCA9IGV2ZW50ID0+IHtcbiAgICAgIGxldCBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHRcbiAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhcImdyb2NlcnlfbGlzdFwiKSkge1xuICAgICAgICBsZXQgc3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcImdyb2NlcnlfbGlzdFwiLCB7XG4gICAgICAgICAga2V5UGF0aDogJ2lkJywgYXV0b0luY3JlbWVudDogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgc3RvcmUuY3JlYXRlSW5kZXgoJ2lkX2luZHgnLCAnaWQnKVxuICAgICAgfVxuICAgIH1cbiAgICBvcGVuUmVxLm9uZXJyb3IgPSBldmVudCA9PiBjb25zb2xlLmxvZyhldmVudClcbiAgICBvcGVuUmVxLm9uc3VjY2VzcyA9IGV2ZW50ID0+IHRoaXMuZGIgPSBldmVudC5yZXN1bHRcbiAgfVxuXG4gIGdldChrZXkpe1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZGJPYmopXG4gICAgcmV0dXJuIGBIZWxsbyAke2tleX1gXG4gIH1cblxuICBnZXRBbGwoKSB7fVxuICBwdXQob2JqKSB7fVxuICBhZGQob2JqKSB7fVxuICByZW1vdmUoa2V5KSB7fVxufVxuLypcbmNvbnN0IERCX05BTUUgPSAnYm9va3MnXG5sZXQgb3BlblJlcXVlc3QgPSBpbmRleGVkREIub3BlbihEQl9OQU1FLCAxKVxub3BlblJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKCkgPT4ge1xuICBsZXQgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHRcbiAgaWYgKCFkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKERCX05BTUUpKSB7XG4gICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoREJfTkFNRSwge2tleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IGZhbHNlfSlcbiAgfVxufVxub3BlblJlcXVlc3Qub25lcnJvciA9ICgpID0+IGNvbnNvbGUubG9nKCdlcnJvcicsIG9wZW5SZXF1ZXN0LmVycm9yKVxub3BlblJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xuICBsZXQgZGIgPSBvcGVuUmVxdWVzdC5yZXN1bHQ7XG4gIGxldCB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKERCX05BTUUsIFwicmVhZHdyaXRlXCIpXG4gIGxldCBib29rcyA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKERCX05BTUUpXG4gIGxldCBvYmogPSB7XG4gICAgaWQ6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcbiAgICBwcmljZTogMTAsXG4gICAgbmFtZTogJ0Jvb2snLFxuICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKClcbiAgfVxuICBsZXQgcmVxdWVzdCA9IGJvb2tzLmFkZChvYmopXG4gIHJlcXVlc3Qub25zdWNjZXNzID0gZXZlbnQgPT4gY29uc29sZS5sb2coJ2Jvb2sgYWRkJywgZXZlbnQucmVzdWx0KVxuICByZXF1ZXN0Lm9uZXJyb3IgPSBldmVudCA9PiBjb25zb2xlLmxvZygnYm9vayBhZGQnLCBldmVudC5lcnJvcilcbiAgbGV0IGJvb2tSZXF1ZXN0ID0gYm9va3MuZ2V0KDYpXG4gIGJvb2tSZXF1ZXN0Lm9uc3VjY2VzcyA9IGV2ZW50ID0+IGNvbnNvbGUubG9nKCdib29rIG9iamVjdCcsIGV2ZW50LnRhcmdldC5yZXN1bHQpXG4gIGJvb2tSZXF1ZXN0Lm9uZXJyb3IgPSBldmVudCA9PiBjb25zb2xlLmxvZygnZXJyb3InLCBldmVudClcbiAgbGV0IGFsbEJvb2tzID0gYm9va3MuZ2V0QWxsKClcbiAgLy8gY29uc29sZS5sb2coJ2FsbCBib29rcycsIGFsbEJvb2tzKVxufVxuKi9cbiJdLCJzb3VyY2VSb290IjoiIn0=