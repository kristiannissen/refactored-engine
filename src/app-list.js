/**
 * @filename app-list.js
 */
console.log("Hello Pussy", history.state);

const mainElm = document.querySelector("main");
mainElm.innerHTML = `<a href="/app/">Back</a>`;

let link = mainElm.querySelector("a");
link.addEventListener("click", e => {
  e.preventDefault();
  history.pushState(null, null, "/app/");
  location.reload();
});
