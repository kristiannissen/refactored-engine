webpackJsonp([6,12],{

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/**
 * PubSub.js
 * subscribers{key: []}
 */

let subscribers = {};

const subscribe = (message, callback) => {
  // console.log("subscribe", message, callback);
  if (Object.keys(subscribers).includes(message) === false) {
    subscribers[message] = [];
  }

  subscribers[message].push(callback);
};

const publish = (message, payload) => {
  // console.log("publish", message, payload);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_pubsub_js__ = __webpack_require__(1);
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

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbGliL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBTbmFja2Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVROzs7Ozs7Ozs7O0FDNUJSO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsU0FBUztBQUNyRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiI2LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUHViU3ViLmpzXG4gKiBzdWJzY3JpYmVyc3trZXk6IFtdfVxuICovXG5cbmxldCBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAobWVzc2FnZSwgY2FsbGJhY2spID0+IHtcbiAgLy8gY29uc29sZS5sb2coXCJzdWJzY3JpYmVcIiwgbWVzc2FnZSwgY2FsbGJhY2spO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSBmYWxzZSkge1xuICAgIHN1YnNjcmliZXJzW21lc3NhZ2VdID0gW107XG4gIH1cblxuICBzdWJzY3JpYmVyc1ttZXNzYWdlXS5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbmNvbnN0IHB1Ymxpc2ggPSAobWVzc2FnZSwgcGF5bG9hZCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZyhcInB1Ymxpc2hcIiwgbWVzc2FnZSwgcGF5bG9hZCk7XG4gIGlmIChPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuaW5jbHVkZXMobWVzc2FnZSkgPT09IHRydWUpIHtcbiAgICBsZXQgc3VicyA9IHN1YnNjcmliZXJzW21lc3NhZ2VdO1xuICAgIGZvciAobGV0IHMgaW4gc3Vicykge1xuICAgICAgc3Vic1tzXShwYXlsb2FkKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVuc3Vic2NyaWJlID0gKCkgPT4gY29uc29sZS5sb2coXCJUT0RPXCIpO1xuXG5leHBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2xpYi9wdWJzdWIuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA2IDcgMTIiLCIvKipcbiAqIEFwcEVycm9yLmpzXG4gKiBUT0RPOiBSZW5hbWUgdG8gc29tZXRoaW5nIG1vcmUgZ2VuZXJpY1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAjc25hY2tiYXItY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICBtaW4td2lkdGg6IDEwMCU7XG4gICAgYm90dG9tOiAwJTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gIH1cbiAgI3NuYWNrYmFyIHtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBtaW4taGVpZ2h0OiA0OHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzIzMjMyO1xuICAgIHBhZGRpbmc6IDEwcHggMjVweDtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XG4gICAgLXdlYmtpdC1hbGlnbi1pdGVtczogY2VudGVyO1xuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xuICAgIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGN1cnNvcjogZGVmYXVsdFxuICB9XG4gIDwvc3R5bGU+XG4gIDxkaXYgaWQ9XCJzbmFja2Jhci1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPlxuICAgIDxkaXYgaWQ9XCJzbmFja2JhclwiPjwvZGl2PlxuICA8L2Rpdj5gO1xuXG5jbGFzcyBBcHBTbmFja2JhciBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcIm1lc3NhZ2VcIl07XG4gIH1cblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5fc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5fc2hhZG93Um9vdC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdGhpcy5lbG0gPSB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwic25hY2tiYXItY29udGFpbmVyXCIpO1xuICAgIHRoaXMuc25hY2tiYXJFbG0gPSB0aGlzLl9zaGFkb3dSb290LmdldEVsZW1lbnRCeUlkKFwic25hY2tiYXJcIik7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHt9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuc25hY2tiYXJFbG0uaW5uZXJIVE1MID0gYDxzcGFuPiR7bmV3VmFsdWV9PC9zcGFuPmA7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudG9nZ2xlRGlzcGxheSgpLCAxNTAwKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVEaXNwbGF5KCkge1xuICAgIGlmICh0aGlzLmVsbS5zdHlsZS5kaXNwbGF5ID09PSBcImJsb2NrXCIpIHRoaXMuZWxtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBlbHNlIHRoaXMuZWxtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwU25hY2tiYXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJjb21wb25lbnRzL0FwcFNuYWNrYmFyLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDYiXSwic291cmNlUm9vdCI6IiJ9