/** 电影API模块 */
import myAxios from '../myAxios'
import myJsonp from '../myJsonp'
import domain from '../domain'
import apikey from '../apikey'

const movie = {
  /**
   * 电影详情
   *
   * @param {*} params id: 豆瓣电影ID
   * @returns
   */
  details (params) {
    return myAxios.get(domain.plus + '/v2/movie/details', params)
  },
  /**
   *  豆瓣电影v2
   *
   * @param {*} doubanMovieId 豆瓣电影ID
   * @returns
   */
  doubanSubject (doubanMovieId) {
    return myJsonp(domain.douban + '/v2/movie/subject/' + doubanMovieId + apikey.douban)
  }
}

export default movie
