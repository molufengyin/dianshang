<template>
    <div class="register">
        <img class="logo" src="/static/logo1.png" alt="">
        <h3> 小米账号注册 </h3>
        <form action="" name="registerForm">
            <input class="username" v-model="username" type="text" name="username" placeholder="请输入用户名" required><br>
            <input class="email" v-model="email" type="email" name="email" placeholder="请输入邮箱" required><br>
            <input class="password" v-model="password" type="password" name="password" placeholder="请输入密码" required><br>
            <input class="repassword" v-model="repassword" type="password" name="repassword" placeholder="请确认密码" required><br><br>
            <button type="submit" @click.stop="UserRegister"> 用户注册 </button><br><br>
            <a href="#/UserLogin"> 已有账号，快去登录</a> 
        </form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'userregister',
        data: function () {
            return {
                username:'',
                email:'',
                password:'',
                repassword:'',
                user:this.user
            }
        },
        components: {
                            
        },
        methods: {
          UserRegister(){
            if(this.username === ''){
              alert('用户名不能为空');
              return;
            } 
            if(this.password !== this.repassword){
              alert('两次密码不一致');
              return;
            }
            var _this = this;
            this.$axios.post('/users/register',{
              userName:this.username,
              userPassword:this.password,
              userRepassword:this.repassword,
              userEmail:this.email
            }).then((user)=>{
              console.log('发送成功');
              console.log(user);
              setTimeout(function () {
              _this.$router.push({path:'/userLogin'})
              },1000)
            }).catch((err) => {
              console.log('发送失败');
              console.log(err);
            })
          }
        }
      }
</script>
<style scoped>
.vux-demo {
  text-align: center;
}
.register{
  background: #f5f5f5;
  padding: 40px 20px 0;
  text-align: center;
}
.register .logo {
  width: 50px;
}
.register h3{
  font-weight: 200;
  margin: 20px;
}
.register form input{
  line-height: 45px;
  width: 290px;
  padding-left: 10px;
  font-size: 18px;
  border: none;
  border-bottom: solid 1px #eee;
}
.username{
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: none;
  border-bottom:solid 1px #eee;
}
.repassword{
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
}
.line{
  margin-top: 30px;
  color:#aaa;
}
a{
  padding:5px 75px;
}
/* a.active{
  background: green;
  color:#fff;
} */
</style>