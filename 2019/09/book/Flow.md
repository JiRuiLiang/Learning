## 功能
用来做JavaScript类型检查

# JavaScript语言的特征介绍
JavaScript（类型）
JavaScript是一种弱类型的，动态类型检查的语言

## 弱类型和强类型
- 弱类型：在定义变量的时候，我们可以为变量赋值任何数据，变量的数据类型不是固定死的，这样的类型就是弱类型
- 强类型：在声明变量的时候，一旦给变量赋值，那么变量的数据类型就已经确定，之后如果要给该变量赋值其他类型的数据，需要进行强制数据类型转换

## 动态类型和静态类型
- 核心区别: 动态类型的类型检查会在代码运行的时候进行，而静态类型的类型检查会在编译时进行
- 动态类型：动态类型的类型检查会在代码运行的时候进行
- 静态类型：静态类型的类型检查会在编译时进行

## 动态类型和弱类型带来的问题
- 代码中的错误只能在代码运行的时候被发现

## 静态类型
优点：
  - 提早发现代码中的bug
  - 提高代码的可读性
  - 减少了复杂的错误处理逻辑
  - 便于代码重构
  - 增强IDE的功能
    + IDE: 集成开发环境
缺点：
  - 会增加代码量
  - 需要花时间掌握类型
  - 可能会降低开发效率

---

# Flow的使用
安装 Flow `npm install flow-bin -D` -D开发时使用
为文件添加 `// @flow` ，否则不会对文件进行检测
```js
var a /* : number */ = 10
var a: number = 10 // 此种方式需要使用babel进行转码
```
配置`package.json`
```json
"scripts": {
  "test": "echo \"Errir: no test specified\"&& exit 1",
  "flow": "flow"
}
```
运行`npm run flow init` 生成flow配置文件`.flowconfig`
运行`npm run flow` 对文件进行检测

---

## Flow结合babel使用
- 下载`babel-cli`, `babel-preset-flow`
- 配置`package.json`
```json
"scripts": {
  "test": "echo \"Errir: no test specified\"&& exit 1",
  "flow": "flow",
  "build": "babel ./src -d ./dist"
}
```
- 配置`babelrc`
## 使用babel对Flow代码进行转码
- `Flow`检测是否代码是否规范
- 如果规范通过`babel`转码

---

## Flow中的类型
- number 可以赋值的内容： 数字，NaN, Infinity
- string 可以赋值的内容： 字符串
- boolean 可以赋值的内容： 布尔值
- Array 可以赋值的内容： 数组
  + 在声明数据为数组类型的时候，需要为数组指定元素的类型
  + 使用方式 let arr: Array<number> = []
- void javascript 中的 undefined
- null javascript 中的 null
- any 当不确定变量类型时使用
- function 可以将变量声明为函数类型
  + 函数名
  + 参数
  + 返回值
- Maybe 相当于给数据添加了两个可能的类型 null 和 void
```js
function a(value: ?string) {
  // ...
}
```

- Flow中的或操作
```js
let a: number|string = 30;
a = 'abc'
```

- 对象类型 `{}`
```js
函数参数为一个对象，并且包含sayHello方法，方法无返回值
function test(obj: {sayHello: () => void}){
  obj.sayHello()
}
```


# 小结
什么是Flow？
- Flow是静态类型检查工具

作用
- Flow能够给JavaScript提供静态类型检查的能力，其实就是为JavaScript添加了一个编译过程
