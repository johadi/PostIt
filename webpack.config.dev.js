const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const DashboardPlugin = require('webpack-dashboard/plugin');

const PATHS = {
    build: path.join(__dirname, 'production'),
};

module.exports = merge(webpackConfig, {
    devtool: 'source-map',
    stats: 'errors-only',
    devServer: {
        // contentBase: PATHS.build, // in earlier webpack versions
        static: {
            directory: PATHS.build
        },
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,
        hot: true,
        // Display only errors to reduce the amount of output.
        // Parse host and port from env so this is easy to customize.
        //
        // If you use Vagrant or Cloud9, set
        // host: process.env.HOST || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices unlike default
        // localhost
        host: process.env.HOST,
        port: process.env.PORT,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8000',
                secure: false
            }
        }
    },
    plugins: [
        new DashboardPlugin()
    ]
});
