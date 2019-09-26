## TypeScript是什么？
- 是一种开发语言
- TypeScript是微软公司开发的一款开源的JavaScript超集语言
- JavaScript超集： 当前任何JavaScript都是合法的TypeScript代码
- TypeScript主要是为JavaScript提供了类型系统和ES6语法的支持

# 安装
TypeScript命令行工具的安装（TS编译器）
`npm i typescript -g`
安装好了之后，全局会提供一个`tsc`命令给我们使用

## 编写TypeScript代码
```ts
let num: number = 100
```
## 通过tsc进行编译，最终运行
`tsc *.ts` 编译.ts文件

## ts 配置文件
1. 创建ts配置文件 tsconfig.json
`tsc --init`  

2. 设置配置项
  * target: 指的就是将ts代码要转换成那个版本的js代码
  * module: 指的就是将ts代码转换成js代码之后，使用的模块化标准是什么
  * outDir: 指的就是将ts代码转换成js代码之后，js代码存放的文件夹路径
  * rootDir: 指的就是要将哪个目录中的ts代码进行转换，ts代码的存放路径
  * strict: 是否要将ts代码转换为严格模式的js代码
3. 使用配置文件
`tsc -p ./tsconfig.json` 根据配置文件编译.ts文件


## ts中的类型
- number
  + 10
  + NaN
  + Infinity
  + 16进制
  + 二进制
  + 八进制
- string
  + 双引号扩选的字符串
  + 单引号扩选的字符串
  + 反引号扩选的字符串
- boolean
  + true
  + false
- Array
- Tuple 元组: 表示类型允许一个已知元素数量和类型的数组
- void 空值： undefined
- undefined
- null
- any
- never 一般用在不可能返回内容的函数的返回值类型设置
- enum 枚举类型
```ts
enum Gender {
  male = 1,
  femal = 0,
  unknow = -1
}
let gender: Gender = Gender.male;
```
- 类型断言
```ts
let str: any = "abc";
let len: number = (<string>str).length;
```

## ts中的类
```ts
// 和ES6不同的是，TS中属性必须声明，需要指定
class Person {
  name: string
  // 声明好属性之后，属性必须赋值一个默认值或者在构造函数中进行初始化
  constructor (name: string) {
    this.name = name
  }
}
```

## ts中类的继承
```ts
class Animal{
  age: number
  constructor(age: number){
    this.age = age;
  }
  eat(){
    console.log('吃东西')
  }
}
// 使用extends指定要继承的类
class Dog extends Animal{
  type: string
  constructor(type: string, age: number){
    super(age) // 调用继承时必须调用super
    this.type = type
  }
}
var dog = new Dog('雪纳瑞', 10);
```

## ts中的访问修饰符
访问修饰符： 指的就是可以在类的成员前通过添加关键字来设置当前成员的访问权限
- public: 公开的，默认  所有人都可以进行访问
- private: 私有的，只能在当前类中进行访问
- protected: 受保护的，只能在当前类或者子类中进行访问
```ts
enum Color{
  red,
  yellow,
  blue
}

class Car{
  // 如果不加访问修饰符，则当前成员是默认公开的，所有人都可以访问
  public color: Color
  constructor() {
    this.color = Color.red
  }
  // 加了private之后，当前成员就只能在当前类中使用了
  private run(){

  }

  // 加了protected之后，当前成员就只能在当前类中或者子类中使用了
  protected loadPeople(){

  }
}

let byd = new Car()
// byd.Color
// byd.run(); // 报错
// byd.loadPeople() // 报错
class Audi extends Car{
  sayHi() {
    console.log(this.color)
    // this.run(); // 报错
    this.loadPeople(); // 可以使用，继承自父类
  }
}
```


## ts中的只读属性和参数属性说明
```ts
class Cat {
  // 如果给属性添加了readonly 修饰，则这个属性无法被赋值
  // 而且属性必须在声明的时候或者在构造函数中被赋值！
  // 声明只读属性， 必须在声明的时候就赋值
  readonly name: string = "英短"
}
或者
class Cat {
  readonly name: string
  // type: string
  // 构造函数中给函数前面加上修饰符，就相当于声明了一个属性
  constructor(public type: string){
    this.name = "英短"
    // this.type = type
  }
}

var cat = new Cat("短毛猫")
```

## ts中类成员的存取器
```ts
class People{
  // name: string = ''
  private _name: string = ''
  // 属性的存取器
  get name(): string{
    return this._name
  }
  set name(value: string){
    // 设置器中可以添加相关的校验逻辑
    if(value.length<2 || value.length>5){
      throw new Error('名称不合法')
    }
    this._name = value
  }
}
var p = new People();
p.name = "无名万物之始"
```

## ts中的接口
接口可以理解为一个约定，一个规范
```ts
// 接口使用interface进行声明
interface AjaxOptions{
  url: string
  type?: string // 可选属性，给属性加上？之后，这个属性就是可选的
  data?: object // 可选属性
  success(data: object): void
}

// option参数中 需要包含 url type data success
function ajax(options: AjaxOptions) {

}
ajax({
  url: 'http://www.baidu.com',
  type: 'GET',
  data: {},
  success(data) {

  }
})
```

```ts
interface Point{
  readonly x: number, // 定义为只读属性
  y: number
}
let poi: Point = {
  x: 10,
  y: 10
}
// poi.x = 100 报错，只读属性只能在定义时赋值
```

```ts
interface Point{
  readonly x: number, // 定义为只读属性
  y: number,
  [propName: string]: any // 忽略其他属性
}
let poi1: Point = {
  x: 10,
  y: 10,
  z: 100
}
```

## ts中的函数类型的接口
```ts
interface SumInterFace{
  (a: number, b: number): number
}
let sum: sumInterFace = function(a: number, b: number) {
  return a + b
}


interface PersonInterFace{
  name: string,
  age: number,
  eat():void
}
class XiaoMing implements PersonInterFace{
  name: string = '小明'；
  age: number = 18,
  eat(){

  }
}
```

## ts中接口的继承
**接口继承接口**
```ts
interface TwoDPoint{
  x: number,
  y: number
}
interface ThreeDPoint{
  z: number
}
// 多继承
interface FourDPoint extends ThreeDPoint, TwoDPoint{
  time: Date
}
let poi: FourDPoint = {
  x: 10,
  y: 10,
  z: 100，
  time: new Data()
}
```
**接口继承类**
当接口继承了一个类类型时，他会继承类的成员但不包括其实现。
```ts
class Bird{
  type: string = '鹦鹉'
  fly():void {

  }
}
interface Fly extends Brid {

}
let f: Fly = {
  type: '鸵鸟'，
  fly(): void{

  }
}
```
