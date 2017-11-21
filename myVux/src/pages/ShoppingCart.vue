<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">购物车</span>  <a href="#/search" style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
        <a v-show="!username" class="log" href="#/userLogin">
            <span> 登录享受更多优惠 </span>
            <a href="#/userLogin"> 去登录 <i class="fa fa-angle-right"></i> </a>
        </a>
        <a v-show="cartList.length == 0 " class="go" href="#/">
            <i class="fa fa-stack-overflow"></i>
            购物车还是空的
            <a href="#/">去逛逛</a>
        </a>
        <p v-show="cartList.length != 0" class="choose"> 
            <span @click="allChoose"> 全选 </span> <span @click="noChoose"> 全不选 </span>
        </p>    
        <ul v-show="cartList.length > 0 "  class="trade" href="">
            <li v-for="(good,index) in goods" :key="index">
                <span class="action" title="false" @click="fade(index,$event)"></span>
                <i :ref="index" style="display:none;" name="check" class="fa fa-check-circle"></i>
                <p class="main">
                    <img :src="'http://localhost:5555/uploads/'+ good.productImage" alt="">
                    <span>{{good.productName}}&nbsp;{{good.color}}</span><br>
                    <i class="sale">售价： ￥&nbsp;{{good.salePrice}}</i>
                    <section>
                        <p><button @click="reduce(index)"> — </button> <span>&nbsp;{{good.productNum}}&nbsp;</span> <button @click="gain(index)"> + </button> </p>
                        <i @click="del(index)" class="fa fa-trash-o shan"></i>
                    </section>
                </p>
            </li>
        </ul>
        <div style="padding:15px;">
    </div>
        <div v-show=" cartList.length == 0 " class="recom">
            <h4> 为你推荐 </h4>
        </div>
        <footer  v-show="cartList.length != 0">
            <a href="">
               <span>共{{count}}件 金额：</span>
               <i>{{total}}</i> 元 
            </a>
            <a href="#/"> 继续购物 </a>
            <a href="#/PayMent"> 去结算 </a>
       </footer>
    </div>
</template>

