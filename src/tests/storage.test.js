/**
 * storage.test.js
 */
jest.spyOn(window.localStorage.__proto__, 'setItem');
jest.spyOn(window.localStorage.__proto__, 'getItem');

import { storeItem, fetchItem } from "./../lib/storage.js"

test("returns true when item is stored", () => {
  expect.assertions(1);
  return storeItem('test', {hello: 'Kitty'}).then(len =>
    expect(len).toBe(17))
})

test("return error when item cannot be fetched", () => {
  expect.assertions(1)
  return fetchItem('hello').catch(e =>
    expect(e).toBe('hello not found'))
})

test("return object when item can be fetched", () => {
  let dummy = {hello: 'Kitty'}

  expect.assertions(1)
  return fetchItem('test').then(obj => 
    expect(obj.hello).toBe(dummy.hello))
})
