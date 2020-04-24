(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./src/webcomponents/SelectList.js":
/*!*****************************************!*\
  !*** ./src/webcomponents/SelectList.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename List.js
 */


const template = document.createElement("template");
template.innerHTML = `<style></style><div id="selection-list></div>`;

class SelectList extends HTMLElement {
  static get observedAttributes() {
    return ["options"];
  }

  get options() {
    return this._options || [];
  }

  set options(val) {
    if (Array.isArray(val) === false) return;
    this._options = val;
  }

  constructor(...args) {
    super(...args);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._root = this.shadowRoot.querySelector("#selection-list");
    this._options = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {
    this.update();
  }

  disconnectedCallback() {
    console.log("disconnected", this._selections);
  }

  adopedCallback() {}

  update() {
    console.log("update", this._options);
    this._root.innerHTML = "Hello Pussy";
  }
}

/* harmony default export */ __webpack_exports__["default"] = (SelectList);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsZUFBZTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSx5RUFBVSxFQUFDIiwiZmlsZSI6IjExLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVuYW1lIExpc3QuanNcbiAqL1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpO1xudGVtcGxhdGUuaW5uZXJIVE1MID0gYDxzdHlsZT48L3N0eWxlPjxkaXYgaWQ9XCJzZWxlY3Rpb24tbGlzdD48L2Rpdj5gO1xuXG5jbGFzcyBTZWxlY3RMaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW1wib3B0aW9uc1wiXTtcbiAgfVxuXG4gIGdldCBvcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zIHx8IFtdO1xuICB9XG5cbiAgc2V0IG9wdGlvbnModmFsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB0aGlzLl9vcHRpb25zID0gdmFsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIHRoaXMuX3Jvb3QgPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihcIiNzZWxlY3Rpb24tbGlzdFwiKTtcbiAgICB0aGlzLl9vcHRpb25zID0gW107XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIGNvbnNvbGUubG9nKFwiZGlzY29ubmVjdGVkXCIsIHRoaXMuX3NlbGVjdGlvbnMpO1xuICB9XG5cbiAgYWRvcGVkQ2FsbGJhY2soKSB7fVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcInVwZGF0ZVwiLCB0aGlzLl9vcHRpb25zKTtcbiAgICB0aGlzLl9yb290LmlubmVySFRNTCA9IFwiSGVsbG8gUHVzc3lcIjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RMaXN0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==