/**
 * @filename FloatingButton.js
 */
const template = document.createElement("template");
template.innerHTML = `<style>
    button {
      position: absolute;
      right: 25px;
      bottom: 25px;
    }
  </style><button>Here</button>`;

class FloatingButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = this.shadowRoot.querySelector("button");
  }

  connectedCallback() {}
}

export default customElements.define("floating-button", FloatingButton);
