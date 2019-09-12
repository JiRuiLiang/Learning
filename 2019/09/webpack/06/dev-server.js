// 引入模块
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

// 引入配置
const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

// 修改webpack配置对象，使其包含HMR入口起点
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);
// 监听8080端口
server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 8080');
});
