import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icons'
import config from '@/assets/scripts/config'
import consts from '@/assets/scripts/consts'

/**
 * @description 初始化样式
 */
import '@/assets/styles/index.scss'

/**
 * @description ElementUI
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$consts = consts

/**
 * @description 引入mock, 不使用的时候需要注释掉
 */
process.env.NODE_ENV === 'development' && require('../mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
