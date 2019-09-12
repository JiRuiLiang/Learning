# 开发环境配置
- 继承自`04`

## 打包命令配置
- `npm run build` 在 `package.json`文件内配置`scripts`属性

## webpack配置
- 多入口
- 输出： 以入口起点名称动态生成压缩后文件名称
- plugins(插件)：
  + `html-webpack-plugin` 动态生成入口html文件，放置入口起点名称变化而导致原文件引用失败
  + `clean-webpack-plugin` 每次打包前清理之前打包的文件。 注意：此插件根据版本不同，引用及使用方式也不同
- `source map` 错误追踪
  + `webpack.config.js` 添加`devtool`属性，值为`inline-source-map`
- webpack中有几个选项，可以帮助我们在代码变化后自动编译代码
  + webpack's Watch Mode
    - 添加一个用于启动webpack观察模式的npm script脚本
    - 在package.json的scripts内设置"watch": "webpack --watch"
    - 配置好之后运行 npm run watch  会打包文件但并不会退出命令行
  + webpack-dev-server： 还有更多配置
    - 在webpack.config.js文件内添加配置
    ```js
    devServer: {
      contentBase: './dist'
    }
    ```
  + webpack-dev-middleware: 要刷新页面才会生效
    - 使用此项需要同时安装`express`模块
    - 在`output`出口设置中添加`publicPath`为`/`
    - 定义`express`服务,在根目录下添加`server.js`
    ```js
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
    ```
    - 在package.json的scripts内设置"server": "node server.js"
