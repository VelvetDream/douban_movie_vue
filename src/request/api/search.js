/** 搜索API模块 */
import myAxios from '../myAxios'
import domain from '../domain'

const search = {
  /**
   * 豆瓣搜索提示
   *
   * @param {*} params keyword:关键字 offset limit
   * @returns
   */
  doubanTips(params) {
    return myAxios.get(domain.plus + '/search/douban/tips', {
      params: params
    })
  }
}

export default search