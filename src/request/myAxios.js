/**
 * 封装的axios实例
 */
import axios from 'axios'
import router from '../router'

/**
 * 跳转登录页
 * 携带当前页面路由，登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
  * @param {*} code 请求失败的状态码
  * @param {*} msg 错误信息
  */
const errorHandle = (code, msg) => {
  switch (code) {
    // 认证失败
    case 401:
      toLogin()
      break
      // 服务器拒绝提供服务
    case 403:
      //  清除token
      localStorage.removeItem('token')
      break
    default:
      console.log(msg)
  }
}

// 创建axios实例，超时10s
var instance = axios.create({ timeout: 10000 })
// axios的post请求的默认请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * axios请求拦截器
 */
instance.interceptors.request.use(
  config => {
    // 设置请求头token
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.error(error)
  }
)

/**
 * axiuos 响应拦截器
 */
instance.interceptors.response.use(
  // 成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 失败
  error => {
    const res = error.response
    // 错误处理
    if (res) {
      errorHandle(res.status, res.data.msg)
      return Promise.reject(res)
    }
    return Promise.reject(error)
  })

export default instance
