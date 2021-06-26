import { request } from '@/service/request'

/**
 * @description 上传图片
 *  photo File  上传的文件对象
 *  dir String 文件夹
 *  type Int 上传文件类型 1图片 2视频
 */

const setUploadPhoto = data => {
  return request({
    url: '/common/upload_imgs',
    method: 'POST',
    data
  })
}

export default {
  setUploadPhoto
}
