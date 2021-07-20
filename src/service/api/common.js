import request from '@/service/request'

/**
 * @description 上传图片
 */

export const setUploadPhoto = data => {
  return request({
    url: '/api/getTableData',
    method: 'POST',
    data
  })
}
