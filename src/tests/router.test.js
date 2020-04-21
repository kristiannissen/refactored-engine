/**
 * @file router.test.js
 */

import Router from "./../utils/router.js";

const router = new Router("[data-navigation]");

const { location } = window;

beforeAll(() => {
  delete window.location;
  window.location = {
    href: ""
  };
});

afterAll(() => (window.location = location));

test("returns Hello Kitty when pathname is /hello-kitty", () => {
  window.location.href = "http://localhost:8080/hello-kitty/";

  expect(
    router.get("/hello-kitty", path => {
      return "Hello Kitty";
    })
  ).toBe("Hello Kitty");
});
