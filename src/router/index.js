import Vue from 'vue'
import Router from 'vue-router'
import config from '@/assets/scripts/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

import Layout from '@/layout'
import ERROR_ROUTES from '@/router/modules/error' // 错误页面路由

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const { TITLE } = config

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', requireAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  ...ERROR_ROUTES
]

const createRouter = () => new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 获取Token
  const hasToken = getToken()
  // 登录未过期或打开页面不需要登录
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (to.meta.requireAuth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      NProgress.done()
    } else {
      next()
    }
  }
})

router.afterEach(to => {
  // 结束进度条
  NProgress.done()
  // 路由发生变化
  const metaTitle = to.meta.title
  if (metaTitle) {
    window.document.title = `${TITLE}-${metaTitle}`
  }
})

export default router
