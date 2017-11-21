<template>
    <div class="fenlei">
        <x-header>  <span style="color:#fff;font-size:16px;">商品分类</span>  <a style="color:#888;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
        <div class="classify">
            <ul>
                <li :class="{'active': ins === index}" @click="color(index)" :key="index" v-for="(classify,index) in classifys"> {{classify}} </li>
            </ul>
        </div>
        <div  class="main">
            <img src="/static/xinpin1.png" alt="">
            <div key=0>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[0]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(neww,index) in news">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + neww._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + neww.productImage" alt="">
                            <p class="des">
                                <span>{{neww.productName}}</span>
                                <span class="price">￥{{neww.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=1>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[1]}} </span>
                    <span>—</span> 
                </p>
                <ul>                    
                    <li v-for="(mobeile,index) in mobiles">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + mobeile._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + mobeile.productImage" alt="">
                            <p class="des">
                                <span>{{mobeile.productName}}</span>
                                <span class="price">￥{{mobeile.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip1(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <!-- <div key=2>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[2]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(tel,index) in tels">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + tel._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + tel.productImage" alt="">
                            <p class="des">
                                <span>{{tel.productName}}</span>
                                <span class="price">￥{{tel.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip2(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=3>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[3]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(com,index) in coms">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + com._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + com.productImage" alt="">
                            <p class="des">
                                <span>{{com.productName}}</span>
                                <span class="price">￥{{com.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip3(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=4>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[4]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(home,index) in homes">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + home._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + home.productImage" alt="">
                            <p class="des">
                                <span>{{home.productName}}</span>
                                <span class="price">￥{{home.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip5(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=5>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[5]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(route,index) in routes">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + route._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + route.productImage" alt="">
                            <p class="des">
                                <span>{{route.productName}}</span>
                                <span class="price">￥{{route.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip6(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=6>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[6]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(capacity,index) in capacities">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + capacity._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + capacity.productImage" alt="">
                            <p class="des">
                                <span>{{capacity.productName}}</span>
                                <span class="price">￥{{capacity.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip7(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div>
            <div key=7>
                <p>
                    <span>—</span>
                        <span class="fl"> {{classifys[7]}} </span>
                    <span>—</span> 
                </p>
                <ul>
                    <li v-for="(around,index) in arounds">
                        <p class="admin" v-if="adminname">
                            <a  v-if="adminname" :href="'#/edit/' + around._id">修改</a>
                            <a v-if="adminname" @click="delet(index)">删除</a>
                        </p>
                        <div class="right">
                            <img :src="'http://localhost:5555/uploads/' + around.productImage" alt="">
                            <p class="des">
                                <span>{{around.productName}}</span>
                                <span class="price">￥{{around.salePrice}} </span>
                            </p>
                            <a class="buy" @click="skip4(index)"> 立即购买 </a>
                        </div>
                    </li> 
                </ul>
            </div> -->
        </div>
       
        <footer-nav></footer-nav>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderNav from './../components/HeaderNav';
import FooterNav from './../components/FooterNav';
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
               classifys:['新品','手机','电视','电脑','家电','路由','智能','电源','耳机','音箱','礼品','生活','米粉卡','零售店'],
                ins:0,
                adminname:'',
                username:'',
                news:'',
                mobiles:'',
                tels:'',
                coms:'',
                homes:'',
                routes:'',
                capacities:'',
                arounds:'',
                goods:[]
            }
        },
        components: {
            HeaderNav,
            FooterNav,
            XHeader
        },
        methods: {
            color(index){
                this.ins = index;
            },
            delet(index){
                console.log(22222);
                var goodId =this.news[index]._id
                console.log(goodId);
                this.$axios.get(`/goods/del/${goodId}`).then((data)=>{
                    // console.log(data.data.message);
                    console.log('删除');
                    location.href = '/'
                }).catch((err)=>{
                    console.log(err);
                })
            },
            adminCheckLogin:function(){
                this.$axios.post('/admin/checkLogin').then((admin)=>{
                    if(admin.data.error == 0){
                        // console.log('商户————' + admin.data.data.adminName);
                        this.adminname = admin.data.data.adminName;
                    }
                }).catch((err)=>{
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            //   检查用户是否登陆
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                // console.log('用户成功');
                // console.log(user.data);
                    if(user.data.error == 0){
                        this.username = user.data.data.username;
                    }
                }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
                })
            },
            skip(index){
                var _this = this;
                console.log(this.news[index]._id);
                var id = this.news[index]._id
                // console.log(this.username);
                if(this.username || this.adminname){
                    setTimeout(function () {
                        _this.$router.push({path:'/ProductDetails/'+ id})
                    },500)
                }else{
                    alert('登录后才可以购买哦！！');
                }
            },
            getNewGoods(){
                this.$axios.get('/goods/new').then((data)=>{
                    // console.log(data.data.result);
                    // console.log('可以');
                    this.news = data.data.result;
                }).catch((err)=>{
                    console.log(err);
                })
            },
            getMobile(){
                this.$axios.get('/goods/mobile').then((data)=>{
                    console.log(data.data.data);
                    // console.log('可以');
                    this.mobiles = data.data.data;
                }).catch((err)=>{
                    console.log(err);
                })
            }
        },
        mounted () {
            this.getNewGoods(),
            this.adminCheckLogin(),
            this.userCheckLogin(),
            this.getMobile()
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
    .classify{
        font-size: 14px;
        padding-bottom:100px;
        width: 50px;
        position: fixed;
        left:0;
        top:50px;
        float: left;
    }
    .classify ul{
        width: 100px;
        text-align: center;
        border-right:solid 1px #ccc;
    }
    .classify ul li{
        padding: 10px 0;
        cursor: pointer;
        letter-spacing: 2px;
    }
    .classify ul li.active{
        font-size: 16px;
        color: green;
        transition: all .5s;
    }
    .main{
        width: 240px;
        float: right;
        padding:0 20px;
        margin-top: 40px;
    }
    .main > img{
        width: 100%;
    
    }
    .main > div{
        text-align: center;
    }
    .main > div > p{
        margin:20px 0; 
    }
    .main > div > p > span{
        color: #ccc;
    }
    .main > div  .fl{
        color:#555;
    }
    .main ul{
        overflow: hidden;
    }
    .main ul li{
        background: #fff;
        padding: 15px;
        margin-bottom: 20px;
    }
    li .admin{
        /* background: red; */
        margin: 0;
        margin-bottom: 10px;
    }
    li .admin a{
        padding: 5px;
        background:lightblue;
        margin-right: 20px; 
        margin-left: 15px;
        border-radius:10px;
        color:#555; 
    }
    li .admin a:hover{
        cursor: pointer;
        background: green;
        color:#FFF;
        transition: all .5s;
    }
    .right > img{
        width: 120px;
    }
    .des{
        font-size: 14px;
        margin-bottom: 10px;
    }
    .price{
        color: green;
        font-weight: 600;
        
    }
    .right > a{
        background: lightblue;
        padding: 5px 30px;
        border-radius:10px;
        color: #555;
    }
    .right > a:hover{
        background: green;
        color: #fff;
        transition: all .5s;
        cursor: pointer;
    }
</style>