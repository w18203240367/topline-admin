<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form ref="form" :model="form" >
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!--  el-col  删格布局  共24列  :span  用来指定占用的大小  :offset 用来执行偏移量  -->
          <el-col :span='14'>
              <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span='9' :offset='1'>
              <el-button @click='handleSendCode'>获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt.js'// 引入极验 jsSKD文件通过该 window.initGeetest 使用
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    handleLogin () {
      // const { mobile, code } = this.form,
      axios({
        method: 'POST',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/authorizations`,
        data: this.form
      }).then(res => {
        // console.log(res.data)
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      }).catch((e) => {
        this.$message.error('登陆失败,手机号或手机验证码错误')
      })
    },
    handleSendCode () {
      const { mobile } = this.form
      axios({
        methos: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({ // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, function (captchaObj) {
          // 这里可以调用验证实例 captchaObj 的实例方法 验证对象
          captchaObj.onReady(function () {
            // 验证码ready之后才能调用verify方法显示验证码
            captchaObj.verify() // 弹出验证码内容框
          }).onSuccess(function () {
            // your code
            // console.log(captchaObj.getValidate()) // 可以得到 验证成功后的数据
            const { geetest_challenge: challenge, geetest_seccode: seccode, geetest_validate: validate } = captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
            })
          }).onError(function () {
            // your code
          })
        })
        // 在这里注册“发送验证码” 按钮的点击事件然后验证用户是否输入手机号以及手机号是否有效，格式是是否正确
        // 调用captchaObj.verify
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login-wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(./login_bg.jpg);
      .form-head {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
        }
      }
      .form-wrap {
        width: 400px;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        .btn-login {
          width: 100%;
        }
      }
  }
</style>
