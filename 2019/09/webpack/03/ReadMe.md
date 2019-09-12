# 管理资源

## 注意
- 本示例继承自`02`
- `dist` 下 `index.html` 为手动添加

## 打包命令配置
- `npm run build` 在 `package.json`文件内配置`scripts`属性

## loader
- `css-loader` `style-loader` 为css样式转码使用, 类似功能的还有`less-loader`、`sass-loader` 分别用于less文件转码，sass文件转码
- `file-loader` 用于文件转码，一般用于图片转码，字体转码
- 还有其他更多类型。。。

## 全局资源
可复用的资源可以放置到统一模块下，如此例中 `assets`, 通过模块方式引用更容易迁移
