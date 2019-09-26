#Angular基础知识
##Angular CLI

##模块
[模块](./img/01.png)
  + 每个应用至少有一个Angular模块
  + 通常命名为AppModule
  + 根模块的作用： 启动应用
  + 模块是独立、封闭的
  + 模块之间的引用通过导入和导出来完成
  + 模块中包含的内容
    - 组件
      + @Component装饰器
        - selector 选择器（组件名称），对应HTML中的组件名称
        - template 组件的内联模板
        - templateUrl 组件模板文件的URL
        - styleUrls 组件样式文件数组    
    - 服务
    - 指令
      + 组件 拥有模板的指令
      + 属性型指令 改变元素外观和行为的指令
        - [ngClass] 动态添加或移除类
        - [ngStyle] 动态设置内联样式
      + 结构性指令 添加和移除DOM元素改变DOM布局的指令
        - \*ngIf 控制元素的展示和隐藏
        - \*ngFor 重复器，遍历数据，批量生成元素
          + \*ngFor 添加trackBy
            - 目的： 提升渲染对象数组的性能
            - 语法 trackBy:trackBy方法名称
    - 注意：这些内容必须在模块中配置后才有效
#### @NgModule装饰器
  - 装饰器是一个函数
  - 作用： 修饰紧随其后的类或熟悉
  - 装饰器是JavaScript的一种语言特性，处于语法提案的stage2阶段，是一个试验特性
  - 装饰器又叫做注解
  - @NgModule是Angular提供的装饰器
  - 用来告诉Angular将这个类当做模块来处理
  - 语法：@NgModule({元数据对象})
  - @Ngmodule装饰器的元数据对象
    + declarations 该模块所拥有的组件
    + imports 该模块所依赖的模块，比如：BrowserModule
    + providers 该模块所拥有的服务提供商
    + bootstrap 指定根组件，只有根模块需要改配置项，Agular创建它并插入index.html宿主页面
    + exports 公开该模块其中的一部分，以便于外部模块使用它们

##模板

##数据绑定
- 插值表达式 {{}}
- 属性绑定 [属性名称]=""
- 事件绑定 (事件名称)=""
- 双向数据绑定 [(ngModel)]=""

##服务
作用
  - 组件应该只提供用于数据绑定的属性和方法
  - 组件不应该定义任何诸如从服务器获取数据、验证用户输入等操作
  - 应该把各种处理任务定义到可注入的服务中
  - 服务的作用：处理业务逻辑，供组件使用
  - 服务和组件的关系：组件是服务的消费者

说明
  - 通过`@Injectable()`装饰器来表示一个服务
  - 服务需要注册提供商才可以使用
  - Angular通过依赖注入(DI)来为组件提供服务
  - DI使得用户在使用服务时，只提供要使用的服务即可。不需要手动创建服务实例
  - 推荐在constructor中提供组件中用到的服务

注册提供商的三种方式
  1. 通过`@Injectable`的`providedIn:'root'`注册为根级提供商
  2. 通过`@NgModule`的`providers:[]`注册为模块内可用的提供商
  3. 通过`@Component`的`providers:[]`注册为组件的提供商
##路由
- 路由是实现SPA（单页应用程序）的基础设施
- 作用：让用户从一个视图导航到另一个视图
- 路由是: URL和组件的对应规则
- 使用：HTML5风格（history.pushState）的导航
- 支持: 重定向、路由高亮、通配符路由、路由参数
- 支持：子路由、路由模块、路由守卫、异步路由等

路由的使用步骤
  - 在index.html中设置<base href="/">
  - 导入 RouterModule 模块
  - 配置路由规则 appRoutes
  - 将RouterModule.forRoot(appRoutes)模块配置在根模块中
  - 使用<router-outlet></router-outlet> 指定路由出口
  - 使用routerLink="/home"指定导航链接

forRoot说明
  - 问题说明：服务应该是单例的，某些场景下会造成服务多次注册
  - 比如：路由懒加载的情况
  - 解决方式：使用模块的forRoot()方法导入模块
  - RouterModule的 forRoot()保证项目中只有一个Router服务

路由守卫
  - 用 CanActivate 来处理导航到某路由的情况
  - 用 CanActivateChild 来处理导航到某子路由的情况
  - 用CanDeactivate来处理从当前路由离开的情况
  - 用Resolve在路由激活之前获取路由数据
  - 用CanLoad来处理异步导航到某特性模块的情况

路由守卫实现访问控制思路
  - 登录成功后，将token存储在缓存中
  - 在路由守卫CanActivate中判断是否有token
  - 如果有就放行
  - 如果没有就跳转登录
  - 注意：不校验登录页面

路由模块的使用
  - 创建路由模块：ng g m app-routing --flat --module=app
  - --flat: 在src/app中创建路由文件，而不是在单独的目录中
  - --module=app: 将该模块注册到AppModule中

路由守卫使用步骤
  - 创建：ng g gurd auth
  - 在路由模块中添加导入auth guard
  - 给home路由添加CanActivate 守卫

异步路由的使用
  - 创建带有路由的模块：ng g m 模块名 --routing
  - 在指定模块中创建组件：ng g c 模块/组件
  - 在 模块名-routing 中配置路由规则
  - 在app-routing 通过loadChildren异步加载模块
  - 注意： 不要在根模块中加载子模块

##HttpClient (基于RxJS响应式编程)
- 作用：发送Http请求
- 封装了浏览器提供的XMLHttpRequest接口
- 使用基于可观察(Observable)对象的API
- 提供了请求和响应拦截器
- 流式错误处理机制

拦截器的使用
  - 手动创建拦截器服务auth.interceptor
  - 继承接口 HttpInterceptor 并实现 intercept() 方法
  - 参数一：req:HttpRequest<any>请求头对象
  - 参数二：next:HttpHandler下一个拦截器，如果只有一个，则会把请求发给服务器，并接受服务器的响应
  - req的属性是只读
  - 修改请求方式：克隆，修改克隆的内容，把修改后的克隆内容传给next.handle()

## 父子组件通信
[父子组件通信](./img/02.png)
[父子组件通信](./img/03.png)


技术栈
- 表单组件库 NG-ZORRO
- 服务： json-server

项目搭建
- 创建项目：ng new 项目名称
- cd 项目下
- 安装antd: ng add ng-zorro-antd
- 启动服务：ng serve --open
