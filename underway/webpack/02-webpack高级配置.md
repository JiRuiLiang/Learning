1. HTML中img标签的图片资源处理
  - 安装 `npm install -S html-withimg-loader`
  - 使用 `{
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
    }`
2. 多页应用打包
  - 在`webpack.config.js`中配置
  ```js
    // webpack.config.js
    module.exports = {
      entry: { // 1. 修改为多入口
        main: './src/main.js',
        other: './src/other.js'
      },
      output: {
        path: path.join(__dirname, './dist/'),
        // 2. 多日寇无法对应一个固定的出口，设置filename为变量
        filename: '[name][hash].js',
        publicPath: '/'
      },
      plugins: [
        // 3. 如果用了html插件，需要手动配置多入口对应的html文件，将指定其对应的输出文件
        new HtmlWebpackPlugin({
          template: './index.html',
          filename: 'index.html',
          chunks: ['main'] // 指定当前html
        }),
        new HtmlWebpackPlugin({
          template: './other.html',
          filename: 'other.html',
          chunks: ['other']
        })
      ]
    }
  ```
  - 修改入口为对象，支持多个js入口，同时修改output输出的文件名为'[name].js'表示
3. 第三方库的两种引入方式
  可以通过`expose-loader`进行全局变量的注入，同时也可以使用内置插件`webpack.ProvidePlugin`对每个模块的闭包空间，注入一个变量，自动加载模块，而不必导出`import`或`require`
  - expose-loader 将库引入到全局作用域
    1. 安装 `npm install -D expose-loader`
    2. 配置: `require.resolve`用来获取模块的绝对路径。所以这里的loader只会作用于jquery模块。并且只在bundle中使用到它时，才进行处理。
    ```js
      module: {
        rules: [
          {
            test: require.resolve('jquery'),
            use: {
              loader: 'expose-loader',
              options: '$'
            }
          }
        ]
      }
    ```
  - webpack.ProvidePlugin 将库自动加载到每一个模块
    1. 引入 `require('webpack')`
    2. 配置
    ```js
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ```
4. 区分环境进行配置
  抽取三个配置文件：
    - webpack.base.js
    - webpack.prod.js
    - webpack.dev.js
  步骤如下
    1. 将开发环境和生产环境公用的配置放入base中，不同的配置各自放入prod或dev文件中（例如： mode）
    2. 然后在dev和prod中使用`webpack-merge`把自己的配置与base的配置进行合并后导出
      - 安装 `npm i -D wepback-merge`
    3. 将package.json中的脚本参数进行修改，通过`--config`手动指定特定的配置文件
5. 定义环境变量
  除了区分不同的配置文件进行打包，还需要在开发时知道当前的环境是开发阶段或上线阶段，所以可以借助webpack内置插件`DefinePlugin`来定义环境变量，最终可以实现开发阶段与上线阶段的api地址自动切换
  1. 引入webpack `const webpack = require('webpack')`
  2. 创建插件对象，并定义环境变量`new webpack.DefinePlugin({
      IS_DEV: 'true' // 这里必须是字符串类型
    })`
6. 使用devServer解决开发阶段跨域问题
  1. jsonp
  2. cors 即 Cross-Origin Resource Sharing 跨域资源共享，接口响应添加允许跨域响应头 `Access-Control-Allow-Origin: <origin> | *`
  3. http proxy webpack-dev-server做请求转发处理
  ```js
    // webpack.dev.js
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.base.js')
    const webpack = require('webpack')
    module.exports = merge(baseConfig, {
      ...
      devServer: { // 开发模式配置，如果命令只配置了webpack-dev-server，会引入这里的内容
        open: true, // 是否自动打开
        hot: true, // 通过这种方式开启hot，需要安装插件webpack.HotModuleReplacementPlugin
        port: 8081, // 指定端口
        compress: true, // 开启压缩
        contentBase: './src',
        proxy: { //请求重定向
          // '/api': 'http://localhost:3000'
          '/api': {
            target: 'http://localhost:3000',
            pathRewrite: { // 重写路径
              '^/api': ''
            }
          }
        }
      },
      ...
    })
  ```
7. HMR 热模块更替-只适用于开发环境
  - 将`devServer`内`hot`属性设置为`true`,这种设置会更新代码并刷新页面
  - 更新代码不刷新页面
  ```js
    // 需要创建单独文件，在父级通过下面的方式引用
    if (module.hot) {
      module.hot.accept('./子级文件名.js', function(){
        // 这个函数当hotmodule模块内容更新时触发
        var hotmodule = require('./子级文件名.js')
        console.log(hotmodule)
      })
    }
  ```
