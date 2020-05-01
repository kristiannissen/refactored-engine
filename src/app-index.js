/**
 * Filename: app-index.js
 */

import { getAll, add } from "./utils/dbfunc";
import { navigate } from "./utils/navigation";
import { publish, subscribe } from "./utils/pubsub";

const div = document.createElement("div");
const key = Math.floor(Math.random() * new Date().getTime());
div.setAttribute("data-key", key);
/**
 * create the form-dialog to add new lists
 */
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
/*
 * create floating button to open form-dialog
 */
const floatingButton = () => {
  const button = document.createElement("floating-button");
  button.addEventListener("click", e => {
    const foo = document.querySelector("form-dialog");
    foo.toggleOpen();
  });
  return button;
};
/*
 * the meat and potatoes
 */
const updateList = elm => {
  let selectList = document.createElement("select-list");
  subscribe("list-change", payload => {
    payload.forEach(item => selectList.add({ id: item.id, name: item.name }));
  });
  selectList.addEventListener("select", e => {
    e.preventDefault();
    localStorage.setItem("_l", e.detail.id);
    navigate("/app/list/", e.target);
  });
  return selectList;
};
/*
 * Initial state
 */
getAll().then(resp => publish("list-change", resp));
/*
 * render the UI
 */
const render = () =>
  new Promise(resolve => {
    div.append(updateList(div));
    div.append(floatingButton());
    div.append(form());

    resolve(div);
  });
export default render;
