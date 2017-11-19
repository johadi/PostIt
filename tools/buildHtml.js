import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';
import winston from 'winston';

// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});
fs.readFile('client/src/build/index.html', 'utf8', (err, markup) => {
  if (err) {
    return logger.error(err);
  }

  const $ = cheerio.load(markup);
  $('head').prepend('');

  fs.writeFile('production/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      return logger.error(err);
    }
    logger.info('index.html written to /production'.green);
  });
});
