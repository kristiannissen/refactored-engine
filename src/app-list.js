/**
 * Filename: app-list.js
 */

import { get, add } from "./utils/dbfunc.js";
import { navigate } from "./utils/navigation.js";

const title = document.querySelector("app-title");

const render = () =>
  new Promise(resolve => {
    const div = document.createElement("div");
    const id = localStorage.getItem("_l") || 0;
    const key = Math.floor(Math.random() * new Date().getTime());
    div.setAttribute("data-key", key);
    return get(id).then(result => {
      title.setAttribute("title", result.name);
      let selectList = document.createElement("select-list");
      selectList.addEventListener("select", e => {
        e.preventDefault();
        navigate("/app/", e.target);
      });
      result.items.forEach((item, indx) =>
        selectList.add({ id: indx, name: item.name })
      );
      div.appendChild(selectList);
      return resolve(div);
    });
  });
export default render;
