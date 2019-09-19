/*
// Es2015模块引入
import * as webpackNumbers from 'webpack-numbers';
// CommonJs 引入
var webpackNumbers = require('webpack-numbers')
// ES2015和CommonJS 模块调用
webpackNumbers.wordToNum('Two');
// AMD 模块引入
require(['webpackNumbers'], function (webapckNumbers) {
  // AMD模块调用
  webpackNumbers.wordToNum('Two');
})
*/

const path = require('path');

module.exports = {
  entry: {
    'webpack-numbers': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers', // 暴露library
    libraryTarget: 'umd', // 控制library如何以不同方式暴露
  },
  externals: { // 外部化lodash
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  }
};
