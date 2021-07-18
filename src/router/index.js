import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import config from '@/assets/scripts/config'
import ERROR_ROUTES from '@/router/modules/error' // 错误页面路由

const { TITLE } = config

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layout'),
    hidden: true,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '首页', noNeedLogin: true }
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

router.beforeEach(async(to, from, next) => {
  // 登录未过期或打开页面不需要登录
  if (store.getters.getUserInfo) {
    if (to.name !== 'Login') {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    if (to.name === 'Login' || to.meta.noNeedLogin) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }

  return next()
})

router.afterEach(to => {
  // 路由发生变化
  const metaTitle = to.meta.title
  if (metaTitle) {
    window.document.title = `${TITLE}-${metaTitle}`
  }
})

export default router
