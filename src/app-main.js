/**
 * @file app-main.js
 */
import AppTitle from "./webcomponents/AppTitle";
import SelectList from "./webcomponents/SelectList";
import FormDialog from "./webcomponents/FormDialog";
import FloatingButton from "./webcomponents/FloatingButton";

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

const loadpath = path => {
  let route = routes.find(r => r.uri === path);
  import(`./${route.module}`).then(node => {
    mountElement.innerHTML = "";
    mountElement.append(node.render());
  });
};

const addListener = (rootElm, sel, func) => {
  rootElm.addEventListener("click", e => {
    let node = e.composedPath().find(n => n.nodeName === sel.toUpperCase());
    if (node !== undefined) {
      //console.log(e, node)
      func(e, node);
    }
  });
};

document.addEventListener("DOMContentLoaded", e => {
  const path = location.pathname;

  loadpath(path, mountElement);

  document.addEventListener("navigate", e => {
    let url = new URL(location.origin + e.detail.path);
    history.pushState({}, url.pathname, location.origin + url.pathname);
    loadpath(url.pathname, mountElement);
    e.preventDefault();
  });
});

window.onpopstate = () => {
  loadpath(window.location.pathname);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceworker.js", { scope: "/app/" });
}
