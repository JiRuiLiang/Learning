// server.js
const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
app.get('/api/getUserInfo', (req, res) => {
  res.send({
    name: '小明',
    age: 18
  })
})

app.listen(3000, function () {
  console.log('启动成功：', 'http://localhost:3000')
})
