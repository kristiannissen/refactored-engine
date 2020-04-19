(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./src/webcomponents/AppForm.js":
/*!**************************************!*\
  !*** ./src/webcomponents/AppForm.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../lib/pubsub.js */ "./src/lib/pubsub.js");
/* harmony import */ var _lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../lib/dbfunc.js */ "./src/lib/dbfunc.js");
/**
 * AppForm.js
 */





const template = document.createElement("template");
template.innerHTML = `
  <style>
  .f-g {
    flex-grow: 1;
    text-align: center;
  }
  form {
    display: flex;
    align-items: baseline;
  }
  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #481380;
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
  }
  input:focus {
    border-bottom: 1px solid #26a69a;
    box-shadow: 0 1px 0 0 #26a69a;
  }
  input:focus + label {
    color: #26a69a;
    top: -.25rem;
  }
  label {
    left: 0;
    top: 1rem;
    color: #9e9e9e;
    position: absolute;
    font-size: 1rem;
  }
  button {
    text-decoration: none;
    color: #fff;
    background-color: #26a69a;
    text-align: center;
    letter-spacing: .5px;
    font-size: 14px;
    outline: 0;
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  }
  </style>
  <form autocomplete="off">
    <div class="f-g">      
      <input type="text" name="list_name" value="">
      <label>Name of List</label>
    </div>
    <div class="f-g">
      <button type="submit">Save</button>
    </div>
  </form>
  `;

class AppForm extends HTMLElement {
  static get observedAttributes() {
    return ["name", "userid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    let userId = this.getAttribute("userid");

    this._shadowRoot.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();

      let name = e.target["list_name"].value.trim();
      this.setAttribute("name", name);
      if (name !== "") {
        Object(_lib_dbfunc_js__WEBPACK_IMPORTED_MODULE_1__["add"])({
          id: Math.floor(Math.random() * Date.now()),
          name: name,
          items: [],
          synced: false
        }).then(resp => {
          if ("SyncManager" in window) {
            navigator.serviceWorker.ready.then(reg =>
              reg.sync.register("list-added")
            );
          }
          Object(_lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["publish"])("list-added", { list_name: name });
        });
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppForm);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBGb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDYTs7QUFFMkM7QUFDZjs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBRztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDhEQUFPLGdCQUFnQixrQkFBa0I7QUFDbkQsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWUsc0VBQU8sRUFBQyIsImZpbGUiOiI5LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXBwRm9ybS5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH0gZnJvbSBcIi4vLi4vbGliL3B1YnN1Yi5qc1wiO1xuaW1wb3J0IHsgYWRkIH0gZnJvbSBcIi4vLi4vbGliL2RiZnVuYy5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICAuZi1nIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIGZvcm0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICB9XG4gIGlucHV0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM0ODEzODA7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIGhlaWdodDogM3JlbTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgbWFyZ2luOiAwIDAgOHB4IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG4gIGlucHV0OmZvY3VzIHtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzI2YTY5YTtcbiAgICBib3gtc2hhZG93OiAwIDFweCAwIDAgIzI2YTY5YTtcbiAgfVxuICBpbnB1dDpmb2N1cyArIGxhYmVsIHtcbiAgICBjb2xvcjogIzI2YTY5YTtcbiAgICB0b3A6IC0uMjVyZW07XG4gIH1cbiAgbGFiZWwge1xuICAgIGxlZnQ6IDA7XG4gICAgdG9wOiAxcmVtO1xuICAgIGNvbG9yOiAjOWU5ZTllO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBmb250LXNpemU6IDFyZW07XG4gIH1cbiAgYnV0dG9uIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2YTY5YTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC41cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIG91dGxpbmU6IDA7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xuICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsMC4xNCksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsMC4xMiksIDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsMC4yKTtcbiAgfVxuICA8L3N0eWxlPlxuICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+ICAgICAgXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibGlzdF9uYW1lXCIgdmFsdWU9XCJcIj5cbiAgICAgIDxsYWJlbD5OYW1lIG9mIExpc3Q8L2xhYmVsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9mb3JtPlxuICBgO1xuXG5jbGFzcyBBcHBGb3JtIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibmFtZVwiLCBcInVzZXJpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBsZXQgdXNlcklkID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJ1c2VyaWRcIik7XG5cbiAgICB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGxldCBuYW1lID0gZS50YXJnZXRbXCJsaXN0X25hbWVcIl0udmFsdWUudHJpbSgpO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIG5hbWUpO1xuICAgICAgaWYgKG5hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgYWRkKHtcbiAgICAgICAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogRGF0ZS5ub3coKSksXG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgICAgc3luY2VkOiBmYWxzZVxuICAgICAgICB9KS50aGVuKHJlc3AgPT4ge1xuICAgICAgICAgIGlmIChcIlN5bmNNYW5hZ2VyXCIgaW4gd2luZG93KSB7XG4gICAgICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeS50aGVuKHJlZyA9PlxuICAgICAgICAgICAgICByZWcuc3luYy5yZWdpc3RlcihcImxpc3QtYWRkZWRcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHB1Ymxpc2goXCJsaXN0LWFkZGVkXCIsIHsgbGlzdF9uYW1lOiBuYW1lIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBGb3JtO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==