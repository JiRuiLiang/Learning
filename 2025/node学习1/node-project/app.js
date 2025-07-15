const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
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
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/node-project')
.then(() => {
  console.log('数据库连接成功');
})
.catch(err => {
  console.log('数据库连接失败', err);
})



// 文件表 start ==============================
const fileSchema = new mongoose.Schema({
  filename: String, // 文件名
  size: Number, // 文件大小
  filePath: String, // 文件路径
  path: String, // 文件下载路径
  createdAt: Date // 创建时间 
})
const File = mongoose.model('File', fileSchema);
// 文件表 end ================================

// 用户表 start ==============================
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  username: { 
    type: String, unique: true,
    validate: {
      validator: v => /^[a-zA-Z0-9_]{3,20}$/.test(v),
      message: "用户名需要为3-20为字母数字组合"
    }
  },
  password: { 
    type: String,
    set: v => bcrypt.hashSync(v, 10)
  },
  createdAt: { type: Date, default: Date.now }
})
const User = mongoose.model('User', userSchema);
// 文件表 end ================================

// 新增用户认证中间件
const jwt = require('jsonwebtoken');
const config = require('./config');

const auth = async (req, res, next) => {
  try {
    // const token = req.headers.token; // 获取token
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, config.SECRET_KEY)
    res.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (e) {
    res.status(401).json({ code: 401, msg: '认证失败' });
  }
}


// 文件上传
app.post('/files', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.originalname, // 文件名
      size: req.file.size, // 文件大小
      filePath: req.file.path, // 文件路径
      path: req.file.path.split('uploads')[1], // 文件路径
      createdAt: Date.now() // 创建时间
    }) 
    await file.save();
    res.status(200).json({code: 200, data: file});
  } catch (err) {
    console.error('数据库保存错误：', err);
    res.status(500).json({code: 500, msg: err});
  }
})

// 获取文件列表
app.get('/files', auth, async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json({ code: 200, data: files.map(file => ({...file.toObject(), id: file._id})) });
  } catch(err) {
    res.status(500).json({ code: 500, msg: 'aaa' + err.message });
  }
});

// 删除文件
app.delete('/files/:id', auth, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ code: 404, msg: '文件不存在' });
    }
    await fs.unlink(file.filePath); // 删除文件
    await File.deleteOne({ _id: req.params.id }); // 删除文件记录
    res.json({ code: 200, msg: '文件删除成功' });
  } catch(err) {
    res.status(500).json({ code: 500, msg: err.message }); 
  }
})

// 注册
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ code: 200, msg: '注册成功', data: user });
  } catch(e) {
    const message = e.code === 11000 ? '用户名已存在' : '注册失败';
    res.status(500).json({ code: 500, msg: message });
  }
})

// 登录
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) return res.status(401).json({ code: 401, msg: '用户名或密码错误'});
    const token = jwt.sign({ id: user._id}, config.SECRET_KEY, {expiresIn: '2h'});
    res.json({ code: 200, token, username: user.username });
  } catch(e) {
    res.status(500).json({ code: 500, msg: '登录失败' });
  }
})

// 托管静态文件
app.use(express.static(path.join(__dirname, 'uploads')));
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})