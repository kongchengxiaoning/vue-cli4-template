const USER_MAP = {
  admin: {
    name: 'admin',
    user_id: 1,
    token: 'admin'
  }
}

// user login
export const login = req => {
  req = JSON.parse(req.body)
  if (req.password !== '123456' || req.userName !== 'admin') {
    return {
      code: 400,
      msg: '账号不匹配',
      data: {}
    }
  }
  return {
    code: '0000',
    msg: 'success',
    data: USER_MAP[req.userName]
  }
}

// user logout
export const logout = () => {
  return {
    code: '0000',
    msg: '成功',
    data: {}
  }
}
