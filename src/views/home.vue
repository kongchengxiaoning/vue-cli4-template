<template>
  <div class="home">
    <h1 class="title">
      <img class="img" :src="logoUrl" alt="vue">
      <span>Hello World</span>
    </h1>
    <div v-if="getUserInfo" class="user-info">
      <img class="avatar" :src="getUserInfo.avatar" />
      <span class="text">{{ getUserInfo.name }}</span>
      <el-button class="button" size="mini" @click="setLogout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import logoUrl from '@/assets/images/logo.png'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      logoUrl
    }
  },
  computed: {
    ...mapGetters({
      'getUserInfo': 'userInfo'
    })
  },
  methods: {
    // 退出登录
    async setLogout() {
      await this.$store.dispatch('user/logout')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  text-align: center;
  .title {
    .img {
      width: 35px;
      height: 35px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .text {
      font-size: 16px;
      color: #333333;
      padding: 0 20px;
    }
  }
}
</style>
