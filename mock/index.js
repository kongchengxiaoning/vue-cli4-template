import Mock from 'mockjs'
import { login, logout } from './modules/user' // 用户相关方法

// 可以设置响应的时间
Mock.setup({
  timeout: '100 - 1000'
})

// 登录获取用户信息
Mock.mock(/\/login/, login)
// 注销登录信息
Mock.mock(/\/logout/, logout)

export default Mock
