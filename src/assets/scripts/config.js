// 开发环境为true 生产环境为false
const DEBUG = true
// 移动端地址
const SERVER_PATH = DEBUG ? `/prefix` : ''

export default {
  SERVER_PATH,
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
    // dev: 'https://www.easy-mock.com/mock/',
    PRO: location.origin
  },
  /**
   * @description 节流间隔时间 毫秒
   */
  THROTTLE_TIME: 1000 * 3,
  /**
   * @description 接口超时时间 毫秒
   */
  TIMEOUT: 1000 * 60 * 10,
  /**
   * @description 分页
   */
  PAGE: 1,
  PAGE_SIZE_10: 10,
  PAGE_SIZE_20: 20,
  PAGER_COUNT: 10 // 最大页码按钮数
}
