<template>
  <div class="warp">
    <!-- 顶部导航 -->
    <div class="header">
      <h4 style="text-align:center; padding: 20px">hander</h4>
    </div>
    <!-- 内容 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 底部内容 -->
    <div class="footer">
      <h4 style="text-align:center; padding: 20px">footer</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>

</style>
