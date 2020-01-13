<template>
  <div class="post">
    <!-- 面包屑 -->
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
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="title" label="标题" width="420"></el-table-column>
        <el-table-column property="create_date" label="时间" width="220"></el-table-column>
        <el-table-column property="user.nickname" label="姓名"></el-table-column>
        <el-table-column property="type" label="类型">
          <template slot-scope="scope">
            {{scope.row.type===1?'文章':'视频'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
    </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="primary" icon="el-icon-share" size="mini"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
    </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagetotal">
    </el-pagination>
  </div>
</template>

<script>
import { getPostList } from '@/apis/article.js'
export default {
  data () {
    return {
      postlist: [],
      pageIndex: 1,
      pageSize: 2,
      pagetotal: 0

    }
  },
  async mounted () {
    this.init()
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    async init () {
      let res = await getPostList({ pageIndex: this.pageIndex, pageSize: this.pageSize })
      // console.log(res)
      this.postlist = res.data.data
      this.pagetotal = res.data.total
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.init()
    }
  }
}
</script>

<style>
</style>
