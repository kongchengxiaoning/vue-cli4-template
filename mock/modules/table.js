// table.js
import { Random } from 'mockjs' // 导出随机函数

const code = 200 // 状态码 项目同一

const getTableData = () => {
  const data = []
  Array.apply(null, { length: 10 }).forEach(_ => {
    data.push({
      name: Random.cname(), // 随机汉语名
      title: Random.csentence(8, 16), // 随机中文字符串
      date: Random.date() // 随机日期
    })
  })
  return {
    code,
    data
  }
}

export default {
  getTableData
}