<script>
import axios from 'axios'
import HeaderNav from './../components/HeaderNav';
// import FooterNav from './../components/FooterNav';
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                cartList:[],
                // 价格
                arr1:[],
                // 件数
                arr2:[],
                willShow:false,
                goods:'',
                username:'',
                id:'',
                totals:0,
                counts:0,
                gid:''
            }
        },
        components: {
            HeaderNav,
            // FooterNav,
            XHeader
           
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            //   检查用户是否登陆
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        this.username = user.data.data.username;
                        this.id = user.data.data._id;
                        this.cartList = user.data.data.cartList;
                        this.goods = user.data.data.cartList;                        
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            // 选择单项产品
            fade:function(index,ev){
                // console.log(ev.target.title); 
                if(ev.target.title == 'true'){
                    $(ev.target).attr('title',false);
                    $(ev.target).removeClass('active');
                }else{
                     $(ev.target).attr('title',true);
                     $(ev.target).addClass('active');
                }
               this.gid = this.goods[index]._id;
               var id = this.gid;
               var uid = this.id;
               this.$axios.post(`/users/choose/${uid}/${id}`).then((good)=>{
                   console.log(111);
                   console.log(good.data.user.cartList[0].choose);
               }).catch((err)=>{
                   console.log(err);
               })
            },
            // 删除
            del(index){
                var gid = this.goods[index]._id; 
                var uid = this.id;
                var _this = this;
                this.$axios.get(`/users/del/${uid}/${gid}`).then((data) =>{
                    
                   var cartList =  this.cartList.splice(index,1);
                    this.cartList = cartList
                    console.log(this.cartList.length);
                    console.log(data.data.message);
                    _this.$router.push({path:'/ShoppingCart'})
                }).catch((err)=>{
                    console.log('cuo');
                    console.log(err);
                })
            },
            // 减少
            reduce(index){
                var gid = this.goods[index]._id; 
                this.$axios.post('/users/reduce/' + gid).then((good)=>{
                    console.log('进来1');
                    // console.log(good);
                    var num = good.data.user.cartList[index].productNum;
                    this.cartList[index].productNum = num;
                    console.log( this.cartList[index].productNum);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            // 增加
            gain(index){
                var gid = this.goods[index]._id; 
                this.$axios.post('/users/gain/' + gid).then((good)=>{
                    console.log('进来2');
                   var num = good.data.user.cartList[index].productNum;
                    this.cartList[index].productNum = num;
                    // console.log( this.cartList[index].productNum);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            allChoose(){
                var uid = this.id;
                // console.log(uid);
                this.$axios.post('/users/allchoose/' + uid).then((data)=>{
                    // console.log(111);
                    // console.log(data);
                    $('.action').addClass('active');
                }).catch((err)=>{
                    console.log(err);
                })
            },
            noChoose(){
                 var uid = this.id;
                console.log(uid);
                this.$axios.post('/users/nochoose/' + uid).then((data)=>{
                    // console.lo
                    $('.action').removeClass('active');
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        computed: {
            total:function (){
                var that = this;
                var bb; 
                this.cartList.forEach(function(good,index) {
                    bb = (good.salePrice) * (good.productNum);
                    that.arr1.push(bb);
                });
                for(var i = 0; i < this.arr1.length;i++){
                    this.totals += this.arr1[i];
                }
                return (this.totals);
            },
            count:function(){
                var that = this;
                var cc;
                 this.cartList.forEach(function(good,index) {
                    cc = good.productNum;
                    that.arr2.push(cc);
                });
                console.log(this.arr2);
                for(var j = 0; j < this.arr2.length;j++){
                    this.counts += this.arr2[j];
                }
                return (this.counts);
            }
        }
    }
</script>
<style scoped>
    .vux-header{
        background:green;
        color:#888;
    }
    .vux-header .vux-header-back{
        color:#888;
    }
    .left-arrow{
        color:#888;
    }
    .log{    
        background: #fff;
        padding:10px 20px;
        display: block;
        overflow: hidden;
    }
    .log span{
        color: #888;
        font-size: 14px;
    }
    .log > span{
        float: left;
        color:#333;
    }
    .log > a {
        color: #333;
        float: right;
        font-size: 14px;
    }
    .go{
        display: block;
        padding: 10px;
        font-size: 12px;
        color:#aaa;
        text-align: center;
        background: #ddd;
    }
    .go > i{
        font-size: 25px;
    }
    .go span{
        border: solid 1px #ccc;
        padding: 2px 5px;
        text-align: center;
        margin-left: 5px;
        color: #666;
    }
    .go > a{
        color:#333;
        border: solid 1px #aaa;
        padding: 3px;
    }
    .recom{
        background: #fff;
        font-size: 14px;
    }
    .trade{
        background: #fff;
    }
    .trade li{
        padding: 10px;
        overflow: hidden;
        height: 100px;
        border-bottom: solid 1px #eee;
    }
    .trade li > i{
        font-size: 24px;
        position: relative;
        top: -2px;
        left: -26px;
        color: green;
    }
    .trade li > span{
        margin-top: 30px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 1px #ddd;   
    }
    .trade li span.active{
        background: green;
    }
    .main{
        position: relative;
        height: 90px;
        left: -20px;
        top: 5px;
        float: right;
        width: 310px;
    }
    .main img{
        width: 70px;
        height: 80px;
    }
    .main > span{
        position: relative;
        width: 200px;
        overflow: hidden;
        bottom: 60px;
        font-size: 14px;
        color: #333;
        margin-left: 10px;
    }
    .main > i.sale{
        font-style: normal;
        position: relative;
        top: -65px;
        margin-left: 85px;
        color: #999;
        color: green;
        font-size: 12px;
    }
    section{
        width: 220px;
        display: inline-block;
        position: relative;
        top: -60px;
        left: 80px;
        overflow: hidden;
    }
    section p > button{
        padding: 5px 8px;
        border: none;
        border: solid 1px #dedede;
    }
    section > img{
        width: 10px;
        float:right;
    }
    .shan{
        position: relative;
        top: -27px;
        left: 200px;
        font-size: 20px;
    }
    footer{
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: 0;
        background: #fff;
        overflow: hidden;
        text-align: center;
    }
    footer a{
        float: left;
        padding:20px;
    }
    footer a:first-child{
        width: 110px;
        color: #aaa;
        font-size: 16px;
        padding: 0;
    }
    footer a span{
        font-size: 16px;       
    }
    footer a i{
        font-style: normal;
        color:green;
        font-size: 20px;
        font-weight: 500px;
    }
    footer a:nth-child(2){
        width: 105px;
        background: #eee;
        color:#555;
    }
    footer a:last-child{
        width: 86px;
        background: green;
        color: #fff;
    }
    .choose {
        padding: 10px;
        background: #fff;
        border-bottom: solid 1px #ddd;
    }
    .choose > span{
        padding: 5px;
        background: lightblue;
        margin-right:20px; 
        border-radius: 5px;
        color:#aaa;
        cursor: pointer;
        transition: all .5s;
    }
    .choose > span:hover{
        color:#fff;
        background: green;
    }
    .recom{
        border: none;
    }
    .recom h4{
        padding: 10px;
        font-size: 16px;

    }
    .weui-btn{
        /* padding: 10px; */
        width: 126px;
    }
</style>