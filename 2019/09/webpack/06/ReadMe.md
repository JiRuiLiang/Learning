# 开发环境配置
- 继承自`05`

## webpack配置,启用HMR
**如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。**
- 在`webpack`配置中引入`webpack`模块
- 在`webpack`配置中设置`devServer`内添加`hot: true`
- 在`wbepack`配置中设置`plugins`内添加 `new webpack.NamedModulesPlugin()`,new webpack.HotModuleReplacementPlugin()``


## 通过Node.js API, 启用HMR
- 根目录下创建dev-server.js
```js
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8080, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```
