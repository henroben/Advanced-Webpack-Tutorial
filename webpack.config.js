var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
  }
};
