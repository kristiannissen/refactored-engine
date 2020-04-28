/**
 * @filename navigation.js
 */
const navigate = (path, elm) => {
  let customEvent = new CustomEvent("navigate", {
    detail: {
      path: path,
      target: elm
    }
  });
  document.dispatchEvent(customEvent);
};

export { navigate };
