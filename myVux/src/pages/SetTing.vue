<template>
    <div class="fenlei">
        <x-header><span style="color:#fff;font-size:16px;"> 个人设置 </span>  <a style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>   
        <div>
            <a href="#/ShopAddress"> 地址管理 </a>
            <i  class="fa fa-angle-right first"></i>
            <a href="#/"> 电脑版 </a>
            <i class="fa fa-angle-right secod"></i>
        </div>
        <button @click="userLogout"> 退出账号 </button>
    </div>
</template>
<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                username:'',
                id:'',
                addressList:[]
            }
        },
        components: {XHeader},
        methods: {
            // 退出
            userLogout:function(){
                console.log('点击了');
                this.$axios.get('/users/logout').then((data) => {
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
            // 检查用户登录
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        // console.log(user.data.data.cartList.length)
                        this.car = user.data.data.cartList.length;
                        // console.log(user.data.data.username);
                        this.username = user.data.data.username;
                        this.id = user.data.data._id;
                        // console.log(user.data.data._id)
                        this.cartList = user.data.data.cartList;
                        this.goods = user.data.data.cartList; 
                        this.addressList = user.data.data.addressList;                      
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
        },
        mounted () {
            this.userCheckLogin()
        }
    }
</script>
<style scoped>
    .vux-header{
        background:green;
        color:#fff;
    }
    .fenlei{
        position: relative;
    }
    div{
        background: #fff;
    }
    .fenlei > div > a{
        padding: 10px;
        display: block;
        border-top: solid 1px #ddd;
        border-bottom: solid 1px #ddd; 
        color: #555;  
        position: relative;     
    }
    button{
        line-height: 45px;
        width: 100%;
        background: none;
        border: none;
        position: fixed;
        bottom: 0;
        background: #dedede;
        font-size: 16px;
        color:#555;
    }
    button:hover{
        background: green;
        color:#fff;
        transition: all 0.5s;
    }
    i.first{
        position: absolute;
        top:60px;
        right:20px;
        font-size: 18px;
        color:#aaa;
    }
    i.secod{
        position: absolute;
        top:105px;
        right:20px;
        font-size: 18px;
        color:#aaa;  
    }
</style>