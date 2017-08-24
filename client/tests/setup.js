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

// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
// global.document = dom.window.document;
// global.window = document.defaultView;
//
// const exposedProperties = ['window', 'navigator', 'document'];
//
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
//
// global.HTMLElement = window.HTMLElement;
//
// const noop = () => null;
//
// require.extensions['.css'] = noop;
// require.extensions['.scss'] = noop;
// require.extensions['.md'] = noop;
// require.extensions['.png'] = noop;
// require.extensions['.svg'] = noop;
// require.extensions['.jpg'] = noop;
// require.extensions['.jpeg'] = noop;
// require.extensions['.gif'] = noop;`