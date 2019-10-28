1. webpack核心概念
  - 入口（`entry`）: 入口起点(`entry point`)指示 `webpack` 应该使用哪个模块，来作为构建其内部依赖图的开始
  - 输出（output）: `output` 属性告诉 `webpack` 在哪里输出它所创建的 `bundles` ，以及如何命名这些文件，默认值为 `./dist`
  - loader
    + `loader` 让 `webpack` 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）
  - 插件（plugins）
    + `loader` 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量
  - 模式
    + 通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 `webpack` 内置的优化

2. webpack本地开发怎么解决跨域的?
  - 下载 webpack-dev-server 插件
  - 配置 webpack.config.js 文件
  - 通过proxy: {} 配置代理

3. 怎么配置单页应用？怎么配置多页应用
  - 单页应用可以理解为 `webpack` 的标准模式，直接在 `entry` 中指定单页应用的入口即可
  - 多页应用的话，可以使用 `webpack` 的 `AutoWebPlugin` 来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范

4. 什么是bundle,什么是chunk，什么是module
  - `bundle` 是由 `webpack` `打包出来的文件，chunk` 是指 `webpack` 在进行模块的依赖分析的时候，代码分割出来的代码块。`module`是开发中的单个模块

5. webpack与grunt、gulp的不同
  - `grunt` 和 `gulp`是基于任务和流的。找到一个（或一类）文件，对齐做一系列链式操作，更新流上的数据，整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程
  - `webpack` 是基于入口的。`webpack`会自动地递归解析入口所需加载的所有资源文件，然后用不同的`Loader`来处理不同的文件, 用Plugin来扩展`webpack`功能
  - `webpack` 与前者最大的不同就是支持代码分割，模块化（AMD,CommonJ,ES2015），全局分析

6. 有哪些常见的Plugin? 他们是解决什么问题的
  - `define-plugin`：定义环境变量
  - `commons-chunk-plugin`：提取公共代码

7. Loader与Plugin的不同
  + loader加载器
    - Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件. Loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力
    - 在 module.rules 中配置，也就是说他作为模块的解析规则而存在，类型为数组
  + Plugin 插件
    - 扩展 webpack 的功能，让 webpack 具有更多的灵活性
    - 在 plugins 中单独配置。类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入

8. webpack的构建流程是什么
  - 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
  - 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
  - 确定入口：根据配置中的 entry 找出所有的入口文件
  - 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
  - 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
  - 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  - 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

  > 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果

9. 是否写过Loader和Plugin？描述一下编写loader或plugin的思路
  > 编写 Loader 时要遵循单一原则，每个 Loader 只做一种"转义"工作。 每个 Loader 的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用 this.callback() 方法，将内容返回给 webpack 。 还可以通过 this.async() 生成一个 callback 函数，再用这个 `callback` 将处理后的内容输出出去
  
  > 相对于 Loader 而言，Plugin 的编写就灵活了许多。 webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果
