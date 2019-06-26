<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一个简单的列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <!--
        在table 表格中不需要 自己手动v-for遍历
        你只要把需要将数组数据交给 table 表格的data属性就可以了
        然后配置 el-table-column  表列表组价即可
        prop 中的数据对象
       -->
     <el-table
      :data="articles"
      style="width: 100%"
      class="article-table"
      v-loading="articleLoading">
      <el-table-column
        label="封面"
        width="180">
        <!--
          template 中的内容就是自定义表格列内容
          如果需要template 数据中访问遍历项数据， 则需要 给 template 配置 slot-scope = "scope"
          slot-scop 是固定的
          scope 值是自己改的
          我们可以通过scope.row 可以访问当前遍历项对象  就好比我们遍历中的item 一样
         -->
        <!-- <template slot-scope = "scope">
            <img
            v-for= "item in scope.row.cover.images"
            :key='item'
            :src=item >
        </template> -->
        <template>
            <img src="./eh.jpg" alt="" width="80">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope= "scope">
          <el-tag :type="statType[scope.row.status].type">{{ statType[scope.row.status].label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template>
          <el-button type="warning" size="mini" plain>修改</el-button>
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      total 用来配置总页数
      page_size 配置每页的数据 默认 10
      分页组件会根据每页数据 和总记录数 进行分页
     -->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page_size="pageSize"
          :disabled="articleLoading"
          class="pagination"
          @current-change='handleCurrentChange'>
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [

      ],
      statType: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10,
      totalCount: 0, // 总页数
      page: 1, // 当前页码
      articleLoading: false
    }
  },
  created () {
    this.loadArtucles()
  },
  methods: {
    async loadArtucles () {
      // 请求开始 加载loading
      this.articleLoading = true
      // 除了登录相关接口之外，其他接口都必须在请求头中通过 Authorization 字段 提供用户token
      // 当我们登录成功，服务端会生成一个token 令牌 放到用户信息中
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page, // 页码
          per_page: this.pageSize // 每页数据
        }
      })
      this.articles = data.results
      this.totalCount = data.total_count

      // 请求结束 停止loading
      this.articleLoading = false
    },
    handleCurrentChange (page) {
      console.log(page)
      // 当前的页码修改为最新的页码
      this.page = page
      // 页码 改变重新加载文章列表
      this.loadArtucles()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
}
</style>
