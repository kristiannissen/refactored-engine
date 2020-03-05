/* main.js */

/**
 * Add css class to body depending on path
 */
var r = /\//gi;
var loc = document.location.pathname.replace(r, '');
if (loc === '') loc = 'index';
var bodyElm = document.querySelector('body')
bodyElm.classList.toggle('js-'+ loc)
