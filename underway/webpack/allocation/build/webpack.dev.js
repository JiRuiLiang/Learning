const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
module.exports = merge(baseConfig, {
  loader: {},
  plugins: [
  ],
  devServer: { // 开发模式配置，如果命令只配置了webpack-dev-server，会引入这里的内容
    open: true, // 是否自动打开
    hot: true, // 通过这种方式开启hot，需要安装插件webpack.HotModuleReplacementPlugin
    port: 8080, // 指定端口
    compress: true, // 开启压缩
    contentBase: './src'
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({ // 设置全局环境变量
      IS_DEV: 'true'
    })
  ]
})
