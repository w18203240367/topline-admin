<template>
  <el-card>
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
    </el-radio-group>
    <el-button type="primary" style='height: 40px;'>上传图片</el-button>
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
