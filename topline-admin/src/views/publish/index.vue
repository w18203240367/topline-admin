<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
        <div>
          <el-button type="success" @click="handlePublish(false)">发布</el-button>
          <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
        </div>
    </div>
    <el-row>
      <el-col :span="12">
        <!-- 表单 -->
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="articleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group> -->
          </el-form-item>
          <!--
            组件通信
              父传子： props Down
              子传父：Events Up
              $event 在模板中是事件参数
           -->
          <!-- <el-form-item label="频道">
            <article-channel
            :value="articleForm.channel_id"
            @input="articleForm.channel_id = $event"
            ></article-channel> -->
            <!--
              v-model 就是
              :value="articleForm.channel_id"
              @input="articleForm.channel_id = $event" 简写
             -->
            <el-form-item label="频道">
            <article-channel
              v-model="articleForm.channel_id"
            ></article-channel>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'publish',
  components: {
    ArticleChannel
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 能容
        cover: { // 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] //
        },
        channel_id: 3 // 频道
      }
    }
  },
  methods: {
    async handlePublish (draft) {
      try {
        await this.$http({
          method: 'POST',
          url: '/articles',
          params: { // Query 参数 使用params 传入
            draft
          },
          data: this.articleForm
        })
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (err) {
        this.$message.error('发布失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>
