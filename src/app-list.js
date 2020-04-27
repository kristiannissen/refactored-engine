/**
 * Filename: app-list.js
 */

import { get, add } from "./utils/dbfunc.js";

const id = localStorage.getItem("_l") || 0;

const div = document.createElement("div");
const key = Math.floor(Math.random() * (new Date()).getTime())
div.setAttribute('data-key', key)

const title = document.querySelector("app-title");

const render = () => new Promise(resolve => {
  div.innerHTML = ''
  return get(id).then(result => {
    title.setAttribute('title', result.name)
    let selectList = document.createElement('select-list')
    result.items.forEach(item => {
      selectList.add({id: item.id, name: item.name})
    })
    div.appendChild(selectList)
    return resolve(div)
  })
})
export default render;
