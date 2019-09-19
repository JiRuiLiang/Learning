# 代码分离
- 继承自 04 管理输出

## 注意
- 三种常用代码分离方法
  + 入口起点：使用`entry`配置手动地分离代码。
    ```js
      module.exports = {
        entry: {
          index: './src/index.js',
          another: './src/another-module.js'
        }
      }
    ```
  + 防止重复：使用`CommonsChunkPlugin`去重和分离chunk。webpack4.0以上已删除此项，使用`SplitChunksPlugin`
    ```js
      // webpack.config.js
      module.exports = {
        entry: {
          index: './src/index.js',
          another: './src/another-module.js'
        },
        optimization: {
          splitChunks: {
            chunks: 'all', // all 同时分割同步和异步代码，async分割异步打包的代码 'initial'//也会同时打包同步和异步，但是异步内部的引入不再考虑，直接打包在一起，会将vue和b的内容直接打包成chunk,
            minSize: 2000,
            maxSize: 0,
            minChunks: 1, // 最小公用模块次数，默认为1
            maxAsyncRequests: 5,// 按需加载时最大的并行请求数
            maxInitialRequests: 3,// 一个入口最大的并行请求数
            automaticNameDelimiter: '~', // 文件名分割符号
            automaticNameMaxLength: 30, // 文件名最大长度
            name: true,
            cacheGroups: { // 打包的公共文件
              vendors: {
                test: /[\\/]node_modules[\\/]/, // 匹配规则
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        }
      }
    ```
  + 动态导入：通过模块的内联函数调用来分离代码。
  ```js
    // 需要在index.js 文件内异步调用lodash
    module.exports = {
      entry: {
        index: './src/index.js'
      },
      output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    }
  ```
