import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import winston from 'winston';
import cors from 'cors';
import apiRoutes from './server/routes';
import favicon from "serve-favicon";

dotenv.config();
const app = express();
app.use(morganLogger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('production'));
app.use(favicon(path.join(__dirname, 'favicon2.ico')));
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});

// Api routes
apiRoutes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './production/index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), (err) => {
  if (err) {
    // call winston logger
    logger.error(err);
  }
  // call winston logger
  logger.info(`App running on port ${app.get('port')}`.blue);
});

export default app;
