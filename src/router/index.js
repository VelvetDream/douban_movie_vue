import Vue from 'vue'
import VueRouter from 'vue-router'

// view
import Home from '../views/Home.vue'
import Subject from '../views/Subject'
import People from '../views/People'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/subject/:movieId',
    component: Subject
  },
  {
    path: '/people/:userId',
    component: People,
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
