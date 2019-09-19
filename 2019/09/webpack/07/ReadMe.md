# tree shaking 摇树优化
- 在 webpack2.0 开始引入
- AST(抽象语法树) 可以把一段js代码的每一个语句都转化为树中的一个节点
- DCE(Dead Code Elimination)-无用代码消除。
  + 特点：
    - 减少程序提交、减少程序执行时间、便于将来程序优化
  + 包括：
    - 代码不会被执行，不可到达
    - 代码执行的结果不会被用到
    - 代码只会影响死变量（只写不读）
- tree shaking 是 DCE的一种新的方式，找出使用的代码，排除不使用的代码

## 注意
- 本项目继承自`02`
- `dist` 下 `index.html` 为手动添加 运行`webpack`在`/dist`下生成`main.js`文件
- `webpack.config.js` 下mode属性配置为生产环境`production`(压缩代码)，测试环境`development`(不压缩)
- 需要设置`package.json`添加属性`"sideEffects": false`
