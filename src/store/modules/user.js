import config from '@/assets/scripts/config'
import { setLogin, setLogout } from '@/service/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

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
    login({ commit }, userInfo) {
      const { userName, password } = userInfo
      return new Promise((resolve, reject) => {
        setLogin({ userName, password }).then(data => {
          commit('setUserInfo', data)
          setToken(data.token)
          window.location.href = BASE_URL.PRO
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // user logout
    logout({ state, commit }) {
      return new Promise((resolve, reject) => {
        setLogout(state.userInfo.token).then(() => {
          commit('setUserInfo', null)
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
