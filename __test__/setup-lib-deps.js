/**
 * Window, document object natively not available in 
 * nodejs, because of it's a headless, Instead it's being 
 * stubbed by jest ( internally uses JSDOM ). It helps in 
 * mocking DOM API & Window APIs.
 * 
 * Here we are setting jquery to window object so it will
 * used in other test cases, we can use other libraries 
 * like lodash etc. with this same setup.
 */
const $ = require('jquery');
window.$ = window.jQuery = $;