// 案例1 启动服务
/*
var http = require('http')
http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Node.js</h1>');
  res.end('<p>Hello World!</p>');
}).listen(3000);
console.log('HTTP server is listening at port 3000')
*/


// 案例2： 读取文件
/*
var fs = require('fs');
fs.readFile('file.txt', 'utf-8', function(err,data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
});
console.log('end.')
*/

// 案例3： 事件对象
/*
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function(){
  console.log('some_event occured.')
})

setTimeout(function(){
  event.emit('some_event')
}, 1000)
*/


// 案例4：对外暴露
/*
exports.setName = function (thyName) {
  name = thyName
}
exports.sayHello = function() {
  console.log('Hello ' + name);
}
*/

console.log(process)
