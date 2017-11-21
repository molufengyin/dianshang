<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">商品查找</span>  <a href="#/" style="color:#888;font-size:16px;" slot="right"><i class="fa fa-home"></i></a>   </x-header>
        <input class="search" type="text" name="search" v-model="search" placeholder="请输入搜索关键字"> 
        <div class="pai">
           <span @click="down" > 价格降序 <i class=" fa fa-long-arrow-down down"></i> </span> 
           <span @click="up"> 价格升序 <i class="fa fa-long-arrow-up up"></i>  </span>
            <i @click="fade"> 价格筛选：</i>
            <ul v-if="willShow" :key="index" v-for="(range,index) in ranges">
              <li  title="false" @click="showp(index,$event)">{{range}} </li>
            </ul>
        </div>
        <h2 class="no" v-show="show"> 没有该区间的商品</h2>
        <ul class="good">
            <li :key="index" v-for="(good ,index) in goods">
                <!-- {{good}} -->
                <img :src="'http://localhost:5555/uploads/'+ good.productImage" alt="">
                <p>
                    <span> {{good.productName}} </span><br>
                    <span class="des"> {{good.productDes}} </span>
                    <span class="des"> {{good.color}} </span>
                    <span class="des"> {{good.size}} </span><br>
                    <i>￥ {{good.salePrice}} {{username}}</i><br>
                    <span @click="skip2(index)" class="cart"> 添加至购物车 </span>
                    <span class="buy"> 立即购买 </span>
                </p>
            </li>
        </ul>        
        <button @click="searches">搜索</button>
    </div>
</template>

<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                search:'',
                show:false,
                willShow:false,
                goods:[],
                goodsT:[],
                username:'',
                id:'',
                ranges: [
                    "0.00 - 100.00",
                    "100.00 - 1000.00",
                    "1000.00 - 5000.00",
                    "5000.00 - 10000.00"
                ]
            }
        },
        components: {XHeader},
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            //   检查用户是否登陆
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                // console.log('用户成功');
                // console.log(user.data);
                    if(user.data.error == 0){
                        this.username = user.data.data.username;
                        this.id = user.data.data._id;
                    }
                }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
                })
            },
            fade:function(){
                if(this.willShow == false){
                    this.willShow = true;
                }else{
                    this.willShow = false;
                }
            },
            searches(){
                // console.log(this.search);
                this.$axios.post('/goods/search',{
                    search:this.search
                }).then((data)=>{
                   var goods = data.data.goods;
                    this.goods = goods;
                   var goodsT = data.data.goods;
                    this.goodsT = goodsT;
                }).catch((err)=>{
                    console.log(err);
                })
            },
            up(){
                console.log(this.search);
                this.$axios.post('/goods/search/up',{
                    search:this.search
                }).then((data)=>{
                    this.goods = data.data.goods;
                    console.log(222);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            down(){
                console.log(this.search);
                 this.$axios.post('/goods/search/down',{
                    search:this.search
                }).then((data)=>{
                    this.goods = data.data.goods;
                    console.log(222);
                }).catch((err)=>{
                    console.log(err);
                })
            },
            showp: function(index,ev) {
                if(ev.target.title == 'true'){
                    $(ev.target).attr('title',false);
                    $(ev.target).addClass('active');
                }else{
                     $(ev.target).attr('title',true);
                     $(ev.target).removeClass('active');
                }
                // $(ev.target).addClass('active').siblings().removeClass();
                var range = this.ranges[index].split(" - ");
                var aa = [];
                this.goodsT.forEach(function(good) {
                    if (good.salePrice <= range[1] && good.salePrice >= range[0]) {
                    aa.push(good);
                    }
                });
                this.goods = aa;
                if(this.goods == []){
                    this.show = true;
                };
            },
            skip2(index){
                if(this.username){
                    var _this = this;
                    var goodId = this.goods[index]._id
                    // console.log(goodId);
                    var userId = this.id;
                    // console.log(userId);
                    this.$axios.get(`/users/addCart/${ goodId}`).then((good)=>{
                        // console.log('okokokoko');
                        // console.log(good);
                        setTimeout(function () {
                            _this.$router.push({path:'/ShoppingCart'})
                        },500)
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                    alert('登陆后才可以添加到购物车哦！');
                }
                
            }
        }
    }
</script>
<style scoped>
    .vux-header{
        width: 100%;
        background:green;
        color:#fff;
        position: fixed;
        top: 0;    
    }
    .no{
        margin-top: 100px;
        margin-left: 20px;
    }
    .fenlei{
        position: relative;
        overflow: hidden;
    }
    .vux-header .vux-header-back{
        color:#fff;
    }
    .left-arrow{
        color:#fff;
    }
    .search{
        background: #fff;
        border: none;
        position: relative;
        top: 70px;
        left: 10px;
        width: 90%;
        line-height: 40px;
        border-radius: 10px;
        padding-left: 15px;
    }
    .pai{
        position: relative;
        top: 90px;
        left: 10px;
        font-size: 14px;
    }
    .pai span{
        width: 70px;
        padding: 5px;
        border-radius:7px; 
        cursor: pointer;
    }
    .pai span:hover{
        background: green;
        color:#fff;
        transition: all .5s;
    }
    .pai span.active{
        background:green;
        color:#fff;
        transition: all .5s;
    }
    .pai > i{
        font-style: normal;
        margin-left: 20px;
        cursor: pointer;
    }
    .pai ul{
        position: relative;
        background: #fff;
        width: 200px;
        left: 100px;
    }
    .pai li{
        padding: 5px;
        font-size: 12px;
        cursor: pointer;
    }
    .pai li:hover{
        color: green;
        font-size: 14px;
        position: relative;
        left:5px;
        transition: all .5s;
    }
    .pai li.active{
        color: green;
        font-size: 14px;
        position: relative;
        left:5px;
        font-weight: 500;
        transition: all .5s;
    }
    button{
        position: fixed;
        bottom: 0;
        border: none;
        /* border-radius: 10px; */
        background: green;
        width: 100%;
        line-height: 40px;
        color:#fff;
        font-size: 20px;
    }
    .good{
        position: relative;
        top: 120px;
    }
    .good img{
        width: 100px;
    }
    .good li{
        overflow: hidden;
        background: #fff;
        padding: 20px;

    }
    .good li p{
        width: 200px;       
        float: right;
    }
    .good p span{
        display: inline-block;
    }
    .des{
        font-size: 14px;
    }
    .good p i{
        color: green;
        font-style: normal;
    }
    .cart,.buy{
        /* margin-left: 20px; */
        background: green;
        padding: 5px;
        border-radius: 10px;
    }
    .buy{
        margin-left: 10px;
    }
</style>