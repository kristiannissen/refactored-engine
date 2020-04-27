(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./src/utils/pubsub.js":
/*!*****************************!*\
  !*** ./src/utils/pubsub.js ***!
  \*****************************/
/*! exports provided: subscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
  console.log("publish", message, payload);
  if (Object.keys(subscribers).includes(message) === true) {
    let subs = subscribers[message];
    for (let s in subs) {
      subs[s](payload);
    }
  }
};

const unsubscribe = () => console.log("TODO");




/***/ }),

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL3NyYy93ZWJjb21wb25lbnRzL0FwcERpYWxvZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUU4Qjs7Ozs7Ozs7Ozs7OztBQzVCOUI7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ2E7O0FBRTZDO0FBQ3JCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLGVBQWU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGtFQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLGtFQUFTO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLElBQUksa0VBQVM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsS0FBSyxJQUFJLGNBQWM7QUFDaEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QyxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdFQUFPO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdFQUFPO0FBQ2Y7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVlLHdFQUFTLEVBQUMiLCJmaWxlIjoiOC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFB1YlN1Yi5qc1xuICogc3Vic2NyaWJlcnN7a2V5OiBbXX1cbiAqL1xuXG5sZXQgc3Vic2NyaWJlcnMgPSB7fTtcblxuY29uc3Qgc3Vic2NyaWJlID0gKG1lc3NhZ2UsIGNhbGxiYWNrKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwic3Vic2NyaWJlXCIsIG1lc3NhZ2UsIGNhbGxiYWNrKTtcbiAgaWYgKE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5pbmNsdWRlcyhtZXNzYWdlKSA9PT0gZmFsc2UpIHtcbiAgICBzdWJzY3JpYmVyc1ttZXNzYWdlXSA9IFtdO1xuICB9XG5cbiAgc3Vic2NyaWJlcnNbbWVzc2FnZV0ucHVzaChjYWxsYmFjayk7XG59O1xuXG5jb25zdCBwdWJsaXNoID0gKG1lc3NhZ2UsIHBheWxvYWQpID0+IHtcbiAgY29uc29sZS5sb2coXCJwdWJsaXNoXCIsIG1lc3NhZ2UsIHBheWxvYWQpO1xuICBpZiAoT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmluY2x1ZGVzKG1lc3NhZ2UpID09PSB0cnVlKSB7XG4gICAgbGV0IHN1YnMgPSBzdWJzY3JpYmVyc1ttZXNzYWdlXTtcbiAgICBmb3IgKGxldCBzIGluIHN1YnMpIHtcbiAgICAgIHN1YnNbc10ocGF5bG9hZCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IGNvbnNvbGUubG9nKFwiVE9ET1wiKTtcblxuZXhwb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH07XG4iLCIvKipcbiAqIEFwcERpYWxvZy5qc1xuICovXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgc3Vic2NyaWJlLCBwdWJsaXNoIH0gZnJvbSBcIi4vLi4vdXRpbHMvcHVic3ViLmpzXCI7XG5pbXBvcnQgQXBwVGl0bGUgZnJvbSBcIi4vQXBwVGl0bGUuanNcIjtcblxuY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIik7XG50ZW1wbGF0ZS5pbm5lckhUTUwgPSBgXG4gIDxzdHlsZT5cbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICB9XG4gIGRpYWxvZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICB6LWluZGV4OiAzO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gIC5kLWMge1xuICB9XG4gIC5kLWMgc3BhbiB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbjogMCA1cHggMDtcbiAgfVxuICAuZGlhbG9nLWNsb3NlZCB7XG4gICAgXG4gIH1cbiAgPC9zdHlsZT5cbiAgPGRpYWxvZz48L2RpYWxvZz5cbmA7XG5cbmNsYXNzIEFwcERpYWxvZyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtcImxpc3RpZFwiXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLmRpYWcgPSB0aGlzLl9zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoXCJkaWFsb2dcIik7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzW25hbWVdID0gbmV3VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3Vic2NyaWJlKFwibGlzdC1zaG93XCIsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIiwgcGF5bG9hZC5saXN0aWQpO1xuICAgICAgdGhpcy50b2dnbGVPcGVuKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgc3Vic2NyaWJlKFwiaXRlbS1hZGRlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnB1c2goe1xuICAgICAgICBpdGVtbmFtZTogcGF5bG9hZC5pdGVtbmFtZSxcbiAgICAgICAgcXVhbnRpdHk6IHBheWxvYWQucXVhbnRpdHlcbiAgICAgIH0pO1xuICAgICAgdXNlckxpc3RzLnNsaWNlKGluZHgsIG5ld0xpc3QpO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VyX2xpc3RzXCIsIEpTT04uc3RyaW5naWZ5KHVzZXJMaXN0cykpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgIHRoaXMucHVzaENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHN1YnNjcmliZShcIml0ZW0tcmVtb3ZlZFwiLCBwYXlsb2FkID0+IHtcbiAgICAgIGxldCB1c2VyTGlzdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJfbGlzdHNcIikgfHwgXCJbXVwiO1xuICAgICAgdXNlckxpc3RzID0gSlNPTi5wYXJzZSh1c2VyTGlzdHMpO1xuICAgICAgbGV0IGluZHggPSB1c2VyTGlzdHMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJsaXN0aWRcIikpO1xuICAgICAgbGV0IG5ld0xpc3QgPSB1c2VyTGlzdHNbaW5keF07XG4gICAgICBuZXdMaXN0Lml0ZW1zLnNwbGljZShwYXJzZUludChwYXlsb2FkLmluZHgpLCAxKTtcbiAgICAgIHVzZXJMaXN0c1tpbmR4XS5pdGVtcyA9IG5ld0xpc3QuaXRlbXM7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJfbGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkodXNlckxpc3RzKSk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5wdXNoQ2hhbmdlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVzaENoYW5nZXMoKSB7XG4gICAgbGV0IGxpc3RPYmogPSB0aGlzLmdldExpc3RPYmplY3QoKTtcbiAgICBmZXRjaChgL2FwcC9zZXJ2aWNlL2xpc3RzLyR7bGlzdE9iai5pZH0vYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGl0ZW1zOiBsaXN0T2JqLml0ZW1zXG4gICAgICB9KVxuICAgIH0pXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihqc29uID0+IGNvbnNvbGUubG9nKGpzb24pKTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oKSB7XG4gICAgaWYgKHRoaXMuZGlhZy5oYXNBdHRyaWJ1dGUoXCJvcGVuXCIpKSB7XG4gICAgICB0aGlzLmRpYWcucmVtb3ZlQXR0cmlidXRlKFwib3BlblwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFnLnNldEF0dHJpYnV0ZShcIm9wZW5cIiwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGlzdE9iamVjdCgpIHtcbiAgICBsZXQgdXNlckxpc3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VyX2xpc3RzXCIpIHx8IFwiW11cIjtcbiAgICBsZXQgbGlzdCA9IEpTT04ucGFyc2UodXNlckxpc3RzKTtcbiAgICBsZXQgbGlzdE9iaiA9IGxpc3QuZmluZChcbiAgICAgIChpdGVtLCBpbmR4KSA9PiBpdGVtLmlkID09PSB0aGlzLmdldEF0dHJpYnV0ZShcImxpc3RpZFwiKVxuICAgICk7XG4gICAgcmV0dXJuIGxpc3RPYmo7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IHVzZXJMaXN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcl9saXN0c1wiKSB8fCBcIltdXCI7XG4gICAgbGV0IGxpc3QgPSBKU09OLnBhcnNlKHVzZXJMaXN0cyk7XG4gICAgbGV0IGxpc3RPYmogPSB0aGlzLmdldExpc3RPYmplY3QoKTtcbiAgICBsZXQgaXRlbXMgPSBsaXN0T2JqLml0ZW1zLm1hcChcbiAgICAgIChpdGVtLCBpbmR4KSA9PiBgPGxpIGRhdGEtaW5kZXg9XCIke2luZHh9XCI+JHtpdGVtLml0ZW1uYW1lfTwvbGk+YFxuICAgICk7XG5cbiAgICB0aGlzLmRpYWcuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJkLWNcIj5cbiAgICAgIDxzcGFuPlxuICAgICAgICA8YSBocmVmPVwiXCI+Q2xvc2U8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8YXBwLXRpdGxlIHRpdGxlPVwiJHtsaXN0T2JqLm5hbWV9XCI+PC9hcHAtdGl0bGU+XG4gICAgICA8dWw+JHtpdGVtc308L3VsPlxuICAgICAgPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8bGFiZWw+R3JvY2VyeTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwiaXRlbV9uYW1lXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZi1nXCI+XG4gICAgICAgICAgPGxhYmVsPlF1YW50aXR5PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiXCIgbmFtZT1cIml0ZW1fcXVhbnRpdHlcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLWdcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2F2ZVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5gO1xuXG4gICAgbGV0IGZvbyA9IHRoaXMuZGlhZy5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbiAgICBmb28uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHB1Ymxpc2goXCJpdGVtLWFkZGVkXCIsIHtcbiAgICAgICAgaXRlbW5hbWU6IGZvby5pdGVtX25hbWUudmFsdWUudHJpbSgpLFxuICAgICAgICBxdWFudGl0eTogZm9vLml0ZW1fcXVhbnRpdHkudmFsdWUgPT0gXCJcIiA/IFwiMVwiIDogZm9vLml0ZW1fcXVhbnRpdHkudmFsdWVcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGNsb3NlQnV0dG9uID0gdGhpcy5kaWFnLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuID4gYVwiKTtcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnRvZ2dsZU9wZW4oKTtcbiAgICB9KTtcblxuICAgIGxldCBlbG1zID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtaW5kZXhdXCIpO1xuXG4gICAgZWxtcy5mb3JFYWNoKChlbG0sIGluZHgpID0+IHtcbiAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcHVibGlzaChcIml0ZW0tcmVtb3ZlZFwiLCB7XG4gICAgICAgICAgaW5keDogZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiKVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcERpYWxvZztcbiJdLCJzb3VyY2VSb290IjoiIn0=