# 看这里 Look here

- 01 起步demo
- 02 起步demo完成版
- 03 管理资源，继承自02
- 04 输出管理demo
  + `clean-webpack-plugin` 每次打包前清理之前打包的文件。 注意：此插件根据版本不同，引用及使用方式也不同
- 05 开发环境配置（热更新）, 继承自04
- 06 模块热更替(HMR) 继承自05： 不适用于生产环境，生产环境请查看生产环境构建指南
- 07 摇树优化(tree shaking)
- 08 生产环境构建，继承自05开发环境配置 + 07摇树优化
- 09 代码分离, 继承自 04 管理输出
- 10 懒加载，继承自09代码分离
- 11 缓存， 继承自 09代码分离+02起步+04管理输出
- 12 library(库)  看不明白也没完成
- 13 shimming 兼容处理模块引用的方式
- 14 渐进式网络应用程序-离线环境运行 （http-server）
- 15 环境变量


## 自动编译工具小结
 只有在开发时才需要自动编译工具， 例如webpack-dev-server
 项目上线时都会直接使用webpack进行打包构建，不需要使用这些自动编译工具
 所有自动编译工具都是为了提升开发体验

## babel-loader 使用
- 可以配置 .babelrc 文件，也可放到webpack配置中
- `babel-loader` `@babel/core` `@babel/preset-env` 依赖项
```js
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    },
    exclude: /node_modules/
  }
```
- 更高级语法的使用： `babel` 处理 `generator` 使用 `@babel/plugin-transform-runtime`,`@babel/runtime`
- webpack `dev-tool` 配置设置log定位到源代码位置
- `webpack-merge` 用于把自己的配置与base的配置进行合并后导出
- `import` 必须在顶级导入， `require`是动态导入，所以`require`不能够使用`webpack`的`tree shaking`
