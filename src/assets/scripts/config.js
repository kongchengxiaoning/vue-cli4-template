// 开发环境为true 生产环境为false
const DEBUG = true

export default {
  /**
   * @description debug
   */
  DEBUG,
  /**
   * @description 配置显示在浏览器标签的title
   */
  TITLE: 'VUE2',
  /** ·
   * @description 图片缺省
   */
  IMG_ERROR: '',
  /**
   * @description  存储token的key
   */
  TOKEN_KEY: 'token',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  COOKIE_EXPIRES: 1,
  /**
   * @description api请求基础路径
   */
  BASE_URL: {
    DEV: '/prefix',
    PRO: location.origin
  },
  /**
   * @description 节流间隔时间 毫秒
   */
  THROTTLE_TIME: 1000 * 3,
  /**
   * @description 接口超时时间 毫秒
   */
  TIMEOUT: 1000 * 60 * 10
}
