import { Random } from 'mockjs'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: Random.cparagraph(1),
    avatar: Random.image('100x100', '#45b97c'),
    name: Random.cname()
  },
  'editor-token': {
    roles: ['editor'],
    introduction: Random.cparagraph(2),
    avatar: Random.image('100x100', '#4A7BF7'),
    name: Random.cname()
  }
}

// user login
export const login = config => {
  const { userName } = JSON.parse(config.body)
  const token = tokens[userName]

  if (!token) {
    return {
      code: '60204',
      msg: '帐户或密码不正确'
    }
  }

  return {
    code: '0000',
    msg: 'success',
    data: token
  }
}

// user userInfo
export const userInfo = config => {
  const { token } = JSON.parse(config.body)
  const info = users[token]

  if (!info) {
    return {
      code: '50008',
      msg: '登录失败，无法获取用户详细信息。'
    }
  }

  return {
    code: '0000',
    msg: 'success',
    data: info
  }
}

// user logout
export const logout = () => {
  return {
    code: '0000',
    msg: '成功',
    data: 'success'
  }
}
