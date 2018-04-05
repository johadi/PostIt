const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'client/src'),
  build: path.join(__dirname, 'client/src/build'),
  styles: path.join(__dirname, 'client/src/build/static/styles')
};
process.env.BABEL_ENV = TARGET;
const common = {
  context: PATHS.app,
// Entry accepts a path or an object of entries. We'll be using the
// latter form given it's convenient with more complex configurations.
  entry: {
    app: './index.jsx'
  },
  externals: {
    cheerio: 'window',
    jsdom: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  // Add resolve.extensions.
// '' is needed to allow imports without an extension.
// Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'survivejs-kanban']
        },
        include: PATHS.app
      },
      {
        test: /\.(scss|css)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },
};

// Default configuration
if (TARGET === 'build:dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
// Enable history API fallback so HTML5 History API based
// routing works. This is a good default that will come
// in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
// Display only errors to reduce the amount of output.
      stats: 'errors-only',
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
          target: 'http://localhost:4000',
          secure: false
        }
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin()
    ]
  });
}
if (TARGET === 'start:build') {
  module.exports = merge(common, {});
}

