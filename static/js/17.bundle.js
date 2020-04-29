(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./src/webcomponents/FormDialog.js":
/*!*****************************************!*\
  !*** ./src/webcomponents/FormDialog.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @filename FormDialog.js
 */


const template = document.createElement('template')
template.innerHTML = `<style></style>
<dialog></dialog>`

class FormDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open']
  }

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldVal, newVal) {
    
  }

}

/* harmony default export */ __webpack_exports__["default"] = (customElements.define('form-dialog', FormDialog));


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvd2ViY29tcG9uZW50cy9Gb3JtRGlhbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVlLCtHQUFnRCIsImZpbGUiOiIxNy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlbmFtZSBGb3JtRGlhbG9nLmpzXG4gKi9cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJylcbnRlbXBsYXRlLmlubmVySFRNTCA9IGA8c3R5bGU+PC9zdHlsZT5cbjxkaWFsb2c+PC9kaWFsb2c+YFxuXG5jbGFzcyBGb3JtRGlhbG9nIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydvcGVuJ11cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSlcbiAgICB0aGlzLnNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQodGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgXG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgIFxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdmb3JtLWRpYWxvZycsIEZvcm1EaWFsb2cpXG4iXSwic291cmNlUm9vdCI6IiJ9