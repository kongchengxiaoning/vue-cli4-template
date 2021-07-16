import Mock from 'mockjs'

import TableApi from './modules/table.js'

// 可以设置响应的时间
Mock.setup({
  timeout: '1000 - 3000'
})

// 使用拦截规则拦截命中的请求
Mock.mock(/\api\/getTableData/, 'POST', TableApi.getTableData)

export default Mock
