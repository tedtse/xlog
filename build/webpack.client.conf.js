var webpack = require('webpack');
var config = require('../config/client');
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: '[name]-client.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  ]
});