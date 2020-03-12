/**
 * AppError.js
 */
class AppError extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'level']
  }
  connectedCallback() {
    this.addEventListener('app-error', (e) => console.log(e))
  }
}

export default AppError
