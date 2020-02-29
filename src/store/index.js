import Vue from 'vue'
import Vuex from 'vuex'
import Test1 from './module/Test1'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data1: 'index state data1'
  },
  getters: {
    getData: function (state) {
      return state.data1 + ' by getters'
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Test1: Test1
  }
})
