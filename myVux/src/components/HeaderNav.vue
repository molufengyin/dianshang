<template>
  <div class="header-nav">
    <div class="head">
      <img src="/static/logo2.jpg" alt="">
      <a href="#/search" class="search">
        <input type="text" placeholder="搜索商品名称"> 
        <i class="fa fa-search"></i>
      </a>
      <a v-show="!username && !adminname" class="login" @click="fade"> 登录 </a>
      <small> <a class="login" @click="fade" v-show="username || adminname">{{username}}{{adminname}}</a></small>
      <p class="loginChoose" v-if="willShow">
        <a v-show="!username && !adminname " href="#/adminLogin"> <span> 商户登录 </span> </a>
        <a v-show="adminname" @click="adminLogout"> <span> 商户退出 </span> </a>
        <a v-show="!username && !adminname" href="#/userLogin" > <span> 用户登录 </span> </a>
        <a v-show="username" @click="userLogout"> <span> 用户退出 </span> </a>
        <a v-show="adminname" href="#/AddGoods"> <span> 添加商品 </span></a>
      </p>
    </div>
    <img class="img" src="/static/zidongche1.jpg" alt="">
  </div>  
</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      // classify:['推荐','手机','智能','电视','电脑','生活周边'],
      index:0,
      willShow:false,
      demo2:'推荐',
      username:'',
      adminname:''
    }
  },
  components: {

  },
  mounted:function(){
    this.adminCheckLogin(),
    this.userCheckLogin()   
  },
  methods: {
    userLogout:function(){
      console.log('点击了');
      this.$axios.get('/users/logout').then((data) => {
        console.log(1111);
        console.log(data);
        let res = data.data;
        console.log(res);
        console.log('退出了');
        if(res.error == 0){
          console.log(res.message);
          location.href = '/'
        }
      }).catch((err)=>{
        console.log(2222222222);
        console.log(err);
      })
    },
    adminLogout:function(){
      console.log('点击了');
      this.$axios.get('/admin/logout').then((admin) => {
        console.log(1111);
        console.log(admin);
        let res = admin.data;
        console.log(res);
        console.log('退出了');
        if(res.error == 0){
          console.log(res.message);
          location.href = '/'
        }
      }).catch((err)=>{
        console.log(2222222222);
        console.log(err);
      })
    },
    fade:function(){
      if(this.willShow == false){
        this.willShow = true;
      }else{
        this.willShow = false;
      }
    },
    adminCheckLogin(){
        this.$axios.post('/admin/checkLogin').then((admin)=>{
          if(admin.data.error == 0){
            // console.log('商户————' + admin.data.data.adminName);
            this.adminname = admin.data.data.adminName;
          }
        }).catch((err)=>{
          console.log('检查登录错误');
          console.log(err);
        })
    },
    userCheckLogin(){
      this.$axios.post('/users/checkLogin').then((user)=>{
        // console.log(user.data.message);
        if(user.data.error == 0){
          this.username = user.data.data.username;
        }
      }).catch((err)=>{
          console.log('检查登录错误');
          console.log(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header-nav{
    width: 383px;
    padding: 10px 15px 0;
    position: fixed;
    top: 0;
    z-index: 999;
    background: #fff;
  }
  .header-nav > img{
    margin-right: 30px;
    width: 100%;
    height: 100px;
    margin-top:10px;
  }
  .header-nav .head img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: relative;
    top: 8px;
  }
  .search{
    position: relative;
  }
  .search input{
    width: 200px;
    line-height: 25px;
    border: solid 1px #dedede;
    color: #999;
    padding: 2px 29px;
    border-radius: 2px;
  }
  .search i{
    position: absolute;
    left: 10px;
    top: 4px;
    color: #ccc;
    background: #fff;
  }
  .login{
    color:#999;
    font-size: 14px;
    margin-left: 4px;
    padding: 0 20px;
    cursor: pointer;
    padding: 5px 0;
  }
  .login:hover{
    color:green;
  }
  .vux-tab{
    background: #f5f5f5;
  }
  .vux-tab-item{
    cursor: pointer;
  }
  .vux-tab-item:hover {
    color:green;
    transition: all .5s;
  }
  .head{
    position: relative;
  }
  .loginChoose{
    background: #fff;
    width: 85px;
    position: absolute;
    right: 30px;
    top: 32px;
    z-index: 100;
  }
  .loginChoose > a {
    color: #aaa;
    text-align: center;
    cursor: pointer;
  }
  .loginChoose > a:hover{
    color:green;
    transition: all .5s;
  }

    .loginChoose > a span{
      border-bottom: solid 1px #ccc;
    }
  .loginChoose > a > span{
    /* border-bottom: solid 1px #aaa; */
    display: inline-block;
    padding:10px 10px;
  }
  small > a.login{
    color:#fff;
    font-size: 12px;
    border: solid 1px green;
    background: green;
    border-radius: 8px;
    /* padding: 5px; */
  }
  small > a.login:hover{
    color:#fff;
  }
</style>
