/**
 * Filename: app-index.js
 */

import { getAll } from "./utils/dbfunc.js";

const uid = localStorage.getItem("_u") || 0;
const div = document.createElement("div");
div.setAttribute("id", "wrapper");

const selList = document.createElement("selection-list");
selList.onRender(resp => console.log(resp));

div.appendChild(selList);

const render = () => new Promise(resolve => resolve(div.innerHTML));

export default render;
