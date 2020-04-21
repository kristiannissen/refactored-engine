/**
 * Filename: app-list.js
 */

import { get } from "./utils/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;

let div = document.createElement("div");
let selList = document.createElement("selection-list");
selList.onRender(data => console.log(data));
selList.selections = ["hello", "kitty"];

div.appendChild(selList);

const render = () => new Promise(resolve => resolve(div.innerHTML));

export default render;
