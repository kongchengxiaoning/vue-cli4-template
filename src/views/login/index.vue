<template>
  <div>
    <form class="from" onsubmit="return false">
      <input v-model="userName" type="text" placeholder="请输入账号" />
      <input v-model="password" type="text" placeholder="请输入密码" />
      <button @click="getLogin({ userName, password })">登录</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      userName: 'admin',
      password: '123456'
    }
  },
  methods: {
    // 获取登录信息
    ...mapActions({
      getLogin: 'user/login'
    })
  }
}
</script>

<style lang="scss" scoped>
.from {
  width: 300px;
  margin: 50px auto 0;
  text-align: center;
  input {
    width: 100%;
    height: 30px;
    border: 1px solid $border-color;
    margin-top: 20px;
    border-radius: 4px;
  }
  button {
    margin-top: 20px;
    border-radius: 4px;
    height: 30px;
    width: 80px;
  }
}
</style>
