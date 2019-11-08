// import { getUser } from './api/http.js'
// getUser().then(res => {
//   document.write(res.data.name + res.data.age)
// }).catch(e => {
//   console.error(e)
// })
import str from './hotmodule.js'
console.log(str)
module.hot.accept('./hotmodule.js', function(){
  // 这个函数当hotmodule模块内容更新时触发
  var hotmodule = require('./hotmodule.js')
  console.log(hotmodule)
})
