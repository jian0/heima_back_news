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
        <el-table-column property="title" label="标题" width="420" ></el-table-column>
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
            <el-button type="primary" icon="el-icon-share" size="mini"  @click="dialogFormVisible = true"></el-button>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="删除" placement="top" >
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
  <el-dialog title="分享" :visible.sync="dialogFormVisible">
  <el-form>
    <el-form-item label="分享用户" :label-width="'100px'">
      <el-input auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="分享内容" :label-width="'100px'">
      <el-select placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" >确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getPostList } from '@/apis/article.js'
export default {
  data () {
    return {
      dialogFormVisible: false,
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
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    async handleEdit (index, row) {
      // console.log(index, row)
      this.$router.push({ path: `pubulispost/${row.id}` })
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
