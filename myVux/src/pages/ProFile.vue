<template>
    <div class="fenlei">
        <x-header><span style="color:#fff;font-size:16px;"> 收货地址 </span></x-header>   
        <ul>
            <li v-for="(address,index) in addressList">
                <i> {{address.name}}</i>
            </li>
        </ul>
        <a href="#/AddAdress"> 新增地址 </a>
    </div>
</template>
<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                addressList:[]
            }
        },
        components: {
            XHeader
        },
        mounted () {
          this.userCheckLogin()  
        },
        methods: {
             userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    console.log(user.data.data);
                    if(user.data.error == 0){
                        // console.log(user.data.data.username);
                        this.username = user.data.data.username;
                        this.id = user.data.data._id;
                        // console.log(user.data.data)
                        this.addressList = user.data.data.addressList; 
                        // console.log(this.addressList[0]);                     
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
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
    ul{
        background: #fff;
    }
    li{
        padding: 10px;
        border-bottom: solid 1px #ddd;        
    }
    a{
        line-height: 45px;
        width: 100%;
        background: none;
        border: none;
        position: fixed;
        bottom: 0;
        background: green;
        font-size: 16px;
        color:#fff;
        text-align: center;
    }
    /* button.active{
        background: green;
    } */
</style>