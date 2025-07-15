import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/home', component: () => import('@/views/Home.vue') },
  { path: '/file', component: () => import('@/views/file/index.vue') },
  { path: '/login', component: () => import('@/views/user/index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;