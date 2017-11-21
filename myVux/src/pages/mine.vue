<template>
    <div>
        <a href="#/person">
            <header class="header">
                <img :src="'http://localhost:5555/uploads/' + photo" alt="">
                <!-- <i class="fa fa-user-circle"></i> -->
                <p>
                    <a href="#/userLogin">{{username}}</a>
                    <span>{{motto}}</span>
                </p>
                
            </header>
        </a>
        <p class="order">
            <a href="#"> 我的订单 </a>
            <!-- <a href="">
                全部订单
                <i class="fa fa-angle-right"> </i>
            </a> -->
        </p>
        <grid>
            <grid-item link="/WaitPay" label="待付款">
                <img slot="icon" src="/static/daifukuan.png">
                <span v-show="orderList.length > 0" class="count"> {{orderList.length}} </span>
            </grid-item>
            <grid-item link="/ExChange" label="待收货">
                <img slot="icon" src="/static/daishouhuo.png">
                <span v-show="checked.length > 0" class="count"> {{checked.length}} </span>
            </grid-item>
            <grid-item link="/MyOrder" label="全部订单" @on-item-click="onItemClick">
                <img slot="icon" src="/static/tuihuanhuo.png">
            </grid-item> 
        </grid>
        <group>
            <cell title="会员福利" link="/PointSmall" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/wode.png">
            </cell>
            <cell title="我的优惠" link="/DisCount" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/wodeyouhui.png">
            </cell>
            <!-- <span v-show="com.length > 0" class="count2"> {{com.length}} </span> -->
            <cell title="我的评价" link="/reply">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/rt.png">               
            </cell>
             <span v-show="com.length > 0" class="count2"> {{com.length}} </span>
            <cell title="小米之家" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/xiaomizhijia.png">
            </cell>
            <cell title="我的收藏" link="/Collect">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/fuwu.png">
            </cell>
            <cell title="设置" link="/SetTing" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="/static/shezhi.png">
            </cell>
            
        </group>
        <footer-nav></footer-nav>
    </div>
</template> 

<script>
import axios from 'axios';
import FooterNav from './../components/FooterNav';
import { Cell, Grid, GridItem, Group} from 'vux'
    export default {
        data: function () {
            return {
                com:[],
                username:'',
                id:'',
                motto:'',
                photo:'',
                arr1:[],
                arr2:[],
                arr3:[],
                orderList:[],
                checked:[]
            }
        },
        components: {
            FooterNav,
            Grid,
            GridItem,
            Cell,
            Group
        },
        mounted () {
          this.userCheckLogin()  
        },
        methods: {
            onItemClick () {
            console.log('on item click')
            },
            userCheckLogin(){               
                this.$axios.post('/users/checkLogin').then((user)=>{
                // console.log('用户成功');
                var that= this;
                    console.log(user.data);
                    if(user.data.error == 0){
                        this.username = user.data.data.username;
                        this.motto = user.data.data.motto;
                        this.photo = user.data.data.photo;
                        this.id = user.data.data._id;
                        console.log(this.photo);
                        var orderLists = user.data.data.orderList;
                        orderLists.forEach(function(good,index) {
                            if(good.isJes == false){
                                that.arr1.push(good);
                            }
                            if(good.checked == 1 && good.isJes == true){
                                that.arr2.push(good);
                            }
                             if(good.checked == 2 && good.isJes == true && good.isCom ==false){
                                that.arr3.push(good);
                            }
                    });   
                    this.orderList = this.arr1;
                    this.checked = this.arr2;
                    this.com = this.arr3;
                    }
                }).catch((err)=>{
                    console.log('检查登录错误');
                    console.log(err);
                })
            }
        }
    }
</script>
<style scoped>
    .header{
        background: url('/static/bjtp1.jpg') center 0 no-repeat;
        /* background:orangered; */
        background-size: 100%;
        padding: 10px;
        overflow: hidden;
    }
    .header img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
    }
    .header i{
        font-size: 40px;
        border-radius: 50%;
        text-align: center;
        border: solid 1px green;
        color:#fff;
        background: green;
    }
    .header p {
        width: 250px;
        float: right;
    }
    .header a{
        color:#fff;
        /* position: relative;
        top: -30px;
        left: 10px; */
        font-size: 18px;
        font-weight: 600;
    }
    .header span{
        display: block;
        color: #fff;
        font-size: 14px;       
        /* float: left; */
    }
    .order{
        background: #fff;
        padding: 10px 15px;
        border-bottom: solid 1px #ddd;
        overflow: hidden;
        font-size:14px;
    }
    .order > a:first-child{
        float: left;
        color: #555;
    }
    /* .order > a:last-child{
        float: right;
        color: #555;
    } */
    .order > a:last-child i{
        font-style: normal;
        font-size:22px;
        margin-left: 5px;
    }
    .weui-cells{
        margin-bottom: 100px;
    }
    .weui-cell{
        padding: 20px;
        margin-bottom: 10px;
        background: #fff;
        border-top: solid 1px #ddd;
    }
    .weui-grids{
        background: #fff;
        margin-bottom: 10px;
    }
    .weui-cell::before{
        border-top: none;
    }
    .weui-grid__icon{
        position: relative;
    }
.count{
    position: absolute;
    top:10px;
    left:70px; 
    background: green;
    padding: 0px 7px;
    border-radius: 50%;
    font-size: 12px;
    color:#FFF;
}
.vux-cell-bd > p > lable{
    position: relative;
}
.count2{
    position: absolute;
    top: 170px;
    left: 330px;
    background: green;
    padding: 0px 5px;
    border-radius: 50%;
    font-size: 12px;
    color:#FFF;
}
</style>