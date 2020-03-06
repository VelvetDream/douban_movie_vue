import Vue from 'vue'
// 第三方组件
import vuex from 'vuex'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自定义组件
import App from './App.vue'
import api from './request/api'
import store from './store'
import router from './router'

// 第三方组件全局注册
Vue.use(vuex)
Vue.use(elementUi)

// 开发环境控制台相关
Vue.config.productionTip = process.env.NODE_ENV === 'pro' ? false : true

// api挂载到原型
  .Vue.prototype.$api = api

// 切换路由之前拦截
router.beforeEach((to, from, next) => {
  // 当前路由需要token
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    // 当前用户已登陆
    if (token) {
      console.log('已登录')
      next()
    } else {
      console.log('未登录')
      // 弹出窗口调用action登录
      //
      // 此处登录成功再跳转
      store.dispatch('userLogin', {})
    }
  } else {
    console.log('当前路由不需要token')
    next()
  }
})

new Vue({
  router,
  // store实例注入到所有子组件
  store,
  render: h => h(App)
}).$mount('#app')
