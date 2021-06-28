import config from '@/assets/scripts/config'

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
    async login(store, data) {
      store.commit('setUserInfo', data)
    },
    logout(store) {
      store.commit('setUserInfo', null)
      window.location.href = config.BASE_URL.PRO
    }
  },
  getters: {
    getUserInfo: (state) => state.userInfo
  }
}

export default user
