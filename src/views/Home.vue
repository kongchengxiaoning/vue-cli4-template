<template>
  <div class="home">
    <h1>首页</h1>
    <img :src="utils.handleImg('images/logo')" alt="vue">
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  padding: 30px;
  text-align: center;
}
</style>
