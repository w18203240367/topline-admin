<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="article">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="评论粉丝数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'Comment',
  props: {

  },
  data () {
    return {
      article: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        console.log(data)
        // 手动造一个数据 disable，用来控制每一行的switch开关的状态
        data.results.forEach(item => {
          // item.disabled = false
          item.disabled = false
        })
        this.article = data.results
      } catch (err) {
        this.$message.error('评论加载失败')
      }
    },
    // 设置禁用开关
    async handleChangeStatus (item) {
      try {
        // 禁用让当前行的 switch 开关禁用
        item.disabled = true
        await this.$http({
          method: 'PUT',
          url: `/comments/status`,
          params: {
            article_id: item.id.toString() //  注意： 数据id 转为字符串
          },
          data: {
            allow_comment: item.comment_status
          }
        })
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}评论状态成功`
        })
      // 启用当前行 switch 的点击状态
      // this.$nextTick(()=>{
      // item.disabled = false
      // })
      } catch (err) {
        this.$message.error('修改评论状态失败')
        // 评论状态修改失败， 让客户端的评论回到原来的状态
        item.comment_status = !item.comment_status
      }
      // 启用当前行 switch 的点击状态
      item.disabled = false
    }

  }
}
</script>

<style scoped lang="less">

</style>
