const ERROR_ROUTES = [
  {
    path: '/401',
    name: 'error_401',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401'),
    meta: {
      title: '401',
      noNeedLogin: true
    }
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404'),
    meta: {
      title: '404',
      noNeedLogin: true
    }
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/500'),
    meta: {
      title: '500',
      noNeedLogin: true
    }
  }
]

export default ERROR_ROUTES

