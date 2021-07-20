import request from '@/utils/request'

/**
 * @description 获取登录信息
 */

export const setLogin = data => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export const setLogout = data => {
  return request({
    url: '/logout',
    method: 'POST',
    data
  })
}
