const webpack = require('webpack');
const path = require('path'); // 引入path模块，用于文件路径配置
// 动态生成入口html文件，放置入口起点名称变化而导致原文件引用失败
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { // 多入口配置
    app: './src/index.js',
    // another: './src/another-module.js'
  }, // 入口
  plugins: [
    new HtmlWebpackPlugin({
      title: '代码分离'
    }),
    new CleanWebpackPlugin()
  ],
  output: { // 出口
    filename: '[name].bundle.js', // 输出文件名称
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist') // 输出到dist目录下
  }
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     minSize: 2000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //     automaticNameDelimiter: '~',
  //     automaticNameMaxLength: 30,
  //     name: true,
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       }
  //     }
  //   }
  // }
}
