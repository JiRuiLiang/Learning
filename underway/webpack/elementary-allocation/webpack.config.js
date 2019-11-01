const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  loader: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: '标题',
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // watch: true, // 开启监视模式，此时执行webpack指令进行打包会在代码发生变化后自动编译
  devServer: { // 开发模式配置，如果命令只配置了webpack-dev-server，会引入这里的内容
    open: true, // 是否自动打开
    hot: true, // 通过这种方式开启hot，需要安装插件webpack.HotModuleReplacementPlugin
    port: 8080, // 指定端口
    compress: true, // 开启压缩
    contentBase: './src'
  }
}
