<template>
  <div class="post">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>文章管理</el-breadcrumb-item>
  <el-breadcrumb-item>文章列表</el-breadcrumb-item>
</el-breadcrumb>
      <template>
  <el-table
    ref="singleTable"
    :data="postlist"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="title"
      label="标题"
      width="520">
    </el-table-column>
    <el-table-column
      property="create_date"
      label="时间"
      width="220">
    </el-table-column>
    <el-table-column
      property="user.nickname"
      label="姓名">
    </el-table-column>
    <el-table-column
      property="user.username"
      label="账号">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
    <el-button @click="setCurrent()">取消选择</el-button>
  </div>
</template>

  </div>
</template>

<script>
import { getPostList } from '@/apis/article.js'
export default {
  data () {
    return {
      postlist: [],
      currentRow: null
    }
  },
  async mounted () {
    let res = await getPostList()
    console.log(res)
    this.postlist = res.data.data
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>

</style>
