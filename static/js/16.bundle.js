(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./src/webcomponents/AppListItem.js":
/*!******************************************!*\
  !*** ./src/webcomponents/AppListItem.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *
 */


const template = document.createElement("template");
template.innerHTML = `<style>
    .list-item {
      padding: 0 10px;
    }
  </style><div class="list-item"></div>`;

class AppListItem extends HTMLElement {
  static get observedAttributes() {
    return ["id", "name"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    let elm = this._shadowRoot.querySelector("div");
    elm.innerHTML = `<a href="/app/list/" data-item-id="${this["id"]}">${
      this["name"]
    }</a>`;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppListItem);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBMaXN0SXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELFdBQVc7QUFDckU7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFZSwwRUFBVyxFQUFDIiwiZmlsZSI6IjE2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYDxzdHlsZT5cbiAgICAubGlzdC1pdGVtIHtcbiAgICAgIHBhZGRpbmc6IDAgMTBweDtcbiAgICB9XG4gIDwvc3R5bGU+PGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPjwvZGl2PmA7XG5cbmNsYXNzIEFwcExpc3RJdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wiaWRcIiwgXCJuYW1lXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgZWxtID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiZGl2XCIpO1xuICAgIGVsbS5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIi9hcHAvbGlzdC9cIiBkYXRhLWl0ZW0taWQ9XCIke3RoaXNbXCJpZFwiXX1cIj4ke1xuICAgICAgdGhpc1tcIm5hbWVcIl1cbiAgICB9PC9hPmA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwTGlzdEl0ZW07XG4iXSwic291cmNlUm9vdCI6IiJ9