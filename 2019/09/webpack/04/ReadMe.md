# 管理输出

## 打包命令配置
- `npm run build` 在 `package.json`文件内配置`scripts`属性

## webpack配置
- 多入口
- 输出： 以入口起点名称动态生成压缩后文件名称
- plugins(插件)：
  + `html-webpack-plugin` 动态生成入口html文件，放置入口起点名称变化而导致原文件引用失败
  + `clean-webpack-plugin` 每次打包前清理之前打包的文件。 注意：此插件根据版本不同，引用及使用方式也不同
