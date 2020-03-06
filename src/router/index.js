import Vue from 'vue'
import VueRouter from 'vue-router'
import elementUi from 'element-ui'

// view
import Home from '../views/Home.vue'
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

export default router
