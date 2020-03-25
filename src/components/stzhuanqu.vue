<template>
    <div id='phoneborder'>
        <img src="../assets/phone.jpg" alt="" id="bg">

        <div id="inner">
            <h2 id='headtit'>手厅视频娱乐专区文件上传</h2>
            <h6>请点击相应区域进行banner的上传</h6>
            <router-link to='/uploadplot/bg'><h6>点击此处上传活动页背景</h6></router-link>

            <el-carousel height="82px">
                <el-carousel-item v-for="(value,name) in swipegroup" :key="name">
                    <router-link :to=name id='swipearea' tag='div'><img :src=value alt=""></router-link>                              
                </el-carousel-item> 
            </el-carousel>

            

            <div id='smallbanner'>
            <router-link to='/uploadplot/smallimg1' tag='div'><img src='https://weixin.zj186.com/web/serv/upload/smallimg1.png' alt=""></router-link>
            <router-link to='/uploadplot/smallimg2' tag='div'><img src='https://weixin.zj186.com/web/serv/upload/smallimg2.png' alt=""></router-link>
            <router-link to='/uploadplot/smallimg3' tag='div'><img src='https://weixin.zj186.com/web/serv/upload/smallimg3.png' alt=""></router-link>
            <router-link to='/uploadplot/smallimg4' tag='div'><img src='https://weixin.zj186.com/web/serv/upload/smallimg4.png' alt=""></router-link>
            </div>

            <router-link to='/uploadplot/lb1' id="longbanner" tag='div'><img src='https://weixin.zj186.com/web/serv/upload/lb1.png' alt=""></router-link>
            <router-link to='/uploadplot/lb2' id="longbanner" tag='div'><img src='https://weixin.zj186.com/web/serv/upload/lb2.png' alt=""></router-link>
            <router-link to='/uploadplot/lb3' id="longbanner" tag='div'><img src='https://weixin.zj186.com/web/serv/upload/lb3.png' alt=""></router-link>
            <router-link to='/uploadplot/lb4' id="longbanner" tag='div'><img src='https://weixin.zj186.com/web/serv/upload/lb4.png' alt=""></router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
      swipegroup:{
        '/uploadplot/swipe1':'https://weixin.zj186.com/web/serv/upload/swipe1.png',
        '/uploadplot/swipe2':'https://weixin.zj186.com/web/serv/upload/swipe2.png',
        '/uploadplot/swipe3':'https://weixin.zj186.com/web/serv/upload/swipe3.png',
        '/uploadplot/swipe4':'https://weixin.zj186.com/web/serv/upload/swipe4.png'
      }
    }
  },
//   mounted(){
//     if(!sessionStorage.user){
//       this.$router.push('/login')
//     }
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
#bg{
    height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}

#inner{
  margin-top: 36px;
  margin-left: 28px;
 
}
div p{
  margin: auto;
  line-height: 64px;
  text-align: center;
}


  #smallbanner{
    margin-top: 12px;
    width: 280px;
    height: 160px; 
  }
  #smallbanner div{
    float: left;
    margin-left: 11.2px;
    margin-top: 9.6px;
    width: 125.6px;
    height: 69.6px;
  }
  #smallbanner img{
    width: 125.6px;
    height: 69.6px;
    
  }
  #longbanner{
    margin-left: 8px;  
    margin-top: 8px;
    width: 267.2px;
    height: 65.6px;
  }
  #longbanner img{  
    width: 267.2px;
    height: 65.6px;
  }
  
  .el-carousel__container{
      width: 267.2px;
      height: 65.6px;
  }
  .el-carousel__item{
      width: 267.2px;
      height: 65.6px;
  }

  .el-carousel__item img {
      width: 267.2px;
      height: 65.6px;
  }
  .el-carousel{
      width: 267.2px;
      height: 65.6px;
      margin-left: 8px;
  }
  .el-carousel__button{
      width: 10px;
  }
</style>