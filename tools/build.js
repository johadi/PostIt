// This file is used to run the production webpack
// Console.log found here is intentionally done to see
// the warning or error messages during the process
const webpack = require('webpack');
const colors = require('colors');
const webpackConfig = require('../webpack.config.prod');

process.env.NODE_ENV = 'production';
console.log('Generating minified bundle for production via Webpack...'.blue);
webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // so a fatal error occurred. Stop here.
    // Uncomment the console.log below to see error messages (development only)
    // console.log(err.bold.red);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    // Uncomment the line below to see error messages (development only)
    // return jsonStats.errors.map(error => console.log(error.red));
  }
  if (jsonStats.hasWarnings) {
    // Uncomment the lines below to see error messages (development only)
    // console.log('Webpack generated the following warnings: '.bold.yellow);
    // jsonStats.warnings.map(warning => console.log(warning.yellow));
  }
  // Uncomment the lines below to see error messages (development only)
  // console.log(`Webpack stats: ${stats}`);
  // console.log('Your app has been compiled in production mode and written to /production.'.green);
  return 0;
});
