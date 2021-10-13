const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    app: path.join(__dirname, 'client/src'),
    build: path.join(__dirname, 'production'),
    styles: path.join(__dirname, 'client/src/build/static/styles'),
    template: path.join(__dirname, 'client/src/build/index.html')
};

exports.PATHS = PATHS;

module.exports = {
    context: PATHS.app,
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: {
        app: './index.jsx'
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
        new HtmlWebpackPlugin({
            template: PATHS.template
        }),
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new webpack.DefinePlugin({
            // API_HOST is used for production
            'process.env.API_HOST': JSON.stringify(process.env.API_HOST || `http://localhost:${process.env.PORT || 5000}`)
        })
    ],
    module: {
        rules: [
            // Set up jsx. This accepts js too thanks to RegExp
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                include: [ PATHS.app ]
            },
            {
                test: /\.(scss|css)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 250000 // in bytes
            //     }
            // }
        ]
    },
};

