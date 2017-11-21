<template>
    <div class="fenlei">
        <x-header><span style="color:#fff;font-size:16px;"> 收货地址 </span></x-header>   
        <a href="#/AddAdress"> 新增地址 </a>
        <div class="main">
            <ul>
                <li v-for="(address,index) in addressList">
                    <p>
                        <i> {{address.name}} </i>
                        <span @click="delet(index)"> 删除 </span>
                    </p>    
                    <p>
                        {{address.pro}} {{address.site}}
                        <span class="default">
                            <input type="checkbox">
                            <small> 设为默认地址 </small>  
                        </span>                        
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                addressList:[],
                id:''
            }
        },
        components: {
            XHeader
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            change (val, label) {
                console.log('change', val, label)
            },
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        this.id = user.data.data._id;
                        this.addressList = user.data.data.addressList;                        
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            delet(index){
                var _this = this;
                var aid = this.addressList[index]._id
                var uid = this.id;
                this.$axios.get(`/users/delet/${uid}/${aid}`).then((user)=>{
                    console.log(user);
                    _this.$router.push({path:'/ShopAddress'})
                }).catch((err)=>{
                    console.log(err);
                })
            }
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
    ul{
    margin: 0;
    background: #fff;
}
ul li{
    border: solid 1px #dedede;
    margin: 10px;
}
li p{
    margin: 5px 10px;
    overflow: hidden;
    padding: 5px;
}
li p:first-child{
    border-bottom: solid 1px #dedede;

}
li p i {
    font-style: normal;
    color: green;
    font-size: 18px;
}
li p span{
    float: right;
    color:#999;
}
li p:last-child{
    font-size:14px;
}
.default{

}
.default small{
    display: block;
}
.default  input{
    display: block;
    position: relative;
    right:-40px;
}
</style>