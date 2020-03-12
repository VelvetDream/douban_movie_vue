/** 搜索API模块 */
import myAxios from '../myAxios'
import domain from '../domain'

const search = {
  /**
   * 豆瓣电影搜索提示
   *
   * @param {*} params keyword:关键字 offset limit
   * @returns
   */
  movieDoubanTips(params) {
    return myAxios.get(domain.plus + '/search/movie/douban/tips', {
      params: params
    })
  },
  /**
   * 豆瓣影人搜索提示
   *
   * @param {*} params keyword:关键字 offset limit
   * @returns
   */
  celebrityDoubanTips(params) {
    return myAxios.get(domain.plus + '/search/celebrity/douban/tips', {
      params: params
    })
  },
  /**
   * 场景电影搜索提示
   *
   * @param {*} params keyword:关键字 offset limit
   * @returns
   */
  movieSceneTips(params) {
    return myAxios.get(domain.plus + '/search/movie/scene/tips', {
      params: params
    })
  },
  /**
   * 场景地点搜索提示
   *
   * @param {*} params keyword:关键字 offset limit
   * @returns
   */
  placeSceneTips(params) {
    return myAxios.get(domain.plus + '/search/place/scene/tips', {
      params: params
    })
  },
  /**
   * 网易云音乐搜索提示
   *
   * @param {*} params keyword:关键字 offset limit type:1-单曲 10-专辑 1000-歌单
   * @returns
   */
  neteaseMusicTips(params) {
    return myAxios.get(domain.plus + '/music/search', {
      params: params
    })
  },
}

export default search