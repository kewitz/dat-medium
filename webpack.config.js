const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [ 'babel-polyfill', path.resolve(__dirname, 'app/app.js') ],
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: './dat-medium.js',
  },
  module: {
    rules: [
      { test: /\.js[x]?$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, use: [ 'style-loader', 'css-loader' ] },
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      sourceMap: true,
      warningsFilter: () => false,
    }),
  ],
}
