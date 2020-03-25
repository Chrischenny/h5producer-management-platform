<template>
  <div class="platform" style="height:100%; ">

    <el-container style="height:100%; ">
      <el-header height='90px'>
        <el-row id="head">
          <el-col :span="6">
            
            <img src="../assets/logo.jpg" alt="" id="logo">
          </el-col>
          <el-col :span="12">
            <h1 id="tit">视频娱乐线上营销管理平台</h1>
            
          </el-col>
          <el-col :span="6">
            <p id="username">欢迎登陆：<router-link to="manageplatform/moviemanager">test</router-link></p>
            
          </el-col>
        </el-row>
      </el-header>

      <el-main style="height:100%; padding:0px" >
        <el-row style="height:100%">
          <el-col :span='4' style="height:100%">
            
            <el-menu
              style="min-height:100%;"
              :router='true'
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item index='/home'>首页</el-menu-item>
              <el-submenu index='1' >
                <template slot="title">
                  <i class='el-icon-link'></i>
                  <span>图片素材库</span>
                </template>
                <el-menu-item index="/bgupload" disabled="">背景</el-menu-item>
                <el-menu-item index="/imgupload" disabled="">图片素材</el-menu-item>
              </el-submenu>

              <el-submenu index='2'>
                <template slot='title'>
                  <i class='el-icon-document'></i>
                  <span>页面设计</span>
                </template>
                <el-menu-item index="/stzhuanqu" disabled="">手厅视频娱乐专区管理</el-menu-item>
                <el-menu-item index='/movieupload' :disabled="movieuploadVisible">试看页面影片上传</el-menu-item>
                <el-menu-item index='/gameupload' :disabled="gameuploadVisible">游戏试看页面影片上传</el-menu-item>
                <el-menu-item index='2-3' disabled="">推广海报制作</el-menu-item>
              </el-submenu>

              <el-submenu index='3'>
                <template slot="title">
                  <i class='el-icon-coin'></i>
                  <span>页面管理</span>
                </template>
                <el-menu-item index="/moviemanager" :disabled="moviemanagerVisible">试看页面管理</el-menu-item>
              </el-submenu>

            </el-menu>
          </el-col>
          <el-col :span='20' style="height:100%;">
            
            <router-view/>
            

          </el-col>
        </el-row>
      </el-main>
    </el-container>

        

        


        

    
  </div>
</template>

<script>
import store from '../store/index'
export default {
  store,
  data () {
    return {
      movieuploadVisible:true,
      gameuploadVisible:true,
      moviemanagerVisible:true,
    }
  },
  mounted(){
        
        console.log(sessionStorage.user);
        if(!sessionStorage.user){
            this.$router.push('/');
        }
        this.movieuploadVisible = this.$store.state.movieuploadVisible;
        this.moviemanagerVisible = this.$store.state.moviemanagerVisible;
        this.gameuploadVisible = this.$store.state.gameuploadVisible;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #head{
    height: 90px;
  }

  #logo{
    height: 86px;
  }
  #tit{
    float: left;
    line-height: 90px;
    font-size: 45px;
    margin:0 auto;
  }
  #username{
    float:right;
    line-height: 90px;
  }

</style>
