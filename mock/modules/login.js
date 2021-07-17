const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: 1,
    token: 'super_admin'
  },
  admin: {
    name: 'admin',
    user_id: 2,
    token: 'admin'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return {
    code: 0,
    msg: 'success',
    data: USER_MAP[req.userName]
  }
}
