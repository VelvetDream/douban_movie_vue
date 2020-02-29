export default {
  namespaced: true,
  state: {
    data1: ' Test1 state data1'
  },
  getters: {
    getData: function (state, rootState, rootGetters) {
      console.log('Test1 rootState index state--------------')
      console.log(rootState.data1)
      // console.log('Test1 rootState Test1 State--------------')
      // console.log(rootState.Test1.data1)
      console.log('Test1 rootGetters Test1 getters--------------')
      console.log(rootGetters['Test1/getData1'])
      return state.data1 + ' by Test1 getters getData'
    },
    getData1 (state) {
      return state.data1 + ' by getters(getData1)'
    }
  },
  mutations: {
    changeData1ByMutations (state, payload) {
      state.data1 = payload
    }
  },
  actions: {
    changeData1ByActions (content, payload) {
      setTimeout(() => {
        content.commit('changeData1ByMutations', payload)
      }, 2000)
    }
  }
}
