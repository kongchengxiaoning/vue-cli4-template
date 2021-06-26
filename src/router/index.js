import Vue from 'vue'
import VueRouter from 'vue-router'
import $config from '@/assets/scripts/config'

import ERROR_ROUTES from '@/router/modules/error' // 错误页面路由

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/layout'),
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "Home-page" */'@/views/Home'),
        meta: { title: '首页' }
      }
    ]
  },
  ...ERROR_ROUTES
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  // 登录未过期或打开页面不需要登录
  // if (store.getters.getUserInfo && store.getters.getToken) {
  //   if (to.name !== 'Login') {
  //     next()
  //   } else {
  //     next({
  //       path: '/home'
  //     })
  //   }
  // } else {
  //   if (to.name === 'Login' || to.meta.noNeedLogin) {
  //     next()
  //   } else {
  //     next({
  //       path: '/login'
  //     })
  //   }
  // }

  return next()
})

router.afterEach(to => {
  // 路由发生变化
  window.document.title = `${$config.TITLE}-${to.meta.title}`
  window.scrollTo(0, 0)
})

export default router
