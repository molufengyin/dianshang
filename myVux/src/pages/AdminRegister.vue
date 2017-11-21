<template>
    <div class="login">
        <img class="logo" src="/static/logo1.png" alt="">
        <h3> 小米账号注册 </h3>
        <form action="" name="loginrForm">
            <input class="adminname" v-model="adminname" type="text" name="adminname" placeholder="请输入用户名"><br>
            <input class="email" v-model="email" type="email" name="email" placeholder="请输入邮箱"><br>
            <input class="password" v-model="password" type="password" name="password" placeholder="请输入密码"><br>
            <input class="repassword" v-model="repassword" type="password" name="repassword" placeholder="请确认密码"><br><br>
            <button type="submit" @click.stop="adminRegister"> 商户注册 </button><br><br>
            <a href="#/adminLogin"> 已有账号，快去登录</a> 
        </form>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: function () {
            return {
                adminname:'',
                email:'',
                password:'',
                repassword:''
            }
        },
        components: {

        },
        methods: {
            adminRegister(){
                this.$axios.post('/admin/register',{
                    adminname:this.adminname,
                    email:this.email,
                    password:this.password,
                    repassword:this.repassword
                }).then(function(admin){
                    console.log('发送成功');
                    consoole.log(1233333);
                    console.log(admin);
                }).catch(function(err){
                    console.log(err);
                    console.log(4444444);
                    console.log('发送失败register');
                })
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
  border: none;
  border-bottom: solid 1px #eee;
}
.adminname{
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
form > a{
  padding:5px 75px;
}
</style>