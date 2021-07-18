<template>
  <div class="home">
    <h1>首页</h1>
    <img :src="logoUrl" alt="vue">
  </div>
</template>

<script>
import logoUrl from '@/assets/images/logo.png'

export default {
  name: 'Home',
  data() {
    return {
      logoUrl
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
