/** 域名统一管理 */
const domain = {
  // plus后端网关
  plus: process.env.NODE_ENV === 'pro' ? 'http://localhost:8081/v2' : 'http://localhost:8080/v2',
  // neteaseMusicApi
  neteaseMusicApi: 'http://localhost:10102',
  // 豆瓣电影v2
  doubanV2: 'https://api.douban.com/v2',
  // 豆瓣电影官网
  doubanMovie: 'https://movie.douban.com',
  // 网易云音乐官网
  neteaseMusic: 'https://music.163.com',
  // IMDB官网
  imdb: 'https://www.imdb.com',
  // 烂番茄官网
  tomato: 'https://www.rottentomatoes.com',
  // mtc官网
  mtc: 'https://www.metacritic.com',
  // 知乎官网
  zhihu: 'https://www.zhihu.com',
  // 猫眼官网
  maoyan: 'https://maoyan.com'
}

export default domain