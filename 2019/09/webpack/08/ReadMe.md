# 生产环境配置
- 继承自 05 + 07
- 生产环境下为遵循逻辑分离，我们一般为每个环境编写彼此独立的webpack配置


## 注意
- `webpack-merge`区分环境
- `webpack.prod.js` 生产环境设置`devtool: 'source-map'`更加适用
  + 避免在生产中使用 `inline-***` 和 `eval-***`，因为它们可以增加 bundle 大小，并降低整体性能。
