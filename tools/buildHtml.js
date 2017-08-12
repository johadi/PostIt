import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

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
