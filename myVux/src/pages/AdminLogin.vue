<template>
  <div class="login">
    <img class="logo" src="/static/logo1.png" alt="">
    <h3> 小米账号登录 </h3>
    <form action="">
      <input v-model="username" class="username" type="text" name="username" placeholder="邮箱/用户名"><br>
      <input v-model="password" class="password" type="password" name="password" placeholder="请输入密码"><br><br>
      <button type="submit" @click.stop="adminLogin"> 商户登录 </button><br><br>
      <a href="#/AdminRegister"> 没有账号，快去注册</a> 
      <a href="#/">返回首页</a> 
    </form>
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
    adminLogin:function(){
      console.log('点击了');
      console.log(this.username);
       this.$axios.post('/admin/login',{
        username:this.username,
        password:this.password
      }).then((admin)=>{
        console.log('发送成功');
        location.href = '';
      }).catch((err) => {
        console.log('发送失败login');
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
  width: 50px;
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
  line-height: 35px;
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
</style>