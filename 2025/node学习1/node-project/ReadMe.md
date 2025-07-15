# windows 创建文件夹及文件指令
echo 内容 > 文件  重定向输出到文件，会覆盖原文件内容
echo 内容 >> 文件  重定向输出到文件，不会覆盖原文件内容
cat 文件名  查看文件内容
rm 文件名  删除文件
mkdir 文件夹名  创建文件夹
rmdir 文件夹名  删除文件夹
rm -rf 文件夹名  删除文件夹及其内容
cd 文件夹名  进入文件夹

# 学习Node.js
- 核心模块（http/fs/path）
  + http.createServer() 创建服务器
  + fs
    - fs.readFileSync() 使用此方法时可能会导致直接下载文件，需要确定读取文件编码格式
    - fs.writeFile() 写入文件
    - fs.readdir() 读取文件夹
    - fs.unlink() 删除文件
    - fs.mkdir() 创建文件夹
  + path.normalize(path) 获取路径可能会出现 '/math'转为'\math'的情况
- 学习Express框架搭建web服务器
  + app.use() 可以轻松添加全局功能
    - app.use(express.static('public')) 可以将public文件夹作为静态资源目录
      > 这个要注意顺序，应该放在路由的后面
    - app.use(express.json()) 可以解析json格式的请求体
  + res.json() 自动设置JSON响应头
  + res.query 直接获取url参数
  + res.status() 链式调用设置状态码
- 学习操作文件系统 multer（读写文件）
  ```js
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
  ``` 
- 学习数据库连接（MySQL/MongoDB）
  + 启动数据库并制定数据存储路径及日志存储路径
  > `mongod --dbpath=E:\mongodb-data --logpath=E:\mongodb-data\mongod.log --logappend --port=27017`
    - --dbpath：指定数据库文件存储路径（对应您代码中的数据库连接）
    - --logpath：指定日志文件存储路径
    - --logappend：以追加模式写入日志（避免覆盖旧日志）
    - --port=端口号: 指定端口
- 学习现代框架（Nest.js）
  + 安装 `npm install -g @nestjs/cli`
  + 创建 `nest new 项目名 --package-manager npm`
  + 切换到项目 `cd 项目路径`
  + 启动项目 `npm run start`