<template>
  <div>
    <!--
      default-active 设置默认激活的项
      open、close 当菜单展开和收起时被触发

      el-submenu
        index 用来设区分不同的导航项可以用做路由导航路径，必须唯一，
    -->
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router='true'
      >
      <el-menu-item index="/">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-neirongguanli"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish"><i class="iconfont icon-cehuifabuwenjian"></i>发布文件</el-menu-item>
          <el-menu-item index="/article"><i class="iconfont icon-weibiaoti2010101"></i>内容列表</el-menu-item>
          <el-menu-item index="/comment"><i class="iconfont icon-pinglunguanli"></i>评论管理</el-menu-item>
          <el-menu-item index="/media"><i class="iconfont icon-sucaiguanli"></i>素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-fensiguanli"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><i class="iconfont icon-tuwenguanli"></i>图文数据</el-menu-item>
          <el-menu-item index="3-2"><i class="iconfont icon-fensi"></i>粉丝概况</el-menu-item>
          <el-menu-item index="3-3"><i class="iconfont icon-fensiliebiao"></i>粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="iconfont icon-shezhi"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log('z')
    },
    handleClose (key, keyPath) {
      console.log('z')
    }
  }

}
</script>

<style lang="less" scoped>
// 图标
.icon-fensiguanli,
.icon-neirongguanli,
.icon-shezhi,
.icon-cehuifabuwenjian,
.icon-weibiaoti2010101,
.icon-pinglunguanli,
.icon-sucaiguanli,
.icon-tuwenguanli,
.icon-fensi,
.icon-fensiliebiao,
.icon-shouye {
  font-size: 20px;
  margin-left: 5px;
  margin-right: 10px;
}
.icon-sucaiguanli {
  font-size: 18px;
}

</style>
