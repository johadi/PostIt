// NOTE: This file is used in production.
// The require keyword is intentionally used for importing here instead of es6
// import keyword because we want to use babel-polyfill and babel-register
// to compile buildHtml.js (written in es6) to es5 and
// this cannot be done if we don't use require that is natively
// supported by nodejs.
require('babel-polyfill');
require('babel-register');
require('../buildHtml');
