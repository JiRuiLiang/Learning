const express = require('express'); // 导入express模块
const webpack = require('webpack'); // 导入webpack
const webpackDevMiddleware = require('webpack-dev-middleware'); // 导入webpack-dev-middleware 监听变化

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告诉express使用webpack-dev-middleware并使用webpack.config.js配置文件作为基础。
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// 服务启动后监听3000端口
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
