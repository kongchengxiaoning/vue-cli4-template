const USER_MAP = {
  admin: {
    name: 'admin',
    user_id: 1,
    token: 'admin'
  }
}

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
    code: 0,
    msg: 'success',
    data: USER_MAP[req.userName]
  }
}
