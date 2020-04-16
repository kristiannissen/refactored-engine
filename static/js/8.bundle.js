webpackJsonp([8],{

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
    this._title = "";
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    if (this.hasAttribute("title")) {
      this.title = this.getAttribute("title");
    }
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._title = newValue;
    }
  }

  render() {
    this._shadowRoot.querySelector("h1").innerHTML = this.title;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppTitle);


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBUaXRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiI4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXBwVGl0bGVcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYFxuPHN0eWxlPlxuaDEge1xuICBjb2xvcjogI2ZmZjtcbiAgbWFyZ2luOiAwO1xufVxuLyogU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgNTc2cHggYW5kIHVwKSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG4gIGgxIHtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG59XG4vKiBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCBsZXNzIHRoYW4gNzY4cHgpICovXG5AbWVkaWEgKG1heC13aWR0aDogNzY3Ljk4cHgpIHtcblxufVxuLyogTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIGxlc3MgdGhhbiA5OTJweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA5OTEuOThweCkge1xuXG59XG4vKiBMYXJnZSBkZXZpY2VzIChkZXNrdG9wcywgbGVzcyB0aGFuIDEyMDBweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiAxMTk5Ljk4cHgpIHtcbiAgXG59XG48L3N0eWxlPlxuPGgxPjwvaDE+XG5gO1xuXG5jbGFzcyBBcHBUaXRsZSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl90aXRsZSA9IFwiXCI7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1widGl0bGVcIl07XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoXCJ0aXRsZVwiKSkge1xuICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdGl0bGUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gdGhpcy50aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBUaXRsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDgiXSwic291cmNlUm9vdCI6IiJ9