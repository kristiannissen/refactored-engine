/**
 * Filename: app-list.js
 */

import { get } from "./utils/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;

let div = document.createElement("div");
div.innerHTML = `<select-list></select-list>`;

const render = () => new Promise(resolve => resolve(div.innerHTML));

export default render;
