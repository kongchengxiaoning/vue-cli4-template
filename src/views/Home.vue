<template>
  <div class="home">
    <h1>首页</h1>
    <img :src="logoUrl" alt="vue">
  </div>
</template>

<script>
import { getExplorer } from '@/assets/scripts/tools'
import logoUrl from '@/assets/images/logo.png'

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
