import express from 'express';
import path from 'path';
import compression from 'compression';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import winston from 'winston';
import dotenv from 'dotenv';
import apiRoutes from '../server/routes/index';

dotenv.config();
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
app.use(express.static('public'));
app.use(express.static('production'));
app.use(favicon(path.join(__dirname, 'favicon2.ico')));
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
