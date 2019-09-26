- Node在代码修改后必须重新运行才会生效 `node server.js`
- 使用`supervisor`(监视代码改动，并自动重启Node) `supervisor server.js`, 安装`npm install -g supervisor`(这个工具一般用于解决开发中的调试问题)
- 同步读取文件API： readFileSync.js (读取完文件再执行下面的代码)
```js
var far = require('fs');
var data = fs.readFileSync('file.txt', 'utf-8')
```

事件
  - Node.js 所有的异步I/O操作在完成时都会发送一个事件到事件队列，在开发者看来，事件由`EventEmitter`对象提供。
```js
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function(){
  console.log('some_event occured')
})

setTimeout(function(){
  event.emit('some_event')
}, 1000)
```


## NodeJS 核心模块
**全局对象**
- global
**常用工具**
**事件机制**
**文件系统访问**
**HTTP服务器与客户端**
