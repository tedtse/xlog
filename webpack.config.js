var webpack = require('webpack');
var config = require('./config');

module.exports = {
  entry: {
    xlog: './src/index.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.tpl$/,
        loader: 'string'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  ]
}