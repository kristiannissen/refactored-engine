/**
 * Filename: app-index.js
 */

import { getAll } from "./utils/dbfunc.js";
import { navigate } from "./utils/navigation.js";

const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);

const title = document.querySelector("app-title");
const formDialog = document.querySelector("form-dialog");
// TODO: Could be extracted and be a component
const floatingButton = document.createElement("button");
floatingButton.innerHTML = `Add`;
floatingButton.addEventListener("click", e => {
  e.preventDefault();
  formDialog.toggleOpen();
});

const render = () =>
  new Promise(resolve =>
    getAll().then(result => {
      title.setAttribute("title", "Index");
      div.innerHTML = "";
      let selectList = document.createElement("select-list");
      selectList.addEventListener("select", e => {
        e.preventDefault();
        localStorage.setItem("_l", e.detail.id);
        navigate("/app/list/", e.target);
      });
      result.forEach(item => {
        selectList.add({ id: item.id, name: item.name });
      });
      div.appendChild(selectList);
      // Append floating button
      div.appendChild(floatingButton);
      return resolve(div);
    })
  );
export default render;
