1. production模式打包自带优化
  - tree shaking 摇树优化
    tree shaking是一个术语，通常用于打包时移除JavaScript中的未引用的代码，它依赖于ES6模块系统中`import`和`export`的静态结构特性
    开发时引入一个模块后，如果只使用其中一个功能，上线打包时只会把用到的功能打包进bundle，其他没用到的功能都不会打包进来，可以实现最基础的优化
  - scope hoisting 作用域提升 `ModuleConcatenationPlugin`,
    scope hoisting的作用是将模块之间的关系进行结果推测，可以让webpack打包出来的代码文件更小、运行的更快。在production模式下会自动添加；其他模式下可以手动添加。
    scope hoisting的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。由于scope hoisting需要分析出模块之间的依赖关系，因此源码必须采用ES6模块化语句，不然它将无法生效。原因和tree shaking一样。
  - 代码压缩

2. 将css提取到独立文件中
  `mini-css-extract-plugin`适用于将css提取为独立的文件的插件，对每个包含css的js文件多会创建一个css文件，支持按需加载css和sourceMap

  只能用在webpack4中，有如下优势
    - 异步加载
    - 不重复编译，性能更好
  使用方法
    1. 安装`npm i -D mini-css-extract-plugin`
    2. 在webpack配置文件中引入插件
    ```js
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    ```
    3. 创建插件对象，配置抽离的css文件名，支持placeholder语法
    ```js
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ```
    4. 将原来配置的所有`style-loader`替换为`MiniCssExtractPlugin.loader`
    ```js
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ```
