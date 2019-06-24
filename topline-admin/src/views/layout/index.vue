<template>
  <div class="app">
    <!-- Home、内容管理、粉丝管理 -->
    <!-- <AppAside></AppAside>
    <AppHeader></AppHeader> -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px"><AppAside /></el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header><AppHeader /></el-header>
        <!-- 内容 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
  name: 'AppLayout',
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>

.app, .el-container {
  height: 100%;
}

.el-aside {
  background: #343a46;
}
.el-main {
  background: #ccc
}
</style>
