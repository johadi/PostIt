require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morganLogger = require('morgan');
const http = require('http');
const path = require('path');
const colors = require('colors');
const winston = require('winston');
const apiRoutes = require('./server/routes/index');

const app = express();
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, './public')));
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});

// Api routes
apiRoutes(app);

const server = http.createServer(app);

server.listen(app.get('port'), (err) => {
  if (err) {
    // call winston logger
    logger.error(err);
  }
  // call winston logger
  logger.info(`App running on port ${app.get('port')}`.blue);
});

module.exports = app;
