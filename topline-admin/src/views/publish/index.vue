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
      <el-col :span="24">
        <!-- 表单 -->
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!--
                @blur="onEditorBlur($event)"     失去焦点的时候
                @focus="onEditorFocus($event)"   聚焦的时候
                @ready="onEditorReady($event)"    富文本渲染注册好的是偶
             -->
            <quill-editor v-model="articleForm.content"
                ref="myQuillEditor"
                :options="editorOption">
              </quill-editor>
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
// 富文本编辑器css
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './quill.user.css'
// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'publish',
  components: {
    ArticleChannel,
    quillEditor
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
        channel_id: '' // 频道
      },
      editorOption: {} // 富文本绑定的数据
    }
  },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        this.articleForm = data
      } catch (err) {
        this.$message.error('获取文章失败')
      }
    },
    async handlePublish (draft) {
      // 执行添加操作
      try {
        if (this.$route.name === 'publish') {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              // Query 参数 使用params 传入
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        } else {
            // 执行修改操作
            await this.$http({
              method: 'PUT',
              url: `/articles/${this.$route.params.id}`,
              params: { // Query 参数 使用params 传入
                draft
              },
              data: this.articleForm
            })
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
      } catch (error) {
        this.$message.error('操作错误')
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
