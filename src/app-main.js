/**
 * @file app-main.js
 */

const routes = [
    {
      uri: "/app/",
      module: "app-index"
    },
    {
      uri: "/app/list/",
      module: "app-list"
    },
    {
      uri: "/app/list/share/",
      module: "app-list-share"
    }
  ],
  mountElement = document.querySelector("main");

const loadpath = (path, elm) => {
  let route = routes.find(r => r.uri === path);
  console.log("loading", route);
  import(/* webpackChunkName: `${route.module}` */ `./${route.module}`).then(
    mod => (mountElement.innerHTML = mod.default(elm))
  );
};

const addListener = (rootElm, sel, func) => {
  rootElm.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === sel) {
      func(e);
    }
  });
};

document.addEventListener("DOMContentLoaded", e => {
  const path = location.pathname;

  loadpath(path, mountElement);

  addListener(document.querySelector("main"), "a", e => {
    history.pushState(
      {},
      e.target.pathname,
      location.origin + e.target.pathname
    );
    loadpath(e.target.pathname, mountElement);
    e.preventDefault();
  });
});

window.onpopstate = () => {
  loadpath(window.location.pathname, mountElement);
};
