<template>
  <div class="post">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top:20px">
      <div style="margin: 20px;"></div>
      <el-form label-width="80px">
        <!-- ---------------标题--------------------- -->
        <el-form-item label="标题:">
          <el-input></el-input>
        </el-form-item>
        <!-- ----------------类型-------------------- -->
        <el-form-item label="类型:">
          <el-radio-group v-model="postList.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- -----------------内容------------------- -->
        <el-form-item label="内容:">
          <!-- 富文本框 -->
          <VueEditor :config="config" v-if="postList.type === 1" ref="getcontent"/>
          <!-- 上传视频 -->
          <el-upload
          class="upload-demo"
          :headers= 'getToken()'
          action='http://localhost:3000/upload'
          :on-success='handleSuccess'
           v-if="postList.type === 2">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- -----------------栏目------------------- -->
        <el-form-item label="标题:">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="cateList" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- -----------------封面------------------- -->
        <el-form-item label="封面:">
          <el-upload
            action=""
            list-type="picture-card"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- -----------------发布文章------------------- -->
        <el-button type="primary" @click="publispost">发布文章</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { getCategory } from '@/apis/article.js'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      postList: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      cateList: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            // console.log(res)
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        }
      }
    }
  },
  methods: {
    //   视频上传成功时触发
    handleSuccess (response) {
    //   console.log(response)
      this.postList.content = 'http://127.0.0.1:3000' + response.data.url
    },
    getToken () {
      let token = localStorage.getItem('heima_back_news_token')
      return { Authorization: token }
    },
    handleCheckAllChange (val) {
      //   this.checkedCities = val ? cityOptions : []
      //   this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      //   let checkedCount = value.length
      //   this.checkAll = checkedCount === this.cities.length
      //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    publispost () {
      // this.$refs.getcontent.editor.root.innerHTML
      if (this.postList.type === 1) {
        this.postList.content = this.$refs.getcontent.editor.root.innerHTML
      }
      console.log(this.postList)
    }
  },
  async mounted () {
    let res = await getCategory()
    // console.log(res)
    this.cateList = res.data.data
  }
}
</script>

<style>
</style>
