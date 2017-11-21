<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">用户结算</span>  <a href="#/" style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-home"></i></a>   </x-header> 
        <p v-if="addressList.length == 0 ">
            <a class="adres" href="#/AddAdress"> 添加收货地址</a>
            <i class="fa fa-angle-right right"></i>
        </p> 
        <section v-else="addressList.length > 0" class="address">
            <span> {{address.name}} </span>
            <span class="tel"> {{address.tel}} </span><br>
            <a href="#/ProFile" class="skip">
                <span>  {{address.pro}} {{address.site}} </span>
                <i class="fa fa-angle-right addre"></i>
            </a>
        </section>
        <div class="send">
            <p> <span> 快递配送: </span> <span> 免运费</span> </p>
            <p> 无优惠券  </p>
        </div>
        <ul class="goods">
            <li v-for="(good,index) in cartList">
                    <img :src="'http://localhost:5555/uploads/'+ good.productImage" alt="">  
                    <section>
                        <p> {{good.productName}} {{good.size}} &#x3000; {{good.productNum}} 件</p>
                        <i> 单价：￥ {{good.salePrice}}  </i>
                    </section>                         
            </li>
        </ul>
        <p class="jia"> 商品价格：￥ {{total}} 元</p>
        <p class="di" v-show="addressList.length > 0 "> <span> 配送至： </span> {{address.pro}} {{address.site}} </p>
        <footer>
            <a style="padding:0;" href="">
               <span style="display:block;">共 <i>{{count}} </i>件 金额：</span>
               <i>￥ {{total}}</i> 元 
            </a>
            <a @click="wait"> 去付款 </a>
       </footer>
    </div>
</template>

<script>
import {XHeader} from 'vux';
 const orderNums=[
     102345678910245,789654123012365,989456123015688,123456789010201,102301230456025,
     902111111111245,589622222222365,389333333333688,523444444444401,602888888888025,
     102188888881245,689626666666365,789222222223688,123489999999401,102877777778025
     ]
    export default {      
        data: function () {
            return {
                arr1:[],
                arr2:[],
                arr3:[],
                username:'',
                id:'',
                counts:0,
                totals:0,
                cartList:[],
                address:{},
                addressList:'',
                pei:0,
                car:0,
                orderNums,
                num:0
            }
        },
        mounted () {
          this.userCheckLogin()  
        },
        components: {XHeader},
        methods: {
            userCheckLogin(){
                var that = this;
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        this.car = user.data.data.addressList.length
                        this.addressList = user.data.data.addressList;
                        this.id = user.data.data._id;
                        var arr = user.data.data.cartList;
                        console.log(user.data.data.cartList);
                        arr.forEach(function(good,index){
                            if(good.choose == true){
                                console.log(good);
                               that.arr3.push(good);
                                // console.log(user.data.data.cartList);
                            }
                        })
                        this.cartList = this.arr3;
                        this.address = user.data.data.addressList[0];                       
                    }
                }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            wait(){
                var uid = this.id;
                var _this = this;
                var index = Math.floor(Math.random() * this.orderNums.length + 1) - 1;
                this.num =this.orderNums[index]; 
                console.log(this.num);
                this.$axios.post('/users/wait/' + uid,{
                    orderNum:this.num
                }).then((user)=>{
                    console.log(user);
                    _this.$router.push({path:'/WaitPay'})
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
                    this.counts =this.counts + this.arr2[j];
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
.adres{
    background: #fff;
    color:#000;
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
}
i.right{
    position: relative;
    top:-34px;
    left:350px;
    font-size: 18px;
    color:#aaa;
}
footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    overflow: hidden;
    text-align: center;
}
footer a{
    float: left;
    padding: 10px 0;
}
footer a:first-child{
    width: 50%;
    background: #fff;
    color:#555;
    padding: 12px 0;
}
footer a:last-child{
    width: 50%;
    background: green;
    /* position: relative; */
    color:#fff;
    /* bottom:-5px; */
    padding: 13px 0;
}
footer  i{
    color:green;
    font-weight: 600;
    font-style: normal;
}
div > section{
    padding: 15px;
    background: #fff;
    border: solid 1px #ddd;
}
div > section > span{
    font-size: 18px;
    font-weight: 500;
}
.tel{
    font-size: 17px;
    margin-left: 10px;
}
.skip{
 overflow: hidden;
 color: #888;
}
.skip span{
    font-size: 14px;
}
.addre{
    float: right;
    color: #888;
    font-size: 18px;
}
.send{
    margin-top: 20px;
    background: #fff;
}
.send p{
    padding: 10px;
    border-bottom: solid 1px #ddd;
    font-size: 14px;
}
.goods{
    background: #fff;
    margin-top: 20px;
    padding: 10px 20px;
    overflow: hidden;
}
.goods li{
    border-bottom: solid 1px #ddd;
    padding: 15px 0;
    overflow: hidden;
}
.goods img{
    width: 50px;
}
.goods section{
    width: 240px;
    font-size: 14px;
    float: right;
    margin: 0;
}
.goods section i{
    margin-left: 125px;
    color:green;
    font-style: normal;
}
.jia{
    margin-top: 20px;
    padding: 10px 20px;
    background: #fff;
}
.di{
    margin-top: 20px;
    background: #fff;
    padding: 10px;
}
</style>