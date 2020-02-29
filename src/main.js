import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuex from 'vuex'
import api from './request/api'

Vue.use(vuex)
Vue.config.productionTip = false

// api挂载到原型
Vue.prototype.$api = api

new Vue({
  router,
  // store实例注入到所有子组件
  store,
  render: h => h(App)
}).$mount('#app')
