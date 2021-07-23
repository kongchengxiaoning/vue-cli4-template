// 访问store
const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  permissionRoutes: state => state.permission.routes
}
export default getters
