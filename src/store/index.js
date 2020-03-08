import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import getters from './getter'
import mutations from './mutation'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登录用户信息
    userInfo: null,
    // 弹窗状态
    popups: {
      // 是否登录
      isLogining: false,
      // 是否注册
      isRegistering: false
    }
  },
  getters,
  mutations,
  actions
})
