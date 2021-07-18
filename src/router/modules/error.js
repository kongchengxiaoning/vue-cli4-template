const ERROR_ROUTES = [
  {
    path: '*',
    name: 'Error401',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: { title: '404', noNeedLogin: true }
  }
]

export default ERROR_ROUTES

