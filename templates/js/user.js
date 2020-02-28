/**/
"use strict";

const hasToken = () => localStorage.getItem("_id_token");

const setToken = token => localStorage.setItem("_id_token", token);

const getToken = () => localStorage.getItem("_id_token");

const removeToken = () => localStorage.removeItem("_id_token");

export { hasToken, setToken, getToken, removeToken };
