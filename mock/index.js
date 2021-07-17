import Mock from 'mockjs'
import { login } from './modules/login'

// 可以设置响应的时间
Mock.setup({
  timeout: '100 - 1000'
})

// 登录获取用户信息
Mock.mock(/\/login/, login)

export default Mock
