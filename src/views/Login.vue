<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form :model="loginform" :rules="rules" ref="loginform" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="loginform.username" placeholder="请输入用户名" prefix-icon="icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginform.password"
            placeholder="请输入密码"
            prefix-icon="icon-key"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="hanlelogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/apis/users.js'
export default {
  data () {
    return {
      loginform: {
        username: '12345',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入长度为 3 到 16 位密码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 16,
            message: '请输入长度为 3 到 16 位密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    hanlelogin () {
      // 当内容为空的时候不发送请求
      this.$refs.loginform.validate(async validate => {
        if (validate) {
          let res = await login({
            username: this.loginform.username,
            password: this.loginform.password
          })
          console.log(res)

          if (res.data.message === '登录成功') {
            // 如果登录成功，存储token
            localStorage.setItem('heima_back_news_token', res.data.data.token)
            localStorage.setItem('heima_back_news_userinfo', JSON.stringify(res.data.data.user))
            // let id = res.data.data.user.id
            // console.log(id)
            this.$router.push({ name: 'Index' })
          } else {
            this.$message.warning(res.data.message)
          }
        } else {
          this.$message.warning('输入不合法')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
