import config from '@/assets/scripts/config'
import { getLoginData } from '@/service/api/user'

const { BASE_URL } = config

const user = {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // user login
    async login({ commit }, userInfo) {
      const { userName, password } = userInfo
      const { data } = await getLoginData({ userName, password })
      commit('setUserInfo', data)
      window.location.href = BASE_URL.PRO
    },
    // user logout
    logout({ commit }) {
      commit('setUserInfo', null)
      window.location.href = BASE_URL.PRO
    }
  }
}

export default user
