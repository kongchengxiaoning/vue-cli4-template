/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @returns {String} 金钱显示为xxx,xxx.xx
 */
export const formatMoney = (money, digit = 2) => {
  var tpMoney = '0.00'
  if (undefined !== money) { tpMoney = money }
  tpMoney = Number(tpMoney)
  if (isNaN(tpMoney)) { return '0.00' }
  tpMoney = tpMoney.toFixed(digit) + ''
  var re = /^(-?\d+)(\d{3})(\.?\d*)/
  while (re.test(tpMoney)) {
    tpMoney = tpMoney.replace(re, '$1,$2$3')
  }

  return tpMoney
}

/**
 * @returns {String} 卡号加***
 */
export const bindCardNo = value => {
  if (value) {
    const arr1 = value.substr(value.length - 4)
    const arr2 = value.substr(0, 4)
    return arr2 + ' **** **** **** ' + arr1
  }
}

/**
 * @returns {String} 数字转换为大写汉字
 */
export const capital = (str = '') => {
  str = str + ''
  var len = str.length - 1
  var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  return str.replace(/([1-9]|0+)/g, function($, $1, idx, full) {
    var pos = 0
    if ($1[0] !== '0') {
      pos = len - idx
      if (idx === 0 && $1[0] === 1 && idxs[len - idx] === '十') {
        return idxs[len - idx]
      }
      return num[$1[0]] + idxs[len - idx]
    } else {
      var left = len - idx
      var right = len - idx + $1.length
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - left % 4
      }
      if (pos) {
        return idxs[pos] + num[$1[0]]
      } else if (idx + $1.length >= len) {
        return ''
      } else {
        return num[$1[0]]
      }
    }
  })
}

/**
 * @returns {String} 手机号中间四位隐藏
 */
export const handlePhone = (val) => {
  var phone = val.substr(0, 3) + '****' + val.substr(7)
  return phone
}

/**
 * @returns {String} 获取当前时间
 */
export const getDateTime = () => {
  var dt = new Date()
  var year = dt.getFullYear()
  var month = dt.getMonth() + 1
  var day = dt.getDate()
  var h = dt.getHours()
  var m = dt.getMinutes()
  var s = dt.getSeconds()
  month = (parseInt(month) < 10 ? '0' : '') + month
  day = (parseInt(day) < 10 ? '0' : '') + day
  h = (parseInt(h) < 10 ? '0' : '') + h
  m = (parseInt(m) < 10 ? '0' : '') + m
  s = (parseInt(s) < 10 ? '0' : '') + s
  var currentdate = year + '/' + month + '/' + day + ' ' + h + '/' + m + '/' + s
  return currentdate
}

/**
 * @returns {Object} 获取链接中包含的参数
 */
export const getParams = url => {
  const paramObj = {}
  const params = url.split('?')[1]
  if (!params) return paramObj
  const keyValueArr = params.split('&')
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = decodeURIComponent(keyValue[1])
  })
  return paramObj
}

/**
 * @returns {Boolean} 验证是否为手机号码
 */
export const isMobile = (v = '') => {
  var r = /^1[3456789]\d{9}$/
  return !v ? false : r.test(v)
}

/**
 * @returns {Boolean} 验证身份证的有效性
 */
export const isCardID = (v = '') => {
  var r = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return !v ? false : r.test(v)
}

/**
 * @returns {Boolean} 验证邮箱格式
 */
export const isEmail = (v = '') => {
  var r = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return !v ? false : r.test(v)
}

/**
 * @returns {Boolean} 验证是否为汉字
 */
export const idChinese = (v = '') => {
  var r = /^\s*$/g
  return !v ? false : r.test(v)
}

/**
 * @returns {Boolean} 验证是否为车牌号
 */
export const isPlateNumber = (v = '') => {
  var r = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  return !v ? false : r.test(v)
}

/**
 * @returns {Boolean} 验证是否是银行卡号
 */
export const isBankNumber = (bankcardnumberResult) => { // 验证是否是银行卡号
  // 长度校验
  if (bankcardnumberResult === '' || bankcardnumberResult.length < 16 || bankcardnumberResult.length > 19) {
    return {
      boole: false,
      title: '银行卡号位数必须在16~19之间，请完整输入银行卡号！'
    }
  }
  // 开头6位校验
  var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  if (strBin.indexOf(bankcardnumberResult.substring(0, 2)) === -1) {
    return {
      boole: false,
      title: '银行卡号开头6位不符合规范，请检查后重新输入！'
    }
  }
  // 全数字校验
  var num = /^\d*$/
  if (!num.exec(bankcardnumberResult)) {
    return {
      boole: false,
      title: '银行卡号必须全为数字，请检查后重新输入！'
    }
  }
  // Luhm验证
  var lastNum = bankcardnumberResult.substr(bankcardnumberResult.length - 1, 1)// 取出最后一位（与luhm进行比较）
  var first15Num = bankcardnumberResult.substr(0, bankcardnumberResult.length - 1)// 前15或18位
  var newArr = []
  for (var i = first15Num.length - 1; i > -1; i--) {	// 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  var arrJiShu = []	// 奇数位*2的积 <9
  var arrJiShu2 = [] // 奇数位*2的积 >9
  var arrOuShu = []	// 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) { arrJiShu.push(parseInt(newArr[j]) * 2) } else { arrJiShu2.push(parseInt(newArr[j]) * 2) }
    } else { // 偶数位
      arrOuShu.push(newArr[j])
    }
  }
  var jishu_child1 = [] // 奇数位*2 >9 的分割之后的数组个位数
  var jishu_child2 = [] // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  }
  var sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  var sumOuShu = 0 // 偶数位数组之和
  var sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  var sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  var sumTotal = 0
  for (var m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }
  for (var n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }
  for (var p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
  // 计算Luhm值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
  var luhm = 10 - k

  if (lastNum === luhm) {
    return {
      boole: true,
      title: '成功'
    }
  } else {
    return {
      boole: false,
      title: '银行卡号不合法，请检查后重新输入！'
    }
  }
}

/**
 * @returns {String} 判断设备类型
 */
export const device = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) { return 'android' }
  if (isiOS) { return 'ios' }
}

/**
 * @returns {String} 数量过万截取
 */
export const handleAmount = (value, unit = '万') => {
  if (value === null || value === undefined) {
    return '--'
  } else if (value < 10000) {
    return value
  } else {
    return `${Math.floor(value / 1000) / 10}${unit}`
  }
}
