/**
 * Filename: app-list.js
 */

import { get } from "./utils/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;
get(listid).then(r => console.log(r))
const render = () => `<a href="/app/">Go to app</a>`;

export default render;
