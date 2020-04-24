/**
 * Filename: app-list.js
 */

import { get } from "./utils/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;

let div = document.createElement("div");
div.innerHTML = `Hello Pussy`;

const render = () => new Promise(resolve => {
  return resolve(div)
});

export default render;
