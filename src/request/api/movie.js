/** 电影API模块 */
import myAxios from '../myAxios'
import myJsonp from '../myJsonp'
import domain from '../domain'
import apikey from '../apikey'
// import qs from 'qs'

const movie = {
  /**
   * 电影详情
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  movieDetails (params) {
    return myAxios.get(domain.plus + '/movie/details', params)
  },
  /**
   * 基础场景相关
   *
   * @param {*} params id: 豆瓣电影id
   * @returns
   */
  sceneBases (params) {
    return myAxios.get(domain.plus + '/scene/fotoplace/bases', params)
  },
  /**
   * 知乎相关
   *
   * @param {*} params id: 豆瓣电影id
   * @returns
   */
  zhihuBases (params) {
    return myAxios.get(domain.plus + '/movie/zhihu/bases', params)
  },
  /**
   * 资源相关
   *
   * @param {*} params id: 豆瓣电影id
   * @returns
   */
  resourceBases (params) {
    return myAxios.get(domain.plus + '/movie/resource/bases', params)
  },
  /**
   *  豆瓣电影v2
   *
   * @param {*} doubanMovieId 豆瓣电影ID
   * @returns
   */
  doubanApi (doubanMovieId) {
    return myJsonp(domain.douban + '/movie/subject/' + doubanMovieId + apikey.douban)
  }
}

export default movie
