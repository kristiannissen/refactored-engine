/**
 * AppList.js
 */
const template = document.createElement("template");
template.innerHTML = `<ul></ul>`;

class AppList extends HTMLElement {
  static get observedAttributes() {
    return ["userid"];
  }

  constructor(...args) {
    super(...args);
    this._list = [];
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.errorEvent = new CustomEvent("app-error");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[name] = newValue;
    }
  }

  connectedCallback() {
    fetch(`/service/${this.userid}/lists/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        this.dispatchEvent(this.errorEvent);
      })
      .then(json => {
        this._list = json.user_lists;
        this.render();
      })
      .catch(error => this.dispatchEvent(this.errorEvent));

    this.addEventListener("form-changed", e => console.log(e));
  }

  render() {
    let list = this._shadowRoot.querySelector("ul");
    list.innerHTML = "";

    this._list.forEach((item, indx) => {
      let liElm = document.createElement("li");
      liElm.innerHTML = `<div>${item.name}<span>
          <i class="material-icons">keyboard_arrow_right</i>
        </span></div>`;
      list.appendChild(liElm);
    });
  }
}

export default AppList;
