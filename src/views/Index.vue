<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
            <div class="img"></div>

        <el-menu
          :unique-opened="true"
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- --------------------------------------------------- -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/index/postList">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/index/pubulispost">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章管理</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- -------------------------------------------------------- -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item>
              <el-menu-item index="3-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>栏目列表</span>
                </template>
              </el-menu-item>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="el-icon-s-grid"></i>
          <span class="title">传智播客后台管理系统</span>
          <div class="right">
            <span>欢迎您：逗比</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>退出</span>
          </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.img {
  background-image: url('../assets/logo(1).png');
  background-color: #fff;
  height: 60px;
  background-size: cover
}
.index {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    // background-color:#545c64;
    .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
.el-header {
  display: flex;
  background-color: #545c64;
  padding: 0;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  .el-icon-s-grid {
    font-size: 50px;
  }
}
</style>
