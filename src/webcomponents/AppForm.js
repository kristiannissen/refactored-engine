/**
 * AppForm.js
 */
const template = document.createElement("template");
template.innerHTML = `<form>
    <label>Name of List</label>
    <input type="text" name="list_name" value="">
    <button type="submit">Save</button>
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
      fetch(`/service/${userId}/lists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          list_name: name
        })
      })
        .then(response => response.json())
        .then(json => {
          // TODO: Notify the AppList about the change
          this.dispatchEvent(
            new CustomEvent("field-changed", {
              detail: { name: name },
              composed: true
            })
          );
        });
    });
  }

  render() {}
}

export default AppForm;
