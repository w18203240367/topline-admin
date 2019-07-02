<template>
  <el-card>
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <!--
          组件标签不能使用 @click事件
          el-button  可以使用@click  实质上他的内部将原生DOM的点击事件做个对外发布 $emit('click' 事件参数)

          如果想要给组件注册一个原生事件 @原生事件.native
         -->
        <el-radio-button label="全部" @click.native="loadImages(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImages(true)"></el-radio-button>
    </el-radio-group>
    <!--
      我们可以直接使用 Upload 上传组件进行图片上传
      Upload 支持自动请求 只需要配置上传的接口
      如果使用他默认的请求能力 就无法 使用我们在axios 中做得配置 例如：base URL  请求拦截器
       1. action  请求地址
       2. header 请求头
       3. name 字段名称
     -->

    <el-upload
      class="upload-demo"
      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      :headers='{ Authorization: `Bearer ${$store.state.user.token}` }'
      name='image'
      :show-file-list='false'
      :on-success='handleUploadSuccess'>
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" class="image">
          <div style="padding: 10px;">
            <div class="bottom clearfix icon">
              <el-button plain type="primary" :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'" circle @click="hanleCollect(item)"></el-button>
              <el-button plain type="primary" icon="el-icon-delete" circle @click="handleDelete(item)"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'Media',
  props: {

  },
  data () {
    return {
      active: '全部',
      images: []
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    async hanleCollect (item) {
      const collect = !item.is_collected
      try {
        const data = await this.$http({
          method: 'PUT',
          url: `/user/images/${item.id}`,
          data: {
            collect
          }
        })
        // 收藏
        item.is_collected = data.collect

        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      } catch (err) {
        this.$message.error('收藏失败')
      }
    },
    async loadImages (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/user/images`,
          params: {
            collect, // 是否查询收藏图片，默认查所有
            page: 1,
            per_page: 10
          }
        })
        // console.log(data)
        this.images = data.results
      } catch (err) {
        this.$message.error('加载图片失败')
      }
    },
    // 删除功能
    async handleDelete (item) {
      try {
        await this.$http({
          method: 'DELETE',
          url: `/user/images/${item.id}`
        })
        this.loadImages()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      } catch (err) {
        this.$message.error('删除图片失败')
      }
    },
    handleUploadSuccess () {
      this.loadImages()
    }
  }
}
</script>

<style scoped lang="less">
.action {
  display: flex;
  justify-content: space-between;  // 左右
  margin-bottom: 15px;
}
.icon{
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.image {
  max-width: 100%;
}
</style>
