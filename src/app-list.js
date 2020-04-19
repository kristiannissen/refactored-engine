/**
 * Filename: app-list.js
 */

import { get } from "./lib/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;

get(listid).then(entry => console.log(entry));

const render = () => `<a href="/app/">Go to app</a>`;

export default render;
