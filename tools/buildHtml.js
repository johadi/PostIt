const fs = require('fs');
const cheerio = require('cheerio');
const colors = require('colors');
const path = require('path');

const directory = 'production';
fs.readdir(directory, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach((file) => {
    if (file !== 'index.html') {
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});
fs.readFile('client/src/build/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  $('head').prepend('');

  fs.writeFile('production/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /production'.green);
  });
});
