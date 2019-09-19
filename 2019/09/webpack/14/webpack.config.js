const path = require('path'); // 引入path模块，用于文件路径配置
// 动态生成入口html文件，放置入口起点名称变化而导致原文件引用失败
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清理之前打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: { // 多入口配置
    app: './src/index.js',
    print: './src/print.js'
  }, // 入口
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '渐进式网络应用程序'
    }),
    new WorkWebpackPlugin.GenerateSW({
      // 这些选项帮助 ServiceWorkers 快速启用
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  output: { // 出口
    filename: '[name].bundle.js', // 输出文件名称
    path: path.resolve(__dirname, 'dist') // 输出到dist目录下
  }
}
