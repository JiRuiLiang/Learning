const path = require('path'); // 引入path模块，用于文件路径配置

module.exports = {
  entry: './src/index.js', // 入口
  output: { // 出口
    filename: 'bundle.js', // 输出文件名称
    path: path.resolve(__dirname, 'dist') // 输出到dist目录下
  },
  module: { // 打包文件转码模块配置
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
}
