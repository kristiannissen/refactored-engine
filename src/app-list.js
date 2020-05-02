/**
 * Filename: app-list.js
 */

import { get, add } from "./utils/dbfunc.js";
import { navigate } from "./utils/navigation.js";

const floatingButton = document.createElement("floating-button");
floatingButton.innerHTML = `Here`;

const render = () => {
  const root = document.createElement("div");
  return root;
};
export { render };
