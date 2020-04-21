(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./src/webcomponents/AppTitle.js":
/*!***************************************!*\
  !*** ./src/webcomponents/AppTitle.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * AppTitle
 */


const template = document.createElement("template");
template.innerHTML = `
<style>
h1 {
  color: #fff;
  margin: 0;
}
/* Small devices (landscape phones, 576px and up) */
@media (max-width: 575.98px) {
  h1 {
    font-size: 1.25rem;
    text-align: center;
  }
}
/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {

}
/* Medium devices (tablets, less than 992px) */
@media (max-width: 991.98px) {

}
/* Large devices (desktops, less than 1200px) */
@media (max-width: 1199.98px) {
  
}
</style>
<h1></h1>
`;

class AppTitle extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.updateComponent("title", this.getAttribute("title"));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateComponent(name, newValue);
    }
  }

  updateComponent(name, value) {
    let elm = this._shadowRoot.querySelector("h1");
    if (value !== "") {
      elm.innerHTML = value.trim();
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppTitle);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHVFQUFRLEVBQUMiLCJmaWxlIjoiMTcuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBcHBUaXRsZVxuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG48c3R5bGU+XG5oMSB7XG4gIGNvbG9yOiAjZmZmO1xuICBtYXJnaW46IDA7XG59XG4vKiBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCA1NzZweCBhbmQgdXApICovXG5AbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIGxlc3MgdGhhbiA3NjhweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjcuOThweCkge1xuXG59XG4vKiBNZWRpdW0gZGV2aWNlcyAodGFibGV0cywgbGVzcyB0aGFuIDk5MnB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XG5cbn1cbi8qIExhcmdlIGRldmljZXMgKGRlc2t0b3BzLCBsZXNzIHRoYW4gMTIwMHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDExOTkuOThweCkge1xuICBcbn1cbjwvc3R5bGU+XG48aDE+PC9oMT5cbmA7XG5cbmNsYXNzIEFwcFRpdGxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInRpdGxlXCJdO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQoXCJ0aXRsZVwiLCB0aGlzLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudChuYW1lLCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29tcG9uZW50KG5hbWUsIHZhbHVlKSB7XG4gICAgbGV0IGVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImgxXCIpO1xuICAgIGlmICh2YWx1ZSAhPT0gXCJcIikge1xuICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwVGl0bGU7XG4iXSwic291cmNlUm9vdCI6IiJ9