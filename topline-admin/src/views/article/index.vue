<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="(item,index) in statType" :key="item.label" :label="index">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="filterParams.channel_id" clearable >
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="range_date"
              @change="handleDateChange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
            </el-date-picker>
          </div>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter" :loading="articleLoading">筛选</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总共{{ totalCount }}数据</span>
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
        <template slot-scope= "scope">
          <el-button type="warning" size="mini" plain>修改</el-button>
          <el-button type="danger" size="mini" plain @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      total 用来配置总页数
      page_size 配置每页的数据 默认 10
      分页组件会根据每页数据 和总记录数 进行分页
      current-page 当前高亮的页码，需要和数据保持同步，否则可能会出现数据页码改变，视图页码不变
     -->
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
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
      pageSize: 10, // 每页数量
      totalCount: 0, // 总页数
      page: 1, // 当前页码
      articleLoading: false,
      filterParams: {
        status: '', // 文件状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      range_date: '', // 时间范围，这个字段的意义就是为了绑定 date 组件触发 change 事件
      channels: [] // 所有频道
    }
  },
  created () {
    this.loadArtucles()
    this.loadChannels()
  },
  methods: {
    async handleDelete (item) {
      // console.log(item.id.toString())
      try {
        // 删除确认提示
       await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // 如果手动 catch 他的异常 还是会被外部的try-catch 捕获
        // 但是代码依然可以继续往下执行
        // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   })
        // })
        // 确认执行删除操作
        await this.$http({
          method: 'DELETE',
          url: `/articles/${item.id}`
        })
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 数据列表更新
        this.loadArtucles()
      } catch (err) {
        if (err === 'cancel') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$message.error('删除失败')
      }
    },
    handleFilter () {
      this.page = 1 // 查询从第一页加载数据
      // 根据查询按钮，根据表单中的数据查询列表
      this.loadArtucles()
    },
    handleDateChange (value) {
      console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        // console.log(data)
        this.channels = data.channels
      } catch (err) {
        // console.log(err)
        this.$message.error('获取频道数据错误')
      }
    },
    async loadArtucles () {
      try {
        // 请求开始 加载loading
        this.articleLoading = true
        // 除了登录相关接口之外，其他接口都必须在请求头中通过 Authorization 字段 提供用户token
        // 当我们登录成功，服务端会生成一个token 令牌 放到用户信息中
        // 去除无用数据
        const filterData = {}
        for (let key in this.filterParams) {
          const item = this.filterParams[key]
          if (item !== null && item !== undefined && item !== '') {
            filterData[key] = item
          }
        }
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            page: this.page, // 页码
            per_page: this.pageSize, // 每页数据
            ...filterData // 将filterData 混入当前对象中（对象混入语法）
          }
        })
        this.articles = data.results
        this.totalCount = data.total_count

        // 请求结束 停止loading
        this.articleLoading = false
      } catch (err) {
        this.$message.error('加载列表失败')
      }
    },
    handleCurrentChange (page) {
      // console.log(page)
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
.screen {
  margin-top: 20px;
}
</style>

<!--
  删除功能：
    程序中的数据，id 和服务端返回的原始数据id不一致
    原因：是该数据id 超出了JaveScript 的安全整数范围，无法精确表示，会出现偏差
    JavaScript 最大能表示的安全整数范围是：Number.Max_SAFE_INTEGER 9007199254740991
    例：1144457452637388800  超出了 9007199254740991 JavaScript 无法安全表示

  解决：
    我们可以使用一个第三方包， json-bigint，配置 axios 手动解析后端返回的JSON 格式数据
    axios 解析完的对象中的数据已经有问题了
    对于这种问题，axios 给你提供一个API 可以手动解析原始数据
    我们可以在 axios 提供的那个 API 中使用，json-bigint 去解析含有超出安全整数范围的json 内容数据

    他会将json 格式 转为JavaScript 对象他会自动判断内容数据是否超出安全整数范围，自动处理成其他格式
    JSON.parse(json)
-->
