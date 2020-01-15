import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import PostList from '@/views/PostList.vue'
import Welcome from '@/views/Welcome.vue'
import Pubulispost from '@/views/Pubulispost.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      // 登录
      name: 'default',
      path: '/',
      component: Login
    },
    {
      // 登录
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      // 主页
      name: 'Index',
      path: '/index',
      component: Index,
      redirect: { name: 'Welcome' },
      children: [
        {
          name: 'PostList',
          path: 'postList',
          component: PostList
        },
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          // 发布文章
          name: 'Pubulispost',
          path: 'pubulispost/:id?',
          component: Pubulispost
        }
      ]
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
