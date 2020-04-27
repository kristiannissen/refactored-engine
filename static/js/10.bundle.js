(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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
template.innerHTML = `<style>
    [data-select-item] {
      padding: 10px 20px;
    }
  </style>
  <div id="select-list"></div>`;

class SelectList extends HTMLElement {
  constructor(...args) {
    super(...args);
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._root = this._shadowRoot.querySelector("#select-list");

    this.index = -1;
    this.options = [];
  }

  get selectedIndex() {
    return this.index;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this[name] = newValue;
  }

  connectedCallback() {
    let options = this._root.querySelectorAll("[data-select-item]");
    this._root.addEventListener("click", e => {
      let opt = e.target;
      for (let i = 0; i < options.length; i++) {
        if (options[i] === opt) this.index = i;
      }
      const event = new CustomEvent("select", {
        detail: {
          option: opt.value,
          index: this.index
        }
      });
      e.preventDefault()
      this.dispatchEvent(event);
    });
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  adopedCallback() {}

  add(opt) {
    let elm = document.createElement('div')
    elm.setAttribute('data-select-item', opt.id)
    elm.innerHTML = `<span>${opt.name}</span>`
    this._root.appendChild(elm);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define("select-list", SelectList));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9TZWxlY3RMaXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixTQUFTO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFZSwrR0FBZ0QsRUFBQyIsImZpbGUiOiIxMC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlbmFtZSBMaXN0LmpzXG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKTtcbnRlbXBsYXRlLmlubmVySFRNTCA9IGA8c3R5bGU+XG4gICAgW2RhdGEtc2VsZWN0LWl0ZW1dIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG4gIDxkaXYgaWQ9XCJzZWxlY3QtbGlzdFwiPjwvZGl2PmA7XG5cbmNsYXNzIFNlbGVjdExpc3QgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLl9zaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiBcIm9wZW5cIiB9KTtcbiAgICB0aGlzLl9zaGFkb3dSb290LmFwcGVuZENoaWxkKHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB0aGlzLl9yb290ID0gdGhpcy5fc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdC1saXN0XCIpO1xuXG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICAgIHRoaXMub3B0aW9ucyA9IFtdO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkSW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkgdGhpc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9yb290LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zZWxlY3QtaXRlbV1cIik7XG4gICAgdGhpcy5fcm9vdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgb3B0ID0gZS50YXJnZXQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNbaV0gPT09IG9wdCkgdGhpcy5pbmRleCA9IGk7XG4gICAgICB9XG4gICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudChcInNlbGVjdFwiLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIG9wdGlvbjogb3B0LnZhbHVlLFxuICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgY29uc29sZS5sb2coXCJkaXNjb25uZWN0ZWRcIik7XG4gIH1cblxuICBhZG9wZWRDYWxsYmFjaygpIHt9XG5cbiAgYWRkKG9wdCkge1xuICAgIGxldCBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0LWl0ZW0nLCBvcHQuaWQpXG4gICAgZWxtLmlubmVySFRNTCA9IGA8c3Bhbj4ke29wdC5uYW1lfTwvc3Bhbj5gXG4gICAgdGhpcy5fcm9vdC5hcHBlbmRDaGlsZChlbG0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGN1c3RvbUVsZW1lbnRzLmRlZmluZShcInNlbGVjdC1saXN0XCIsIFNlbGVjdExpc3QpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==