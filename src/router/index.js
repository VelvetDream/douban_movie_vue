import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// view
import subject from '../views/Subject'
import Login from '../views/Login'
import NeedLogin from '../views/NeedLogin'
import about from '../views/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/subject/:id',
    component: subject
  },
  {
    path: '/about/:id',
    component: about
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/need_login',
    component: NeedLogin,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 切换路由执行
router.beforeEach((to, from, next) => {
  // 当前路由需要token
  if (to.matched.some(r => r.meta.requireAuth)) {
    // 已登录
    if (localStorage.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
