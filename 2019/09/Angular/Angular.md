Angular6 基础知识
- Angular CLI
- 模块
- 组件
- 模板
- 数据绑定
- 服务
- 路由
- HttpClient (基于RxJS响应式编程)

## Angular Cli 的使用
- `npm i @angular/cli -g` 全局安装 angular-cli (要加版本号)
- `ng -v` 查看安装版本号
- `ng new my-app` 创建一个angular项目
- `ng serve --open` 启动项目并在浏览器中打开
- `ng g c 子组件名称` 创建子组件
- `ng g m todos` 创建模块  

## Angular 目录结构

- e2e                 端到端测试目录
- src                 源文件（开发目录）
    |--- app                项目源文件（重点）
            |-- app.component.css         app组件样式
            |-- app.component.html        app组件模板
            |-- app.component.spec.css    app组件单元测试
            |-- app.component.ts          app组件JS(TS)代码
            |-- app.module.ts             根模块
    |--- assets             存放图片等资源文件
    |--- browserslist       浏览器支持列表
    |--- environments       运行环境配置： 开发or生产
    |--- favicon.ico        出现在浏览器标签上的应用图标
    |--- index.html         项目首页
    |--- karma.conf.js      karma测试运行器的配置
    |--- main.ts            项目入口
    |--- polyfills.ts       导入js，兼容老版本浏览器
    |--- style.css          全局样式
    |--- test.ts            测试入口
    |--- tsconfig.app.json  TypeScript编译器配置
    |--- tsconfig.spec.json 单元测试文件
    |--- tslint.json        额外的TypeScript语法检察器配置
- .editorconfig       编辑器统一风格配置文件
- .gitignore          git忽略文件
- angular.json        Angular CLI 脚手架配置
- README.md           说明文件
- package.json        npm配置文件
- tsconfig.json       TypeScript 编译器配置
- tslint.json         TypeScript 语法检察器配置

## tslint配置
1. 在`/tslint.json`中找到要修改的配置文件
2. 将其添加到 `src/tslint.json`文件中（或直接在`/tslint.json`中修改）

## 组件（commonents）
- 1 [组件名称].component.html
- 2 [组件名称].component.css
- 3 [组件名称].component.ts
- 单元测试文件 [组件名称].component.spec.css

## 模块
- 根模块
  - HttpModule
  - BrowerModule
  - 自定义模块
- 每个应用至少有个Angular模块，称为根模块
- 它通常命名为 AppModule
- 根模块的作用： 启动应用
- 模块是独立、封闭的
- 模块之间的引用通过导入和导出来完成

## @NgModule 装饰器
- @NgModule 是Angular提供的装饰器
- 用来告诉Angular将这个类当做模块来处理
- 语法 @NgModule({元数据对象})

- 装饰器是一个函数
- 作用： 修饰紧随其后的类或属性
- 装饰器是JavaScript的一种语言特性，处于语法提案的stage2阶段，是一个试验特性
- 装饰器又叫注解

**@NgModule 的元数据对象**
- declarations  该模块所拥有的组件
- imports       该模块依赖的模块，比如：BrowserModule
- providers     该模块所拥有的服务提供商
- bootstrap     指定根组件，只有根模块需要该配置项Angular创建它并插入index.html 宿主页面
- exports       公开该模块其中的一部分，以便外部模块使用它们
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**@Component 装饰器**
- selector        选择器（组件名称），对应HTML中的组件名称
- template        组件的内联模板
- templateUrl     组件模板文件的URL
- styleUrls       指定了组件的样式文件
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: '<div>内联模板</div>'
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-project';
}
```

**数据绑定**
- 插值表达式 {{}}
- 属性绑定 [href] = " "
- 事件绑定 (click) = " "
- 双向数据绑定 [(ngModel)] = " "
  + 需要导入一个表单模块才能生效
  + 导入： import {FromsModule} from '@angualr/forms'
  + 在根组件内导入： modles: [FromsModule]
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template: '<div>内联模板</div>',
  template: '<div>{{title}}</div>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-project';
}
```

**语言服务**
让你在模板中获得以下功能
- 自动完成
- 错误检查
- 给出提示
- 内部导航
需要安装插件：angular language service

**指令**
- [(ngModel)] 在表单元素中实现双向数据绑定的指令
- (click)     事件绑定指令
- [href]      属性绑定指令

指令分类
- 组件          拥有模板的指令
- 属性型指令     改变元素外观或行为的指令
  + [ngClass] = "对象"  动态添加或移除多个CSS类[对象key为类名，值为布尔值]
  + [class.test] = "布尔值"  操作单个类
  + [ngStyle] = "对象" [对象key为属性，值为css属性值]   动态设置内联样式
  + [style.fontSize] = "fz"  [fz应该是一个属性值]  操作单个属性
- 结构型指令    
  + `*ngIf`  控制元素的展示和隐藏
  + `*ngFor`  重复器，遍历数据，批量生成元素
    - `*ngFor` 添加trackBy
    - 目的： 提升渲染对象数组的性能

## 父子组件通信
子组件
  引入 Output，EventEmitter 模块
  声明事件
  add = new EventEmitter()
  声明方法，向父组件传递数据
  this.add.emit(传递的参数)
  绑定事件 (click)="addTodo()"
```html
<div (click)="addTodo($event)">
  绑定事件
</div>
```
```ts
@Output() // 向外暴露
add = new EventEmitter() // 提供事件

// 添加任务
addTodo() {
  this.add.emit(this.data) // 传递数据
}
```
父组件
  绑定事件 (add)="addTodo($event)"
  $event 获取子组件传递过来的内容
