# shimming

## shimming解决的问题
引入webpack.ProvidePlugin()解决：如果使用了一些版本比较老的模块如jquery、lodash，这些老模块的用法不是ES Module的使用方式，如果用webpack打包用这种模块会报错，为了解决这样的错误就要用到webpack.ProvidePlugin()

## 注意
- 这里的手动调整this指向的配置没啥用，可能是版本问题。并且require.resolve直接引用src下的文件会报错，需要以相对路径的方式引入文件
- 此项目中不能使用babel进行转义，会导致fetch请求失效
