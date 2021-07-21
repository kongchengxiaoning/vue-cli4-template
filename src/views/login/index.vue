<template>
  <div class="form-box">
    <el-form ref="myForm" :model="formDate" :rules="rules" label-width="100px" status-icon class="demo-ruleForm">
      <el-form-item label="密码" prop="userName">
        <el-input v-model="formDate.userName" type="text" placeholder="请输入账号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input v-model="formDate.password" type="password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('myForm')">提交</el-button>
        <el-button @click="resetForm('myForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      formDate: {
        userName: 'admin',
        password: '123456'
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取登录信息
    ...mapActions({
      getLogin: 'user/login'
    }),
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await this.getLogin(this.formDate)
          location.href = '/'
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 400px;
  margin: 50px auto 0;
  text-align: center;
}
</style>
