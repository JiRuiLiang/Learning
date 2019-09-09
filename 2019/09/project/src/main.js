
import Vue from 'vue'
import App from '@/App'
import VueRouter from 'vue-router'
import routes, { beforeEach, afterEach } from './router/' // 引入路由表
import store from './store/' // vuex 单向数据里 core
import { sync } from 'vuex-router-sync'
import http from 'config/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


// 初始化插件
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.prototype.$http = http
const router = new VueRouter({
  routes
})
sync(store, router)
router.beforeEach(beforeEach)
router.afterEach(afterEach)
// 过滤器注册
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

// 只有在本地开发环境才加载vconsole 便于调试
if (process.env.NODE_ENV !== 'production') {
  require('eruda').init()
}
if (process.env.NODE_ENV === 'mock') {
  require('../mock/mock')
}
