# 缓存
- 继承自 09代码分离+02起步+04管理输出


## 注意
- `webpack-merge`区分环境
- `webpack.prod.js` 生产环境设置`devtool: 'source-map'`更加适用
  + 避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。
