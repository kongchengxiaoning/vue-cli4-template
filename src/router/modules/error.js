const ERROR_ROUTES = [
  {
    path: '/500',
    name: 'error_500',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/500'),
    hidden: true,
    meta: { title: '500', noNeedLogin: true }
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401'),
    hidden: true,
    meta: { title: '401', noNeedLogin: true }
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404'),
    hidden: true,
    meta: { title: '404', noNeedLogin: true }
  }
]

export default ERROR_ROUTES

