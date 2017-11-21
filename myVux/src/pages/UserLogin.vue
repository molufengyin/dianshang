<template>
  <div class="login">
    <img class="logo" src="/static/logo.png" alt="">
    <h3> 小米账号登录 </h3>
    <form action="">
      <input class="username" v-model="username" type="text" name="username" placeholder="用户名"><br>
      <input class="password"  v-model="password" type="password" name="password" placeholder="请输入密码"><br><br>
      <button type="submit" @click.stop="userLogin"> 用户登录 </button><br><br>
      <!--  -->
      <a href="#/UserRegister"> 没有账号，快去注册</a><br><br>  
      <a href="#/">返回首页</a>
    </form>  
    <footer>
      <p>
        小米公司版权所有-京ICP备10046444-
        <a href="#/http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"></a>
        <span>
          <img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png" alt="">
          京公网安备11010802020134号
        </span>
          -京ICP证110507号
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  components: {
 
  },
  data () {
    return {
      username:'',
      password:''
    }
  },
  methods: {
    userLogin:function(){
      var _this = this;
      console.log('点击了');
       this.$axios.post('/users/login',{
        username:this.username,
        password:this.password
      }).then((user)=>{
        console.log('发送成功');
        // setTimeout(function () {
            _this.$router.push({path:'/'})
          // },500)

      }).catch((err) => {
        console.log('发送失败');
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
.vux-demo {
  text-align: center;
}
.login{
  background: #f5f5f5;
  padding: 40px 20px 0;
  text-align: center;
}
.login .logo {
  width:100px;
}
.login h3{
  font-weight: 200;
  margin: 20px;
}
.login form input{
  line-height: 45px;
  width: 290px;
  padding-left: 10px;
  font-size: 18px;
}
.username{
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  border-bottom:solid 1px #eee;
}
.password{
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: none;
}
 form > a,form > button{
  width: 290px;
  line-height: 25px;
  border: none;
  background: green;
  border-radius: 15px;
  color:#fff;
  font-size: 16px;
  padding: 5px 40px;
}
.line{
  margin-top: 30px;
  color:#aaa;
}
form > a{
  padding:5px 75px;
}
footer{
  position: fixed;
  bottom: 20px;
  padding-right:20px; 
}
footer p{
  font-size: 14px;
  color: #666;
}
</style>