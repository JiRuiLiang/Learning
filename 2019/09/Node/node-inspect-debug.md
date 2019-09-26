# Node 调试
Eclipes用不了，需要VPN
node-inspector 也用不了，node 8以后不支持这个
只能换到node-inspect

## `node-inspect` + Chrome 的使用
支持long/async栈跟踪等高级特性，与Chrome可以无缝结合，启动步骤
  1. 执行`node-inspect`命令，启动调试， 例：`node-inspect script.js`；
    - 远程调试`node-inspect <host>:<port>`
  2. 打开Chrome，并在地址栏输入chrome://inspect；
  3. 选择需要调试的JS；

**使用**
1. `node --debug-brk --inspect 文件名`
2. 复制运行命令后生成的URL,在谷歌浏览器中打开
3. 打开调试框，有个绿色六边形按钮，点击打开



缺点
  - 慢，并且node-inspect以弹出窗口的方式打开

- `node --inspect` 默认绑定到127.0.0.1
- 节点检查
  + Node.js Foundation 支持的CLI调试器，它使用Inspector协议
  + 一个版本与Node绑定在一起，可以与之一起使用 `node inspect myscript.js`
  + 最新版本也可以独立安装（例如`npm install -g node-inspect`）并与之一起使用`node-inspect myscript.js`

| 指令 | 含义 |
| --- | ---|
| --inspect | 1. 启用检察器代理，2. 收听默认地址和端口 （127.0.0.1:9229） |
| --inspect[host:port] | 1. 启用检察器代理，2. 绑定到地址或主机(默认值： 127.0.0.1)， 3. 侦听端口（默认值： 9229） |
| --inspect-brk | 1. 启用检察器代理， 2. 收听默认地址和端口（127.0.0.1:9229）3. 用户代码启动前中断 |
| --inspect-brk=[host:port] | 1.启用检察器代理， 2. 绑定到地址或主机(默认值： 127.0.0.1)，3. 侦听端口（默认值： 9229） 4. 用户代码启动前中断 |
| node inspect script.js | 在--inspect标志下运行用户脚本的spawn子进程；并使用main进程运行CLI调试器 |
| node inspect --port=xxxx script.js| 1. 在--inspect标志下运行用户脚本的spawn子进程；并使用main进程运行CLI调试器。2. 侦听端口（默认值：9229） |
