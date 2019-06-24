<template>
  <div>
      <el-row>
        <el-col :span="9" :offset='1'><div class="grid-content bg-purple-dark">宇宙市地球村中国哈利波特有限公司</div></el-col>
        <el-col :span="7" :offset='5'>
          <div class="grid-content bg-purple-dark">
            <el-dropdown :hide-on-click="false">
              <span class="el-dropdown-link select">
                <img :src="userInfo.photo" width="40px" class="images">
                {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>用户设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
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
