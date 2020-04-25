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
      res.items.forEach(item => selectList.add(new Option(item.name)));
      selectList.setAttribute('data-id', listid)
      selectList.addEventListener("select", e => console.log(e));
      div.appendChild(selectList);
      title.setAttribute("title", res.name);
      return resolve(div);
    });
  });

export default render;
