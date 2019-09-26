# gulp异常处理

由于把node升级到了10以上的版本 执行gulp rjs打包文件报错，错误如下：
```js
  gulp[3192]: src\node_contextify.cc:628: Assertion `args[1]->IsString()' failed.
  1: 00007FF7A167ECE5
  2: 00007FF7A1658196
  3: 00007FF7A1658261
  4: 00007FF7A162B56A
  5: 00007FF7A1E82E52
  6: 00007FF7A1E83FD8
  7: 00007FF7A1E8330D
  8: 00007FF7A1E8322B
  9: 000002875DBDC5C1
```
node 10 版本都会出现这个问题
安装node.js的原生javascript模块 natives后可以解决
即使用命令 `npm install natives`
