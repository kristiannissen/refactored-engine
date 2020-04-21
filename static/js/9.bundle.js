(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/webcomponents/AppSnackbar.js":
/*!******************************************!*\
  !*** ./src/webcomponents/AppSnackbar.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/pubsub.js */ "./src/utils/pubsub.js");
/**
 * AppError.js
 * TODO: Rename to something more generic
 */




const template = document.createElement("template");
template.innerHTML = `
  <style>
  #snackbar-container {
    position: fixed;
    z-index: 1000;
    min-width: 100%;
    bottom: 0%;
    border-radius: 2px;
  }
  #snackbar {
    border-radius: 2px;
    width: auto;
    margin-top: 10px;
    position: relative;
    max-width: 100%;
    height: auto;
    min-height: 48px;
    line-height: 1.5em;
    background-color: #323232;
    padding: 10px 25px;
    font-size: 1.1rem;
    font-weight: 300;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    cursor: default
  }
  </style>
  <div id="snackbar-container" style="display: block;">
    <div id="snackbar"></div>
  </div>`;

class AppSnackbar extends HTMLElement {
  static get observedAttributes() {
    return ["message"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = this._shadowRoot.getElementById("snackbar-container");
    this.snackbarElm = this._shadowRoot.getElementById("snackbar");
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
      this.snackbarElm.innerHTML = `<span>${newValue}</span>`;
      setTimeout(() => this.toggleDisplay(), 1500);
    }
  }

  toggleDisplay() {
    if (this.elm.style.display === "block") this.elm.style.display = "none";
    else this.elm.style.display = "block";
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppSnackbar);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ2E7O0FBRTZDOztBQUUxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsMEVBQVcsRUFBQyIsImZpbGUiOiI5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXBwRXJyb3IuanNcbiAqIFRPRE86IFJlbmFtZSB0byBzb21ldGhpbmcgbW9yZSBnZW5lcmljXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSBmcm9tIFwiLi8uLi91dGlscy9wdWJzdWIuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgI3NuYWNrYmFyLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgbWluLXdpZHRoOiAxMDAlO1xuICAgIGJvdHRvbTogMCU7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICB9XG4gICNzbmFja2JhciB7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgbWluLWhlaWdodDogNDhweDtcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMyMzIzMjtcbiAgICBwYWRkaW5nOiAxMHB4IDI1cHg7XG4gICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xuICAgIC13ZWJraXQtYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcbiAgICAtd2Via2l0LWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBjdXJzb3I6IGRlZmF1bHRcbiAgfVxuICA8L3N0eWxlPlxuICA8ZGl2IGlkPVwic25hY2tiYXItY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5cbiAgICA8ZGl2IGlkPVwic25hY2tiYXJcIj48L2Rpdj5cbiAgPC9kaXY+YDtcblxuY2xhc3MgQXBwU25hY2tiYXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXCJtZXNzYWdlXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZWxtID0gdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcInNuYWNrYmFyLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLnNuYWNrYmFyRWxtID0gdGhpcy5fc2hhZG93Um9vdC5nZXRFbGVtZW50QnlJZChcInNuYWNrYmFyXCIpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7fVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnNuYWNrYmFyRWxtLmlubmVySFRNTCA9IGA8c3Bhbj4ke25ld1ZhbHVlfTwvc3Bhbj5gO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRvZ2dsZURpc3BsYXkoKSwgMTUwMCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRGlzcGxheSgpIHtcbiAgICBpZiAodGhpcy5lbG0uc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB0aGlzLmVsbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZWxzZSB0aGlzLmVsbS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFNuYWNrYmFyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==