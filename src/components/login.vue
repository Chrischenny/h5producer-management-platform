<template>
    <div style="height:100%;">
        <el-container style="height:100%;">
            <el-header height='90px'>
                <el-row id="head">
                <el-col :span="6">
                    
                    <img src="../assets/logo.jpg" alt="" id="logo">
                </el-col>
                <el-col :span="12">
                    <h1 id="tit">视频娱乐线上营销管理平台</h1>
                    
                </el-col>
                <el-col :span="6">
                    <p id="username">欢迎登陆：管理员！</p>
                    
                </el-col>
                </el-row>
            </el-header>
            <el-main style="background-color:#eee;">
                <el-card id="card">
                    <div slot="header"><h1>登录界面</h1></div>
                    <el-form label-position="left" label-width="80px" >
                        <el-form-item label="用户名">
                            <el-input type="" v-model="user">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type='pass' v-model="pass">

                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
        
    </div>
</template>

<script>
import store from '../store/index'

export default {
    store,
    data(){
        return{
            user:'',
            pass:''
        }
    },
    methods:{
        login(){
            this.$axios({
                url:'http://localhost:2138/login?'+'user='+this.user+'&pass='+this.pass,
                method:'get',
            }).then(res=>{
                
                if(res.data == '-1'){
                    alert('用户名或密码错误！')
                }else{
                    console.log(res.data);
                    this.$store.commit('initAuthorization',res.data)
                    alert('登陆成功！')
                    sessionStorage.user = this.user;
                    this.$router.push({path:'/home'})
                }
            })
        }
    }
}
</script>

<style  scoped>
    #card{
        width: 500px;
        margin: 200px auto;

    }
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