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
        <!--
           禁止路由缓存  只需要给 rrouter-view 添加一个 唯一的key 即可,这样路由 就不会缓存组件了 这个key 要确保唯一
           禁用路由缓存不是必须的 看情况

           如果刻意使用路由缓存能力就不要禁用,去被缓存的路由中 通过
           1. 监视$route做处理
           2. 2.2新增的 brforeRouteUpdate 路由文件钩子做处理
         -->
        <el-main><router-view :key="$route.path"></router-view></el-main>
        <!-- <el-main><router-view></router-view></el-main> -->
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
