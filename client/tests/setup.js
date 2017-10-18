/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */
const jsdom = require('jsdom');
const $ = require('jquery');
const m = require('module');

const originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) {
    return { uri: request };
  }

  return originalLoader(request, parent, isMain);
};

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>', {
//   url: 'http://localhost'
// });

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;

global.document = document;
global.window = document.defaultView;
global.$ = $(global.window);

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
