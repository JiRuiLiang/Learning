const http = require('http');
const fs = require('fs');
const path = require('path');
const math = require('./modules/math');
const _ = require('lodash');
const { start } = require('repl');

// ... 顶部引入保持不变 ...
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const urlPath = parsedUrl.pathname;

  // 中间件1：记录请求日志
  console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);
  // 中间件2：请求计时开始
  const startTime = Date.now();
  // 中间件3：处理POST请求体
  let body = [];
  req.on('data', chunk => {
    body.push(chunk);
  }).on('end', () => {
    req.body = Buffer.concat(body).toString();
    res.setHeader('X-Powered-By', 'Node.js');
    // 中间件4：认证（示例：简单的token认证） start
    const authToken = parsedUrl.searchParams.get('token');
    if (!authToken && urlPath !== '/') {
      res.writeHead(401, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({code: 401, msg: '请先登录'}));
    }
    // 中间件4：认证（示例：简单的token认证） end

    const handleError = (statusCode, message) => {
      res.writeHead(statusCode, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({code: statusCode, msg: message, timestamp: Date.now()}));
      console.log(`请求处理耗时：${Date.now() - startTime}ms`);
    }
    try {
      const responseTime = Date.now() - startTime;
      res.setHeader('X-Response-Time', `${responseTime}ms`);
      // 路由处理
      if (urlPath === '/') {
        res.writeHead(200, { 
          'Content-Type': 'text/plain',
          'X-Request-Time': `${responseTime}ms`
        });
        res.end("Home Page");
      } else if (urlPath === '/math') {
        // 模拟错误
        if(!parsedUrl.searchParams.has('a') || !parsedUrl.searchParams.has('b')) {
          return handleError(400, '缺少参数a或b');
        }
        const result = math.add(Number(parsedUrl.searchParams.get('a')), Number(parsedUrl.searchParams.get('b')));
        res.writeHead(200, { 
          'Content-Type': 'application/json',
          'X-Request-Time': `${responseTime}ms` 
        });
        res.end(JSON.stringify({result}))
      } else if (urlPath === '/fs') {
        const filePath = path.join(__dirname, 'data', 'example.txt');
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Request-Time': `${responseTime}ms`
          });
          res.end(`文件内容：${content}`);
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
            'X-Request-Time': `${responseTime}ms`
          });
          res.end('File not found');
        }
      } else if(urlPath === '/write') {
        const outputPath = path.join(__dirname, 'files', 'output.txt');
        fs.writeFile(outputPath, 
          JSON.stringify({ timestamp: Date.now(), status: 'OK'}, null, 2),
          (err) => {
            if (err) {
              res.writeHead(500, {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Request-Time': `${responseTime}ms`
              });
              return res.end('写入文件失败')
            }
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8',
              'X-Request-Time': `${responseTime}ms`
            });
            res.end(JSON.stringify({message: '文件写入成功', path: outputPath}));
          }
        )
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
          'X-Request-Time': `${responseTime}ms`
        });
        res.end("404 Not Found");
      }
    } catch (err) {
      console.error(err);
      handleError(500, '服务器内部错误');
    }
  });
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
})