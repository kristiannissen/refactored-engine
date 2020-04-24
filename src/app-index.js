/**
 * Filename: app-index.js
 */

import { getAll } from "./utils/dbfunc.js";

const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
div.setAttribute("id", "wrapper");

const render = () =>
  new Promise(resolve => {
    return getAll().then(res => {
      let selectList = document.createElement("select-list");
      res.forEach(item => {
        let opt = new Option(item.name, item.id);
        selectList.add(opt);
      });
      div.appendChild(selectList);
      return resolve(div);
    });
  });

export default render;
