const express = require('express');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morganLogger = require('morgan');
const winston = require('winston');
const apiRoutes = require('../server/routes/index');

const port = process.env.PORT || 3000;
const app = express();
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});

app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use('/apidoc', express.static('public/apidoc'));
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
apiRoutes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }
  logger.info('app running on port', port);
});
