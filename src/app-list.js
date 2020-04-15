/**
 * @filename app-list.js
 */
import { fetchItem } from "./lib/storage.js";

console.log("Hello Pussy", fetchItem("list_id") || 0);

const mainElm = document.querySelector("main");
mainElm.innerHTML = `<a href="/app/">Back</a>`;

let link = mainElm.querySelector("a");
link.addEventListener("click", e => {
  e.preventDefault();
  // history.pushState(null, null, "/app/");
  // location.reload();
  location.href = "/app/";
});

window.addEventListener("popstate", e => console.log("app-list", e));
