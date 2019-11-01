- 全局安装webpack `npm i webpack webpack-cli -g `
- 项目中安装webpack `npm i webpack webpack-cli -D`
- webpack打包命令 `npx webpack`
  + `npx`会自动查找当前依赖包中的可执行文件，如果找不到，就会去PATH里找。如果依然找不到，就会自动安装。
  + 直接运行`webpack` 命令需要全局安装webpack
- webpack配置
  + 入口(entry): 程序的入口js
  + 输出(output): 打包后文件存放的位置
  + 依赖(loader): 用于对模块的源代码进行转换
  + 插件(plugins): 插件的目的在于解决loader无法实现的其他事
  ```js
    const path = require('path')

    module.exports = {
      entry: './src/index.js', // 配置入口文件
      output: { // 出口配置
        path: path.join(__dirname, 'dist'), // 打包后文件存放位置
        filename: 'bundle.js' // 打包后文件名称
      },
      mode: 'development' // 配置模式为开发模式
    }
  ```
- package.json配置
  - 通过运行 `npm run test` 运行 webpack.custom.config.js 内的配置，针对环境进行配置不同命令，方便开发
  ```json
    {
      "scripts": {
        "test": "webpack --config webpack.custom.config.js"
      }
    }
  ```
- webpack自动编译
  + webpack's Watch Mode ：监视模式，监视文件的修改，自动编译
    - 配置命令 `webpack --watch` 或者在webpack配置中添加`watch: true`
  + webpack-dev-server ： 最常用，专供开发时使用，打包效率高，修改代码后会自动重新打包以及刷新浏览器
    - 安装 `wbepack-dev-server`
    - 配置命令 `webpack-dev-server`
    - 配置命令 `webpack-dev-server --contentBase src` 指定入口文件在src目录下，默认入口文件为`index.html`
    - 命令内添加 `--open` 自动打开 `--port` 指定端口号 `--hot`热模块更新 `--compress` 开启压缩
  + webpack-dev-middleware
      - 如果使用middleware必须使用`html-webpack-plugin`插件
    - 安装`express`和`webpack-dev-middleware`
    - 新建`server.js`, 配置启动命令 用 node运行server.js
    ```js
      // server.js
      const express = require('express')
      const webpack = require('webpack')
      const webpackDevMiddleware = require('webpack-dev-middleware')

      const app = express()
      const compiler = webpack(config);

      app.use(webpackDevMiddleware(compiler, {
        publicPath: '/'
      }))

      app.listen(8080, function () {
        console.log('启动成功：', 'http://localhost:8080')
      })
    ```
- html插件
  - 安装：`npm install html-webpack-plugin -D`
  - 作用：
    + 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
    + 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
  - 使用：
  ```js
    // webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      ...,
      plugins: [
        new HtmlWebpackPlugin({
          title: '文件标题',
          filename: 'index.html', // 输出的文件名称
          template: 'template.html', // 模板所在路径
          inject: true, // 注入选项
          ...
        })
      ]
    }
  ```

# 小结1
只有在开发时才需要使用自动编译工具

- loader
  + css `style-loader`, `css-loader`
    - 安装 `npm install style-loader css-loader -D`
  + sass `style-loader`, `css-loader`, `sass-loader`
    - 安装 `npm install style-loader css-loader sass-loader -D`
  + less `style-loader`, `css-loader`, `less-loader`
    - 安装 `npm install style-loader css-loader less-loader -D`
  + file/img `file-loader`, `url-loader`(将一定大小的图片压缩为base64放于页面中)
    - 安装 `npm install file-loader url-loader -D`
  + js `babel-loader` （依赖`@babel/core` `@babel/preset-env`）(官方更建议配置一个.babelrc文件)
    - generater语法 `@babel-transform-runtime`依赖`@babel/runtime`。
      + 安装 `npm install @babel-transform-runtime -D`, `npm install @babel/runtime -S`
      + 作用：支持`generater`语法
    - babel在看到对象调用方法时默认不会进行转换 通过 `@babel/polyfill`进行处理。
      + 安装 `npm install @babel/polyfill`
      + 使用：`import @babel/polyfill` 或在 entry入口中指定
  ```js
    // webpack.config.js
    module.exports = {
      ...,
      module: {
        rules: [
          {
            test: /\.css$/, // 文件匹配规则正则表达式
            // loader的执行顺序是从右到左的读取，会将css文件先交给最右侧的loader来处理
            // css-loader 解析css文件，style-loader 将解析出来的结果放到html文件里
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
          },
          { // 图片文件处理
            test: /\.(png|gif|bmp|jpg|jpeg)$/,
            use: {
              loader: 'url-loader',
              // limit表示如果图片大于5kb，就以路径形式展示，小于的话就用base64格式展示
              options: {
                limit: 5 * 1024,
                outputPath: 'images', // 指定打包后输出的位置
                name: '[name][hash:4].[ext]' // 自定义打包后图片名称
              }
            }
          },
          { // 字体文件处理
            test: /\.(woff|woff2|eot|svg|ttf)$/,
            use: ['file-loader']
          },
          { // js文件处理
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              // options:{
              //   presets: ['@babel/env'], // 语法预设
              //   plugins: [
              //     '@babel/plugin-proposal-class-preperties', // 支持更高级的语法
              //     '@babel/plugin-transform-runtime' // 支持 generater语法
              //   ]
              // }
            },
            exclude: /node_modules/ // 打包的时候排除指定文件夹
          }
        ]
      }
    }
  ```
- source map
  + 使用方式：webpack配置添加devtool属性
  + 用于追溯调试代码的原始位置
   ```js
    // wbepack.config.js
    module.exports = {
      ...,
      mode: 'development',
      devtool: 'cheap-module-eval-source-map'
    }
   ```
- 插件
  + `clean-webpack-plugin` 每次打包清除之前打包生成的文件
    - 安装 `npm install clean-webpack-plugin -D`
    - 使用 `new CleanWebpackPlugin()`
  + `copy-webpack-plugin` 拷贝指定的文件到指定的地方
    - 安装 `npm install copy-webpack-plugin -D`
    - 使用 `new CopyWebpackPlugin([
        {
          form: path.join(__dirname, '来源文件或文件夹'),
          to: '指定的文件夹'
        }
      ])`
  + `BannerPlugin` webpack内置插件, 用于给打包的js文件加上版权注释信息
    - 使用 `new webpack.BannerPlugin("版权所属：***")`
