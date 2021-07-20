<template>
  <div class="home">
    <h1>Home</h1>
    <img :src="logoUrl" alt="vue">
    <div>
      <el-button @click="setLogout">退出</el-button>
    </div>
  </div>
</template>

<script>
import logoUrl from '@/assets/images/logo.png'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      logoUrl
    }
  },
  methods: {
    ...mapActions({
      'setLogout': 'user/logout'
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 30px;
  text-align: center;
}
</style>
