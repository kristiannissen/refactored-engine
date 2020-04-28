/**
 * Filename: app-index.js
 */

import { getAll } from "./utils/dbfunc.js";

const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);

const title = document.querySelector("app-title");

const render = () =>
  new Promise(resolve =>
    getAll().then(result => {
      title.setAttribute("title", "Index");
      div.innerHTML = "";
      let selectList = document.createElement("select-list");
      selectList.setAttribute("data-path", "/app/list/");
      selectList.addEventListener("select", e => {
        e.preventDefault();
        localStorage.setItem("_l", e.detail.id);
      });
      result.forEach(item => {
        selectList.add({ id: item.id, name: item.name });
      });
      div.appendChild(selectList);
      return resolve(div);
    })
  );
export default render;
