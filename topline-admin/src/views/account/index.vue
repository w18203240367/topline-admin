<template>
  <el-card>
    <div slot="header">
      <span>账户管理</span>
    </div>
    <el-row>
      <el-col :span="10">
        <el-form v-loading="loading">
          <el-form-item label="媒体名称">
            <el-input v-model="accountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="accountForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="accountForm.id"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="accountForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="accountForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="10">
        <!--
          文件上传组件
            action 上传请求地址
            headers 设置上传的请求头
              如果有token 手动配置到这里
            data 默认只携带文件，如果需要别的数据，可以放到 data 中
            name 上传文件字段名称   默认交 file 如果你的接口要求的名字和这个不一致 ，则需要单独配置
            show-file-list  是否显示文件预览列表
            on-success 文件上传成功触发的回调
            before-upload 文件上传之后触发的回调
            img 用来预览上传的图片
            http-request  如果他的默认配置 无法满足你 我们可以自己去发请求上传文件
            注意这个组件不能配置请求方法  默认的请求方法 是 post 不能配置
         -->
        <p>头像上传</p>
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="handleUpload">
          <img v-if="accountForm.photo" :src="accountForm.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      <p>点击上传头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Account',
  props: {

  },
  data () {
    return {
      accountForm: {},
      loading: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      this.loading = true
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/profile'
        })
        // console.log(data)
        this.accountForm = data
      } catch (err) {
        this.$message.error('信息加载失败')
      }
      this.loading = false
    },
    async handleSave () {
      try {
        const { name, intro, email } = this.accountForm
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/profile',
          data: {
            name,
            intro,
            email
          }
        })
        this.$message({
          type: 'success',
          message: '更新数据成功'
        })
        console.log(data)
        // 提交mutation 也就是调用mutation函数
        this.$store.commit('changeUser', data)

        // 不要直接这样修改，无法通过调试工具查看最新的容器数据状态，也观测不到修改 state 的历史记录
        // this.$store.user.name = '嘿嘿'
      } catch (err) {
        this.$message.error('用户修改失败')
      }
    },

    async handleUpload (uploadConfig) {
      try {
        // Axios 上传文件
        // 1.构建一个 FormData 对象
        // 将文件添加到 Form Data 对象中
        const formData = new FormData()
        formData.append('photo', uploadConfig.file)
        // 2.发请求 将FormData 对象作为 axios 的data 请求体
        const data = await this.$http({
          method: 'PATCH',
          url: '/user/photo',
          data: formData
        })
        console.log(data)
        this.accountForm.photo = data.photo

        this.$store.commit('changeUser', this.accountForm)

        this.$message({
          type: 'success',
          message: '修改头像成功'
        })
      } catch (err) {
        this.$message.error('上传头像失败')
      }
    }
  }
}
</script>
<!-- 无作用域的-->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<!-- 有作用域的-->
<style scoped lang="less">

</style>
