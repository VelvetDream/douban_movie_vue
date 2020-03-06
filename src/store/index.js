import Vue from 'vue'
import Vuex from 'vuex'
import Test1 from './module/Test1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登录用户信息
    userInfo: null
  },
  getters: {
    /**
     * 获取当前登录用户信息
     *
     * @param {*} state
     * @returns
     */
    getUserInfo: function (state) {
      if (state.userInfo) {
        return state.userInfo
      }
    },
    /**
     * 获取当前登录用户token
     *
     * @param {*} state
     * @returns
     */
    getToken: function (state) {
      if (state.userInfo) {
        return state.userInfo.access_token
      }
    },
    /**
     * 判断当前用户是否过期
     *
     * @param {*} state
     * @returns
     */
    getIsExpired: function (state) {
      if (state.userInfo) {
        return state.userInfo.expires_in
      }
    }
  },
  mutations: {
    /**
     * 更新当前登录用户信息
     *
     * @param {*} state
     * @param {*} userInfo
     */
    updateUserInfo: function (state, userInfo) {
      state.userInfo = userInfo
    },
    /**
     * 清除当前登录用户信息
     *
     * @param {*} state
     */
    clearUserInfo: function (state) {
      state.userInfo = null
    }
  },
  actions: {
    /**
     * 用户登录
     *
     * @param {*} state
     * @param {*} params email,password
     */
    userLogin: function (context, params) {
      return new Promise((resolve, reject) => {
        this.$api.user.userLogin(params).then(res => {
          context.commit('updateUserInfo', res)
        })
      })
    },
    /**
     * 清除当前用户信息
     *
     * @param {*} context
     */
    clearUserInfo: function (context) {
      context.commit('clearUserInfo')
    }
  },
  modules: {
    Test1: Test1
  }
})
