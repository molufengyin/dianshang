<template>
    <div class="footer-nav">  
        <tabbar>
            <a href="">
                <tabbar-item link="/" selected>
                    <!-- <img slot="icon" src="/static/shouye.png"> -->
                    <i slot="icon" class="fa fa-home"></i>
                    <span slot="label"> 首页 </span>
                </tabbar-item>
            </a>
             <a href="">
                <tabbar-item link="/classify">
                    <!-- <img slot="icon" src="/static/fenlei.png"> -->
                    <i slot="icon" class="fa fa-align-justify"></i>
                    <span slot="label"> 分类 </span>
                </tabbar-item>
             </a>
             <a href="">
                <tabbar-item link="/shoppingCart">
                    <!-- <img slot="icon" src="/static/gouwu.png"> -->
                    <i slot="icon" class="fa fa-stack-overflow"></i>
                    <span slot="label"> 购物车 </span>
                </tabbar-item>
             </a>
            <a @click="skip" >
                <tabbar-item>
                    <!-- <img slot="icon" src="/static/wode.png"> -->
                    <i slot="icon" class="fa fa-user"></i>
                    <span slot="label">我的</span>
                </tabbar-item>
            </a>   
        </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
    export default {
        data: function () {
            return {
                username:'',
                id:''
            }
        },
        components: {
             Tabbar,
             TabbarItem
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
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
            },
            skip(){
                var _this = this;
                var id = this.id;
                if(this.username == ''){
                    alert('您还没有登录哦！')
                    _this.$router.push({path:'/'})
                }else{
                     _this.$router.push({path:'/mine'})
                }
            }
        }
    }
</script>
<style scoped>
.footer-nav{
    background: #fff;
}
.weui-tabbar{
    position: fixed;
    bottom:0;
    margin-top: 50px;
}
.weui-tabbar__label span{
    font-size: 16px;
}
a:first-child{
    margin-left: 15px;
}
a:nth-child(2){
margin-left: 40px;
}
a:nth-child(3){
    margin: 0 40px;
}
</style>