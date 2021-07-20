<template>
  <div class="home">
    <h1>首页</h1>
    <img :src="logoUrl" alt="vue">
    <el-button @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import { getExplorer } from '@/assets/scripts/tools'
import logoUrl from '@/assets/images/logo.png'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      logoUrl
    }
  },
  created() {
    this.getExplorer()
  },
  methods: {
    ...mapActions[{
      'logout': 'user/logout'
    }],
    // 获取当前浏览器信息
    getExplorer() {
      const info = getExplorer()
      console.log(info)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 30px;
  text-align: center;
}
</style>
