import Vue from 'vue'
import Router from 'vue-router'
import Time from '@/view/beginningtoend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Time',
      component: Time
    }
  ]
})
