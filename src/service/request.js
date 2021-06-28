/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 * create by lvzhiyang
 */
import axios from 'axios'
import config from '@/assets/scripts/config'
import store from '@/store'

// 创建axios实例
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? config.BASE_URL.PRO : config.BASE_URL.DEV // 测试环境用dev 生产环境用pro
axios.defaults.timeout = config.TIMEOUT

// 设置允许带cookie
axios.defaults.withCredentials = true

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 节流计时器
let throttleTimer = null

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    // 开发环境使用固定token
    if (process.env.NODE_ENV === 'development') {
      // config.headers.common['token'] = ''
    }
    if (config.isThrottle) {
      if (throttleTimer) {
        return Promise.reject({
          data: { codemsg: '请勿频繁操作～' }
        })
      } else {
        throttleTimer = setTimeout(() => {
          throttleTimer && clearTimeout(throttleTimer)
          throttleTimer = null
        }, config.THROTTLE_TIME)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  res => {
    // 错误处理
    switch (res.data.code) {
      // token过期清除token并跳转登录页
      case '403':
        store.dispatch('logout')
        break
      // 404请求不存在
      case '404':

        break
      default:
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export function request(options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        const { code } = res.data
        if (code !== '0000') {
          return reject(res)
        }
        return resolve(res.data)
      })
      .catch(err => {
        if (err && err.request && err.request.readyState === 4) {
          if (err.request.status === 200) {
            console.log('数据请求异常，请联系管理员')
          } else {
            console.log('无网络，请检查网络')
          }
        } else {
          if (err && err.request && err.request.readyState === 0 && err.status === 0) {
            console.log('无网络，请检查网络')
          } else {
            console.log(err.data.codemsg)
          }
        }
        return reject(err)
      })
  })
}
