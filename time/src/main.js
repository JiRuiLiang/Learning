// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 样式文件一定要引入
import * as filter from './lib/filter' // 全局过滤器

Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
