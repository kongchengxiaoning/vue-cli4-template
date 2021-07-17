import { request } from '@/service/request'

/**
 * @description 获取登录信息
 */

export const getLoginData = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
