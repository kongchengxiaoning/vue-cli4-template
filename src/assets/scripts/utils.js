import config from './config'

/* 本地图片地址处理 */
const handleImg = (img = config.IMG_ERROR, suffix = 'png') => {
  return `/${img}.${suffix}`
}
/* 服务器图片地址处理 */
const handleServeImg = (img = config.IMG_ERROR) => {
  return img
}

export default {
  handleImg,
  handleServeImg
}
