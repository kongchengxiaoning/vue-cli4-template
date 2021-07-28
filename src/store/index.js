import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  getters,
  plugins: [
    // 可以有多个持久化实例
    createPersistedState({
      key: `vue2-template`, // 状态保存到本地的 key
      paths: [], // 要持久化的状态，在state里面取
      storage: { // 存储方式定义
        getItem: (key) => localStorage.getItem(key), // 获取
        setItem: (key, value) => localStorage.setItem(key, value), // 存储
        removeItem: (key) => localStorage.removeItem(key) // 删除
      }
    })
  ]
})
