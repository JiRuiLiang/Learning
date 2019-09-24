const path = require('path'); // 引入path模块，用于文件路径配置
// 动态生成入口html文件，放置入口起点名称变化而导致原文件引用失败
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 打包前清理之前打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin  = require('vue-loader/lib/plugin') // 用于打包Vue文件

module.exports = env => {
  return {
    entry: './src/main.js', // 入口
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'vuex-demo',
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        { // vue文件转义
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        { // es6语法转义
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['es2015']
              }
            }
          ],
          exclude: /src/
        }
      ]
    },
    output: { // 出口
      filename: '[name].bundle.js', // 输出文件名称
      path: path.resolve(__dirname, 'dist') // 输出到dist目录下
    },
    mode: 'development' // 打包模式 开发
  }
}
