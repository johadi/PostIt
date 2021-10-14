// The require keyword is intentionally used for importing here instead of es6
// import keyword because we want to use babel-polyfill and babel-register
// to compile app.js (written in es6) and this cannot be done if we don't use
// require that is natively supported by nodejs.
require('@babel/polyfill');
require('@babel/register');
require('../app');
