/** 域名统一管理 */
const domain = {
  // plus后端网关
  plus: process.env.NODE_ENV === 'pro' ? 'http://localhost:8081' : 'http://localhost:8080',
  // 豆瓣电影v2
  douban: 'https://api.douban.com'
}

export default domain
