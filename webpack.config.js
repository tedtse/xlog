module.exports = {
  entry: {
    xlog: './src/xlog.js'
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
      }
    ]
  }
}