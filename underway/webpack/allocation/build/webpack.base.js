const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'main.js'
  },
  loader: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: '标题',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
