/**
 * @filename dbwrapper.js
 */
let db, request;
const DB_VERS = 1;
const DB_NAME = "grocery_list";

request = indexedDB.open(DB_NAME, DB_VERS);
request.onerror = event => console.log(event);
request.onsuccess = event => console.log(event);
