import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      // 登录
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      // 主页
      name: 'Index',
      path: '/index/:id',
      component: Index
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('heima_back_news_token')
  // 如果是跳到登录页的情况，直接下一步
  if (to.path === '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