```html
<!-- 接收子组件传递的数据 -->
<app-child (add)="addTodo($event)"></app-child>
```
```ts
addTodo(obj) {
  // 打印子组件传递过来的数据
  console.log(obj)
}
```

## 父组件传递数据给子组件
```html
<app-child [todos]="todos"></app-child>
```
```ts
导入 Input 装饰器
@Input()
todos
```

## TypeScript 语法
- 类型注解 为函数或变量添加约束
  + 赋值无需添加类型注解
- 接口 对值所具有的结构进行类型检查
  + 创建接口
```ts
interface Todo {
  id: number,
  name: string,
  done: boolean
}

// 另一种方式
implements xxx
export class TodoComponent implements OnInit {

  ngOnInit
}
```
- 泛型 <>泛型类`EventEmitter`约定参数类型
```ts
@Output()
add = new EventEmitter<string>()
```
- 类成员修饰符 public公共（默认）、private（私有）
```ts
public todoName: string
```

## 服务
服务和组件区别
- 组件应该只提供用于数据绑定的属性和方法
- 组件不应该定义任何诸如从服务器获取数据、验证用户输入等操作
- 应该把各种处理任务定义到可注入的服务中
- 服务的作用： 处理业务逻辑，供组件使用
- 服务和组件的关系： 组件是服务的消费者

服务的作用说明
- 通过 @Injectable() 装饰器来表示一个服务
- 服务需要注册提供商才可以使用
- Angular通过依赖诸如（DI） 来为组件提供服务
- DI使得在使用服务时，只提供要使用的服务即可。不需要手动创建服务实例
- 推荐在constructor中提供组件中用到的服务

### 服务的创建和使用
- `ng g s todos/todos` 在todos文件夹下创建服务
- 上面的命令会生成一个`todos.service.ts`文件
```ts
import { Injectable } from '@angular/core';

@Injectable({ // 提供商
  providedIn: 'root'  // 在所有组件中都可以使用
})
export class TodosService {
  constructor() { }
}
```
- 在组件中引用
```ts
import {TodosService} from '../todos.service'
、、、
// 在组件中操作
export class TodoComponent implements OnInit, OnChanges {
  // 告诉组件，组件中需要用到这个服务
  constructor(private todosService: TodosService){}
}
```

### 注册提供商的三种方式
- 通过`@Injectable`的`providedIn: 'root'` 注册为根级服务提供商
  - 全局可用
- 通过`@NgModule` 的 `providers: []`注册为模块内可用的服务提供商
  - 模块内可用
- 通过`@Component`的`providers: []` 注册为组件的提供商
  - 父组件注册，所有子组件可用

## HttpClient
### 说明
- http客户端，用于发送Http请求
- 封装了浏览器提供的 XMLHttpRequest接口
- 使用基于可观察 (Observable) 对象的API
- 提供了请求和响应拦截器
- 流式错误处理机制

### HttpClient的使用
```ts
import { Component } from '@angular/core'

// 引入HttpClient 模块
import { HttpClient, HttpResponse } from '@angular/common/http'

interface Todo {
  name: string,
  description: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // 在组件中创建一个https属性
  constructor(private http: HttpClient){}
  name: string
  // getData(){
  //   this.http.get<Todo>('../assets/todos.json').subscribe((res: Todo) => {
  //     console.log(res)
  //     this.name = res.name
  //   })
  // }

  // getData(){ // 获取完整响应，响应头...
  //   this.http.get<Todo>('../assets/todos.json', {observe: 'response'}).subscribe((res: Todo) => {
  //     console.log(res)
  //     this.name = res.name
  //     res.headers.get('content-type') // 获取响应头信息
  //   })
  // }
  getData(){ // 响应添加类型约束
    this.http.get('../assets/todos.json', {observe: 'response'}).subscribe((res: HttpResponse<Todo>) => {
      console.log(res)
      this.name = res.name
      res.headers.get('content-type') // 获取响应头信息
    })
  }
}
```

### json-server 提供接口
- 安装: `npm i -g json-server`
- 新建一个json文件: `db.json`
- 运行 json-server: `json-server db.json`

请求接口如下
- GET /posts  请求数据
- POST /posts  添加数据
- PATCH /posts/1 修改数据
- DELETE /posts/1 删除数据

## 路由
- 路由是实现SPA（单页面应用程序）的基础设施
- 作用： 让用户从一个视图导航到另一个视图
- 路由是： URL和组件的对应规则
- 使用： HTML5风格(history.pushState)的导航
- 支持： 重定向、路由高亮、通配符路由、路由参数
- 支持： 子路由、路由模块、路由守卫、异步路由等

### 路由的使用步骤
- 在index.html 文件内添加`<base href="/">`
- 导入 RouterModule 模块
- 配置路由规则appRoutes
- 将RouterModule.forRoot(appRoutes)模块配置在根模块中
- 使用<router-outlet></router-outlet>指定路由出口

```ts
import { BrowerModule } from '@angular/platform-browser'
import { NgModel } from '@angular/core'

// 导入路由模块，路由规则
import { RouterModel, Routes } from '@angular/router'

// 导入组件
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

// 配置路由规则
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
]

@NgModel({
  declarations: [AppComponent, HomeComponent],
  // RouterModel.forRoot(appRoutes) 导入路由规则
  // 配置路由模块为根模块的依赖项
  imports: [BrowserModule, RouterModel.forRoot(appRoutes)]，
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
### forRoot 的说明
- 问题说明： 服务应该是单例的，某些场景下会造成服务多次注册，破坏服务的单例特性
- 比如： 路由懒加载
- 解决方式： 使用模块的forRoot()方法导入模块
- RouterModule的forRoot()保证项目中只有一个Router服务
