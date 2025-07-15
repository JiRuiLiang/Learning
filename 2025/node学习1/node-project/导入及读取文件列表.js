const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const math = require('./modules/math');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 获取文件后缀
    cb(null, Date.now() + ext);  // 时间戳 + 后缀格式
  }
});
const upload = multer({ storage: storage });
const app = express();

// 新增中间件：解析JSON请求体
app.use(express.json())

// 请求失败时记录日志
app.use((err, req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(err)
})

// 路由处理
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/math', (req, res) => {
  if (!req.query.a || !req.query.b) {
    return res.status(400).json({code: 400, msg: '缺少参数a或b'});
  }
  res.json({
    result: math.add(Number(req.query.a), Number(req.query.b))
  })
});

app.get('/fs', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  const content = fs.readFileSync(filePath, 'utf-8');
  res.status(200).json({data: content});
})

app.get('/files', async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');
    const files = await fs.readdir(uploadDir);
    console.log(files)
    const fileList = await Promise.all(files.map(async (file) => {
      const filePath = path.join(uploadDir, file);
      const stats = await fs.stat(filePath);
      return {
        name: file, 
        size: parseInt(stats.size / 1024) + 'kb', 
        createdAt: stats.birthtime
      };
    }));
    res.json({code: 200, data: fileList})
  } catch(err) {
    res.status(500).json({code: 500, msg: err})
  }
})

app.post('/files', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ code: 400, msg: '未上传文件' });
    }
    res.status(200).json({
      code: 200,
      msg: '文件上传成功',
      filename: req.file.originalname  // 返回原始文件名
    });
  } catch(err) {
    res.status(500).json({ code: 500, msg: '文件上传失败' });
  }
});

// 新增POST请求处理
app.post('/api/data', (req, res) => {
  if(!req.body.content) {
    return res.status(400).json({code: 400, msg: '缺少content字段'});
  }

  // 保存到文件
  const filePath = path.join(__dirname, 'data', 'post-data.json');
  fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
  res.json({
    code: 200,
    msg: '数据保存成功',
    data: req.body
  })
})

// 托管静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 启动服务器
app.listen(3000, () => {
  console.log('http://localhost:3000');
});

