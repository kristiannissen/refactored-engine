/**
 * Filename: app-index.js
 */

const uid = localStorage.getItem("_u") || 0;

const appTitle = document.querySelector("app-title");
appTitle.setAttribute("title", "Hello Champ");

const render = () => `<app-list userid="${uid}"></app-list>`;
export default render;
