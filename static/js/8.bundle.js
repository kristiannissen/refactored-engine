(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/webcomponents/AppDialog.js":
/*!****************************************!*\
  !*** ./src/webcomponents/AppDialog.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/pubsub.js */ "./src/utils/pubsub.js");
/* harmony import */ var _AppTitle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppTitle.js */ "./src/webcomponents/AppTitle.js");
/**
 * AppDialog.js
 */





const template = document.createElement("template");
template.innerHTML = `
  <style>
  :host {
    display: block;
  }
  dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 100%;
    border: none;
    z-index: 3;
    margin: 0;
    padding: 0;
  }
  .d-c {
  }
  .d-c span {
    float: right;
    margin: 0 5px 0;
  }
  .dialog-closed {
    
  }
  </style>
  <dialog></dialog>
`;

class AppDialog extends HTMLElement {
  static get observedAttributes() {
    return ["listid"];
  }

  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.diag = this._shadowRoot.querySelector("dialog");
  }

  attributeChangeCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["subscribe"])("list-show", payload => {
      this.setAttribute("listid", payload.listid);
      this.toggleOpen();
      this.render();
    });

    Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["subscribe"])("item-added", payload => {
      let userLists = localStorage.getItem("user_lists") || "[]";
      userLists = JSON.parse(userLists);
      let indx = userLists.findIndex(l => l.id === this.getAttribute("listid"));
      let newList = userLists[indx];
      newList.items.push({
        itemname: payload.itemname,
        quantity: payload.quantity
      });
      userLists.slice(indx, newList);
      localStorage.setItem("user_lists", JSON.stringify(userLists));
      this.render();
      this.pushChanges();
    });

    Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["subscribe"])("item-removed", payload => {
      let userLists = localStorage.getItem("user_lists") || "[]";
      userLists = JSON.parse(userLists);
      let indx = userLists.findIndex(l => l.id === this.getAttribute("listid"));
      let newList = userLists[indx];
      newList.items.splice(parseInt(payload.indx), 1);
      userLists[indx].items = newList.items;
      localStorage.setItem("user_lists", JSON.stringify(userLists));
      this.render();
      this.pushChanges();
    });
  }

  pushChanges() {
    let listObj = this.getListObject();
    fetch(`/app/service/lists/${listObj.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: listObj.items
      })
    })
      .then(response => response.json())
      .then(json => console.log(json));
  }

  toggleOpen() {
    if (this.diag.hasAttribute("open")) {
      this.diag.removeAttribute("open");
    } else {
      this.diag.setAttribute("open", true);
    }
  }

  getListObject() {
    let userLists = localStorage.getItem("user_lists") || "[]";
    let list = JSON.parse(userLists);
    let listObj = list.find(
      (item, indx) => item.id === this.getAttribute("listid")
    );
    return listObj;
  }

  render() {
    let userLists = localStorage.getItem("user_lists") || "[]";
    let list = JSON.parse(userLists);
    let listObj = this.getListObject();
    let items = listObj.items.map(
      (item, indx) => `<li data-index="${indx}">${item.itemname}</li>`
    );

    this.diag.innerHTML = `<div class="d-c">
      <span>
        <a href="">Close</a>
      </span>
      <app-title title="${listObj.name}"></app-title>
      <ul>${items}</ul>
      <form autocomplete="off">
        <div class="f-g">
          <label>Grocery</label>
          <input type="text" value="" name="item_name">
        </div>
        <div class="f-g">
          <label>Quantity</label>
          <input type="number" value="" name="item_quantity">
        </div>
        <div class="f-g">
          <input type="submit" value="Save">
        </div>
      </form>
    </div>`;

    let foo = this.diag.querySelector("form");
    foo.addEventListener("submit", e => {
      e.preventDefault();
      Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["publish"])("item-added", {
        itemname: foo.item_name.value.trim(),
        quantity: foo.item_quantity.value == "" ? "1" : foo.item_quantity.value
      });
    });

    let closeButton = this.diag.querySelector("span > a");
    closeButton.addEventListener("click", e => {
      e.preventDefault();
      this.toggleOpen();
    });

    let elms = this._shadowRoot.querySelectorAll("[data-index]");

    elms.forEach((elm, indx) => {
      elm.addEventListener("click", e => {
        e.preventDefault();
        Object(_utils_pubsub_js__WEBPACK_IMPORTED_MODULE_0__["publish"])("item-removed", {
          indx: e.target.getAttribute("data-index")
        });
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (AppDialog);


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9BcHBEaWFsb2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYmNvbXBvbmVudHMvQXBwVGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUU2QztBQUNyQjs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxrRUFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxrRUFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLGtFQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsV0FBVztBQUMzQztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLEtBQUssSUFBSSxjQUFjO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGFBQWE7QUFDdkMsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTSxnRUFBTztBQUNiO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBTztBQUNmO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFZSx3RUFBUyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDckx6QjtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsdUVBQVEsRUFBQyIsImZpbGUiOiI4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXBwRGlhbG9nLmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzdWJzY3JpYmUsIHB1Ymxpc2ggfSBmcm9tIFwiLi8uLi91dGlscy9wdWJzdWIuanNcIjtcbmltcG9ydCBBcHBUaXRsZSBmcm9tIFwiLi9BcHBUaXRsZS5qc1wiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGBcbiAgPHN0eWxlPlxuICA6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gIH1cbiAgZGlhbG9nIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIHotaW5kZXg6IDM7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbiAgLmQtYyB7XG4gIH1cbiAgLmQtYyBzcGFuIHtcbiAgICBmbG9hdDogcmlnaHQ7XG4gICAgbWFyZ2luOiAwIDVweCAwO1xuICB9XG4gIC5kaWFsb2ctY2xvc2VkIHtcbiAgICBcbiAgfVxuICA8L3N0eWxlPlxuICA8ZGlhbG9nPjwvZGlhbG9nPlxuYDtcblxuY2xhc3MgQXBwRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wibGlzdGlkXCJdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHRoaXMuZGlhZyA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImRpYWxvZ1wiKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdWJzY3JpYmUoXCJsaXN0LXNob3dcIiwgcGF5bG9hZCA9PiB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImxpc3RpZFwiLCBwYXlsb2FkLmxpc3RpZCk7XG4gICAgICB0aGlzLnRvZ2dsZU9wZW4oKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICBzdWJzY3JpYmUoXCJpdGVtLWFkZGVkXCIsIHBheWxvYWQgPT4ge1xuICAgICAgbGV0IHVzZXJMaXN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9saXN0c1wiKSB8fCBcIltdXCI7XG4gICAgICB1c2VyTGlzdHMgPSBKU09OLnBhcnNlKHVzZXJMaXN0cyk7XG4gICAgICBsZXQgaW5keCA9IHVzZXJMaXN0cy5maW5kSW5kZXgobCA9PiBsLmlkID09PSB0aGlzLmdldEF0dHJpYnV0ZShcImxpc3RpZFwiKSk7XG4gICAgICBsZXQgbmV3TGlzdCA9IHVzZXJMaXN0c1tpbmR4XTtcbiAgICAgIG5ld0xpc3QuaXRlbXMucHVzaCh7XG4gICAgICAgIGl0ZW1uYW1lOiBwYXlsb2FkLml0ZW1uYW1lLFxuICAgICAgICBxdWFudGl0eTogcGF5bG9hZC5xdWFudGl0eVxuICAgICAgfSk7XG4gICAgICB1c2VyTGlzdHMuc2xpY2UoaW5keCwgbmV3TGlzdCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJfbGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkodXNlckxpc3RzKSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5wdXNoQ2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaWJlKFwiaXRlbS1yZW1vdmVkXCIsIHBheWxvYWQgPT4ge1xuICAgICAgbGV0IHVzZXJMaXN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9saXN0c1wiKSB8fCBcIltdXCI7XG4gICAgICB1c2VyTGlzdHMgPSBKU09OLnBhcnNlKHVzZXJMaXN0cyk7XG4gICAgICBsZXQgaW5keCA9IHVzZXJMaXN0cy5maW5kSW5kZXgobCA9PiBsLmlkID09PSB0aGlzLmdldEF0dHJpYnV0ZShcImxpc3RpZFwiKSk7XG4gICAgICBsZXQgbmV3TGlzdCA9IHVzZXJMaXN0c1tpbmR4XTtcbiAgICAgIG5ld0xpc3QuaXRlbXMuc3BsaWNlKHBhcnNlSW50KHBheWxvYWQuaW5keCksIDEpO1xuICAgICAgdXNlckxpc3RzW2luZHhdLml0ZW1zID0gbmV3TGlzdC5pdGVtcztcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcl9saXN0c1wiLCBKU09OLnN0cmluZ2lmeSh1c2VyTGlzdHMpKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnB1c2hDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdXNoQ2hhbmdlcygpIHtcbiAgICBsZXQgbGlzdE9iaiA9IHRoaXMuZ2V0TGlzdE9iamVjdCgpO1xuICAgIGZldGNoKGAvYXBwL3NlcnZpY2UvbGlzdHMvJHtsaXN0T2JqLmlkfS9gLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaXRlbXM6IGxpc3RPYmouaXRlbXNcbiAgICAgIH0pXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGpzb24gPT4gY29uc29sZS5sb2coanNvbikpO1xuICB9XG5cbiAgdG9nZ2xlT3BlbigpIHtcbiAgICBpZiAodGhpcy5kaWFnLmhhc0F0dHJpYnV0ZShcIm9wZW5cIikpIHtcbiAgICAgIHRoaXMuZGlhZy5yZW1vdmVBdHRyaWJ1dGUoXCJvcGVuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWcuc2V0QXR0cmlidXRlKFwib3BlblwiLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBnZXRMaXN0T2JqZWN0KCkge1xuICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgIGxldCBsaXN0ID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgIGxldCBsaXN0T2JqID0gbGlzdC5maW5kKFxuICAgICAgKGl0ZW0sIGluZHgpID0+IGl0ZW0uaWQgPT09IHRoaXMuZ2V0QXR0cmlidXRlKFwibGlzdGlkXCIpXG4gICAgKTtcbiAgICByZXR1cm4gbGlzdE9iajtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICBsZXQgbGlzdCA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICBsZXQgbGlzdE9iaiA9IHRoaXMuZ2V0TGlzdE9iamVjdCgpO1xuICAgIGxldCBpdGVtcyA9IGxpc3RPYmouaXRlbXMubWFwKFxuICAgICAgKGl0ZW0sIGluZHgpID0+IGA8bGkgZGF0YS1pbmRleD1cIiR7aW5keH1cIj4ke2l0ZW0uaXRlbW5hbWV9PC9saT5gXG4gICAgKTtcblxuICAgIHRoaXMuZGlhZy5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImQtY1wiPlxuICAgICAgPHNwYW4+XG4gICAgICAgIDxhIGhyZWY9XCJcIj5DbG9zZTwvYT5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxhcHAtdGl0bGUgdGl0bGU9XCIke2xpc3RPYmoubmFtZX1cIj48L2FwcC10aXRsZT5cbiAgICAgIDx1bD4ke2l0ZW1zfTwvdWw+XG4gICAgICA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgICAgIDxsYWJlbD5Hcm9jZXJ5PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJpdGVtX25hbWVcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8bGFiZWw+UXVhbnRpdHk8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgdmFsdWU9XCJcIiBuYW1lPVwiaXRlbV9xdWFudGl0eVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtZ1wiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJTYXZlXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PmA7XG5cbiAgICBsZXQgZm9vID0gdGhpcy5kaWFnLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgIGZvby5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcHVibGlzaChcIml0ZW0tYWRkZWRcIiwge1xuICAgICAgICBpdGVtbmFtZTogZm9vLml0ZW1fbmFtZS52YWx1ZS50cmltKCksXG4gICAgICAgIHF1YW50aXR5OiBmb28uaXRlbV9xdWFudGl0eS52YWx1ZSA9PSBcIlwiID8gXCIxXCIgOiBmb28uaXRlbV9xdWFudGl0eS52YWx1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgY2xvc2VCdXR0b24gPSB0aGlzLmRpYWcucXVlcnlTZWxlY3RvcihcInNwYW4gPiBhXCIpO1xuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlT3BlbigpO1xuICAgIH0pO1xuXG4gICAgbGV0IGVsbXMgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1pbmRleF1cIik7XG5cbiAgICBlbG1zLmZvckVhY2goKGVsbSwgaW5keCkgPT4ge1xuICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwdWJsaXNoKFwiaXRlbS1yZW1vdmVkXCIsIHtcbiAgICAgICAgICBpbmR4OiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRGlhbG9nO1xuIiwiLyoqXG4gKiBBcHBUaXRsZVxuICovXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG48c3R5bGU+XG5oMSB7XG4gIGNvbG9yOiAjZmZmO1xuICBtYXJnaW46IDA7XG59XG4vKiBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCA1NzZweCBhbmQgdXApICovXG5AbWVkaWEgKG1heC13aWR0aDogNTc1Ljk4cHgpIHtcbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cbn1cbi8qIFNtYWxsIGRldmljZXMgKGxhbmRzY2FwZSBwaG9uZXMsIGxlc3MgdGhhbiA3NjhweCkgKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjcuOThweCkge1xuXG59XG4vKiBNZWRpdW0gZGV2aWNlcyAodGFibGV0cywgbGVzcyB0aGFuIDk5MnB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDk5MS45OHB4KSB7XG5cbn1cbi8qIExhcmdlIGRldmljZXMgKGRlc2t0b3BzLCBsZXNzIHRoYW4gMTIwMHB4KSAqL1xuQG1lZGlhIChtYXgtd2lkdGg6IDExOTkuOThweCkge1xuICBcbn1cbjwvc3R5bGU+XG48aDE+PC9oMT5cbmA7XG5cbmNsYXNzIEFwcFRpdGxlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xuICAgIHRoaXMuX3NoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcInRpdGxlXCJdO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGVDb21wb25lbnQoXCJ0aXRsZVwiLCB0aGlzLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpKTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudChuYW1lLCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29tcG9uZW50KG5hbWUsIHZhbHVlKSB7XG4gICAgbGV0IGVsbSA9IHRoaXMuX3NoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcImgxXCIpO1xuICAgIGlmICh2YWx1ZSAhPT0gXCJcIikge1xuICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlLnRyaW0oKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwVGl0bGU7XG4iXSwic291cmNlUm9vdCI6IiJ9