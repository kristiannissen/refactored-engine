/**
 * @file app-main.js
 */
import AppList from "./webcomponents/AppList.js";
window.customElements.define("app-list", AppList);
import AppListForm from "./webcomponents/AppListForm.js";
window.customElements.define("app-list-form", AppListForm);
import AppListItem from "./webcomponents/AppListItem.js";
window.customElements.define("app-list-item", AppListItem);
import AppItemList from "./webcomponents/AppItemList.js";
window.customElements.define("app-item-list", AppItemList);
import SelectList from "./webcomponents/SelectList.js";

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
  // console.log("loading", route);
  mountElement.innerHTML = ''
  import(`./${route.module}`).then(mod =>
    mod.default().then(html => mountElement.appendChild(html))
  );
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

  addListener(document.querySelector("main"), "option", (e, elm) => {
    let url = new URL(location.origin + "/app/list/");
    history.pushState({}, url.pathname, location.origin + url.pathname);
    loadpath(url.pathname, mountElement);
    e.preventDefault();
  });
});

window.onpopstate = () => {
  loadpath(window.location.pathname, mountElement);
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceworker.js", { scope: "/app/" });
}
