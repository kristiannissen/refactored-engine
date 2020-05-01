/**
 * @filename FloatingButton.js
 */
const template = document.createElement("template");
template.innerHTML = `<style>
    .fab {
      width: 70px;
      height: 70px;
      background-color: red;
      border-radius: 50%;
      box-shadow: 0 6px 10px 0 #666;
      font-size: 50px;
      line-height: 70px;
      color: #fff;
      text-align: center;
      position: fixed;
      right: 25px;
      bottom: 25px;
      transition: all 0.1s easi-in-out;
      cursor: pointer;
    }
    div:hover {
      box-shadow: 0 6px 14px 0 #666;
      transform: scale(1.05);
    }
  </style><div class="fab"> + </div>`;

class FloatingButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.elm = this.shadowRoot.querySelector(".fab");
  }

  connectedCallback() {}
}

export default customElements.define("floating-button", FloatingButton);
