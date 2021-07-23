import Mock from 'mockjs'
import { login, logout, userInfo } from './modules/user' // 用户相关方法

// 可以设置响应的时间
Mock.setup({
  timeout: '100 - 1000'
})

// 登录获取登录信息
Mock.mock(/\/login\/login/, 'post', login)
// 登录获取登录信息
Mock.mock(/\/login\/user_info/, 'post', userInfo)
// 注销登录信息
Mock.mock(/\/login\/logout/, 'post', logout)

export default Mock
