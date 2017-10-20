// This file is used to run the production webpack
// winston logger is used to log the warning or error messages during the process
import dotenv from 'dotenv';
import webpack from 'webpack';
import colors from 'colors';
import winston from 'winston';
import webpackConfig from '../webpack.config.prod';

dotenv.config();
process.env.NODE_ENV = 'production';
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});
logger.info('Generating minified bundle for production via Webpack...'.blue);
webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // so a fatal error occurred. Stop here.
    logger.error(err.bold.red);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => logger.error(error.red));
  }
  if (jsonStats.hasWarnings) {
    logger.warn('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => logger.warn(warning.yellow));
  }
  logger.info(`Webpack stats: ${stats}`);
  logger.info('Your app has been compiled in production mode and written to /production.'.green);
  return 0;
});
