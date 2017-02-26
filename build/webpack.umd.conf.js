var webpack = require('webpack');
var config = require('../config/umd');
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  ]
});