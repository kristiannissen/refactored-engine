/**
 * Filename: app-list.js
 */

import { get, add } from "./utils/dbfunc.js";

const listid = localStorage.getItem("listid") || 0;

const div = document.createElement("div");
const title = document.querySelector("app-title");

const render = () =>
  new Promise(resolve => {
    return get(listid).then(res => {
      let selectList = document.createElement("select-list");
      res.items.forEach(item =>
        selectList.add({ id: item.id, name: item.name })
      );
      div.appendChild(selectList);
      title.setAttribute("title", res.name);
      return resolve(div);
    });
  });

export default render;
