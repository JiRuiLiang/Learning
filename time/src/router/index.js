import Vue from 'vue'
import Router from 'vue-router'
import Time from '@/view/beginningtoend'
import Animation from '@/view/test'
import Swiper from '@/view/swiper'
import Flex from '@/view/flex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Time',
      component: Time
    },
    {
      path: '/animation',
      name: 'animation',
      component: Animation
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper
    },
    {
      path: '/flex',
      name: 'flex',
      component: Flex
    }
  ]
})
