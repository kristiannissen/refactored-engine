/**
 * Filename: app-index.js
 */

import { getAll } from "./utils/dbfunc.js";

const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");

const render = () =>
  new Promise(resolve => {
    return getAll().then(res => {
      let selectList = document.createElement("select-list");
      selectList.setAttribute("data-path", "/app/list/");
      res.forEach(item => {
        selectList.add({ id: item.id, name: item.name });
      });
      div.appendChild(selectList);
      return resolve(div);
    });
  });

export default render;
