var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'faker',
    'lodash',
    'react',
    'react-dom',
    'react-input-range',
    'react-redux',
    'react-router',
    'redux',
    'redux-form',
    'redux-thunk'
]; // to create a new separate bundle to split off vendor libraries named vendor.js

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  }, // replace string with object - so have multiple entry points
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // replaces [name] with key from entry section
  },
  module: {
    rules: [
      {
          use: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/ // exclude node modules as trust that all are ES5 already
      },
      {
          use: ['style-loader', 'css-loader'],
          test: /\.css$/
      }
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor', 'manifest']
      }), // checks double including between bundle & vendor, any duplicates are only added to vendor.js
      new HtmlWebpackPlugin({
          template: 'src/index.html'
      })
  ]
};
