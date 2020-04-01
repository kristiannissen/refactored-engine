/**
 * dbfunc.test.js
 * Async write/read to indexedDB
 */

require("fake-indexeddb/auto");

import { add, remove, get, getAll } from "./../lib/dbfunc.js";

test("resolves when object is stored", () => {
  return expect(
    add({
      name: "Kitty",
      id: Math.floor(Math.random() * Date.now())
    })
  ).resolves.toMatch("complete");
});
/*
test("resolves when array is stored", () => {
  return expect(
    add([
      { name: "Hello", id: Math.floor(Math.random() * Date.now()) },
      { name: "Kitty", id: Math.floor(Math.random() * Date.now()) }
    ])
  ).resolves.toMatch("complete");
});
*/
test("resolves object with key = key", () => {
  return expect(get(1)).resolves.toMatchObject({ name: "Kitty" });
});

test("resolves with error when key is not found", () => {
  return expect(get(42)).resolves.toBeUndefined();
});

test("resolves when key is deleted", () => {
  return expect(remove(1)).resolves.toBeUndefined();
});

test("resolves when getall is called", () => {
  return expect(getAll()).resolves.toBe(true);
});
