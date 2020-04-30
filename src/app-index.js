/**
 * Filename: app-index.js
 */

import { getAll, add } from "./utils/dbfunc.js";
import { navigate } from "./utils/navigation.js";

const uid = localStorage.getItem("_u") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);

const title = document.querySelector("app-title");

const form = () => {
  const form = document.createElement("form-dialog");
  form.addField({
    name: "name",
    type: "text",
    value: "",
    placeholder: "List Name"
  });

  form.addEventListener("close", e => {
    add({
      id: Math.floor(Math.random() * new Date().getTime()),
      name: e.detail.formData.name,
      items: [],
      synced: false
    }).then(res => navigate("/app/list/", div));
  });
  return form;
};

const floatingButton = () => {
  const button = document.createElement("floating-button");
  button.addEventListener("click", e => {
    const foo = document.querySelector("form-dialog");
    foo.toggleOpen();
  });
  return button;
};

const setState = (state) => state

const render = () =>
  new Promise(resolve =>
    getAll().then(result => {
      title.setAttribute("title", "Index");
      div.innerHTML = "";
      let selectList = document.createElement("select-list");
      selectList.setAttribute('data-bind', 'list')
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
      div.appendChild(floatingButton());
      // Append form dialog
      div.appendChild(form());
      return resolve(div);
    })
  );
export default render;
