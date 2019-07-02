<template>
  <div>
      <el-row>
        <el-col :span="9"><div class="grid-content bg-purple-dark"><i class="iconfont icon-liebiao2"></i> 宇宙市地球村中国哈利波特有限公司</div></el-col>
        <el-col :span="7" :offset='5'>
          <div class="grid-content bg-purple-dark">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link select">
                <img :src="$store.state.user.photo" width="40px" class="images">
                {{ $store.state.user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>用户设置</el-dropdown-item>
                <!--
                  我们可以使用.native 事件修饰符将原始的 html 页面注册 到组件的根元素
                 -->
                <el-dropdown-item @click.native='hanleLogout'>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { removeUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      // userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    // this.userInfo = getUser()
  },
  methods: {
    hanleLogout () {
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定退出',
        cancelButtonText: '取消退出',
        type: 'warning'
      }).then(() => {
        // 清空本地存储中的 user_info
        // window.localStorage.removeItem('user_info')
        removeUser()
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  line-height: 60px;
}
.images {
  border:1px solid transparent;
  border-radius: 50%;
}
.select {
  margin-left: 10px;
}
</style>
