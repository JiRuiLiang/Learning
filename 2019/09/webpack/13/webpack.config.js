const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    polyfills: './src/polyfills.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // 当模块运行在 CommonJS 环境下这将会变成一个问题，也就是说此时的 this 指向的是 module.exports。在这个例子中，你可以通过使用 imports-loader 覆写 this：
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?this=>window'
      },
      {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?file,parse=helpers.parse'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ // 将lodash设置为全局变量，通过 _ 引用
      // _: 'lodash' // 这个是引入整个lodash
      join: ['lodash', 'join'] // 这样引入，在全局调用的join方法都是lodash中提供的join方法
    }),
    new HtmlWebpackPlugin({
      name: 'shimming'
    })
  ]
};
