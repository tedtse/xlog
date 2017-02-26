module.exports = {
  entry: {
    xlog: './src/index.js'
  },
  output: {
    path: './dist/'
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
  }
}