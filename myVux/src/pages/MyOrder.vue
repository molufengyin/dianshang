<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">全部订单</span>  <a href="#/" style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-home"></i></a>   </x-header>
        <div v-show="orderList.length == 0 " class="order">
            <button-tab>
                <button-tab-item link="/">{{ '全部商品' }}</button-tab-item>
                <button-tab-item link="classify" selected>{{ '精选商品' }}</span></button-tab-item>
            </button-tab>
        </div>
        <div class="body">
        <ul>
            <li v-for="(order,index) in orderList">
              <p class="hd">
                <span>订单编号：{{order.orderNum}} </span>
                <span class="active" v-show="order.isJes == true"> 已付款 </span>
                <span class="active action" v-show="order.isJes == false "> 等待付款 </span>
              </p>
              <p class="main">
                <img :src="'http://localhost:5555/uploads/' + order.productImage " alt="">
                <span>
                  <span> {{order.productName}} </span>
                  <span> {{order.color}} {{order.size}} </span>
                </span>
              </p>
              <p class="jia">
                <span>共 {{order.productNum}} 件商品</span>
                <span> 总金额: <i> {{order.salePrice}} </i>  元 </span>
              </p>
          </li>
        </ul>
      </div>

        <footer-nav></footer-nav>
    </div> 
</template>

// <script>
import FooterNav from './../components/FooterNav';
import {XHeader} from 'vux';
import { ButtonTab, ButtonTabItem} from 'vux'
    export default {
        data: function () {
            return {
                arr:[],
                orderList:[]
            }
        },
        components: {
            FooterNav,
            XHeader,
            ButtonTab,
            ButtonTabItem
        },
        mounted () {
          this.userCheckLogin()  
        },
        methods: {
            userCheckLogin(){
                var that = this;
                this.$axios.post('/users/checkLogin').then((user)=>{
                    if(user.data.error == 0){
                        this.id = user.data.data._id;
                        this.orderList = user.data.data.orderList;
                    }
                    }).catch((err)=>{ 
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            cancle(index){
                var gid = this.orderList[index]._id; 
                var uid = this.id;
                var _this = this;
                this.$axios.post(`/users/cancle/${uid}/${gid}`).then((err)=>{
                    console.log(111);
                    _this.$router.push({path:'/ShoppingCart'})
                }).catch((err)=>{
                    console.log(err);
                })
            },
            finish(index){
                var gid = this.orderList[index]._id; 
                var uid = this.id;
                var _this = this;
                this.$axios.post(`/users/finish/${uid}/${gid}`).then((err)=>{
                    console.log(111);
                    _this.$router.push({path:'/OrderFinish'})
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
.vux-header-back{
    color:#fff;
}
.left-arrow{
    color:#fff;
}
.vux-header-left{
    color:#fff;
}
.vux-header-title span{
    color: #fff;
}
.order{
    width: 100%;
    height: 300px;
    background: url('/static/empty.png') 50% 0 no-repeat;
    background-size: 100px;
    margin-top: 50px;
    text-align: center;
}
.vux-button-group{
    position: relative;
    top: 150px;
    width: 300px;
    left: 30px;
}
.vux-button-group > a.vux-button-group-current{
    background: green;
}
.vux-button-group > a.vux-button-tab-item-first::after,
.vux-button-group > a.vux-button-tab-item-last::after{
    border: solid 1px green;
}
.vux-button-group > a.vux-button-tab-item-first{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.vux-button-group > a.vux-button-tab-item-last {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
ul li{
padding:10px 20px;
margin-bottom: 20px;
overflow: hidden;
border-bottom: solid 1px #ddd;
background: #fff;
margin-top: 10px;
}
ul li .hd{
  border-bottom: solid 1px #ddd;
  padding: 5px 0 10px;
  font-size: 14px;
}
ul li .hd span.active{
  margin-left: 70px;
  color: #bbb;
}
ul li .hd span.action{
    color:green;
}
ul li .main{
  border-bottom: solid 1px #ddd;  
  padding: 15px 0 20px;
  margin-bottom: 10px;
  overflow: hidden;
}
ul li .main img{
  width: 70px;
}
ul li .main > span{
  width: 250px;
  float: right;

}
ul li .main > span > span:first-child{
  font-size: 14px;
  display: block;
}
ul li .main > span > span:last-child{
  font-size: 12px;
}

.jia{
  font-size: 14px;
  float: right;
  margin-bottom: 10px;
}
.jia > span:last-child{
  margin-left: 30px;
}
.jia > span:last-child i{
  color: green;
  font-style: normal;
  font-weight: 500;
}
ul li .fot{
  width: 100%;
  /* border: solid 1px red; */
  font-size: 14px;
  overflow: hidden;
  text-align: right;
}
ul li .fot > span:last-child{
    border: solid 1px green;
    padding: 0px 8px;
    margin-left: 30px;
    color: green; 
    cursor: pointer;
}
ul li .fot > span:first-child{  
    border: solid 1px #666;
    padding:0px 8px; 
    cursor: pointer;
}
</style>
