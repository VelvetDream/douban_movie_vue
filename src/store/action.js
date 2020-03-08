export default {
  /**
   * 异步更新state
   *
   * @param {*} context
   * @param {*} keyValue state对应的键值对
   */
  update: function (context, keyValue) {
    context.commit('update', keyValue)
    // 用户信息保存到
  },
  /**
   * 异步清除state
   *
   * @param {*} context
   * @param {*} key state对应的key
   */
  clear: function (context, key) {
    context.commit('clear', key)
  },
  /**
   * 异步更新state.popups
   *
   * @param {*} state
   * @param {*} keyValue popups键值对
   */
  updatePopups: function (context, keyValue) {
    context.commit('updatePopups', keyValue)
  }
}
