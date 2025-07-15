const http = require('http');
const fs = require('fs');
const path = require('path');
const math = require('./modules/math');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // 使用path模块处理路径
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const urlPath = parsedUrl.pathname;
  
  if(urlPath === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Home Page");
  } else if (urlPath === '/math') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({result: math.add(1, 2)}))
  } else if (urlPath === '/fs') {
    const filePath = path.join(__dirname, 'data', 'example.txt');
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end(`文件内容：${content}`);
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('File not found');
    }
  } else if(urlPath === '/write') {
    const outputPath = path.join(__dirname, 'files', 'output.txt');
    fs.writeFile(outputPath, 
      JSON.stringify({ timestamp: Date.now(), status: 'OK'}, null, 2),
      (err) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
          return res.end('写入文件失败')
        }
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify({message: '文件写入成功', path: outputPath}));
      }
    )
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("404 Not Found");
  }
})

server.listen(3000, () => {
  console.log('http://localhost:3000');
})