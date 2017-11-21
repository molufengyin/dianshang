<template>
    <div class="fenlei">
        <x-header><span style="color:#fff;font-size:16px;"> 新增地址 </span></x-header>   
        <ul action="">
            <li>
                收货人：<input v-model="name" type="text" placeholder="请输入真实姓名" required>
            </li>
            <li>
                手机号码：<input v-model="tel" type="text" placeholder="请输入有效的联系电话" required>
            </li>
            <group>
                <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" :show.sync="showAddress" placeholder="请选择地址"></x-address>
            </group>
            <li>
                详细地址：<input v-model="site" type="text" placeholder="详细地址" required>
            </li>
        </ul>
        <!-- href="#/AddAdress" -->
        <button @click="saveAdress"> 保存地址 </button>
    </div>
</template>
<script>
import {XHeader,Group, XAddress,ChinaAddressV4Data} from 'vux';
    export default {
        data: function () {
            return {
                value:[],
                title:'所在地区',
                name:'',
                tel:'', 
                addressData: ChinaAddressV4Data,
                showAddress: false,
                pro:'',
                site:'',
                username:'',
                id:'',
                str:''
            }
        },
        components: {
            XHeader,
            Group, 
            XAddress
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        // console.log(user.data.data.username);
                        this.username = user.data.data.username;
                        this.id = user.data.data._id;
                        // console.log(user.data.data._id)
                        this.addressList = user.data.data.addressList;                      
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            onShadowChange (ids, names) {
                this.pro = names  
            },
            logHide (str) {
                // console.log('on-hide', str)
            },
            logShow (str) {
                // console.log('on-show')
            },
            getName (value) {
                return value2name(value, ChinaAddressV4Data)
            },
            doShowAddress () {
                this.showAddress = true
                setTimeout(() => {
                    this.showAddress = false
                }, 2000)
            },
            saveAdress(){
                var id = this.id;
                var _this = this;
                this.$axios.post('/users/addAdress/'+ id,{
                    name:this.name,
                    tel:this.tel,
                    pro:this.pro,
                    site:this.site
                }).then((data)=>{
                    console.log(66666666);
                    _this.$router.push({path:'/ShopAddress'})
                    // console.log(data);
                }).catch((err)=>{
                    console.log(5555555);
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
        font-size:18px;
        padding-left: 15px;      
    }
    /* .weui-cells .vux-no-group-title{
        margin: 0;
        background: plum;
    } */
    li:nth-child(2){
        border: none;
        padding-bottom: 0;
    }
    li:last-child{
        border-top: solid 1px #ddd;   
    }
    li input{
        background: none;
        border: none;
        width: 220px;
    }
    button{
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
    /* .vux-popup-picker-placeholder .vux-cell-placeholder{
        font-size:14px;
        color:green;
    } */
    /* .weui-label{
        font-size:14px;
    } */
    /* button.active{
        background: green;
    } */
</style>