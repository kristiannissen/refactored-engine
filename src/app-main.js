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
import SelectionList from "./webcomponents/SelectionList.js";
window.customElements.define("selection-list", SelectionList);

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
  import(`./${route.module}`).then(mod =>
    mod.default().then(html => (mountElement.innerHTML = html))
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

  addListener(document.querySelector("main"), "a", (e, elm) => {
    let url = new URL(elm.href);
    history.pushState(
      { userid: localStorage.getItem("_u") || 0 },
      url.pathname,
      location.origin + url.pathname
    );
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
