<template>
  <div class="exchange">    
    <x-header>  <span style="color:#fff;font-size:16px;"> 待收货 </span>  <a style="color:#999;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
   <div v-show="orderList.length == 0">
        <p class="sh"><a href=""> 申请售后 </a></p>
        <p class="bj">
            <img src="/static/shfu1.png" alt="">
        </p>
   </div>
        <ul>
            <li v-for="(order,index) in orderList">
              <p class="hd">
                <span>订单编号：{{order.orderNum}} </span>
                <span> 已付款 </span>
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
              <p class="fot">
                <a v-show="order.checked == 2 && order.isCom == false" href="#/reply">去评论</a>
                <a v-show="order.checked == 1" @click="affirm(index)">确认收货</a>          
              </p>
          </li>
        </ul>
    <footer-nav></footer-nav>
  </div>
</template>
<script>
import FooterNav from './../components/FooterNav';
import {XHeader} from 'vux';
export default {
  data:function(){
    return{
        arr:[],
        orderNum:'',
        time:'',
        id:'',
        orderList:[]
    }
  },
  components: {
    FooterNav,
    XHeader
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
          var orderLists = user.data.data.orderList;
          orderLists.forEach(function(good,index) {
            if(good.isJes == true && good.checked == 1){
              that.arr.push(good);
            }
          });   
          this.orderList = this.arr;
        }
      }).catch((err)=>{ 
        console.log('检查登录错误');
        console.log(err);
      })
    },
    affirm(index){
      var gid = this.orderList[index]._id;
      var uid = this.id;
      var _this = this;
      console.log(uid);
      this.$axios.post(`/users/affirm/${uid}/${gid}`).then((data)=>{
        console.log(data.data.message);
        _this.$router.push({path:'/'});
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
.exchange{
    background: #eee;
}
.exchange .sh{
background: #fff;
/* margin-top: 20px; */
padding: 10px;
text-align: center;
border: solid 1px #aaa;
margin: 20px 20px 0;
}
.exchange .sh a{
background: #fff;
margin-top: 20px;
padding: 10px;
text-align: center;
color: #777;
font-size: 18px;
}
.bj{
    text-align: center;
    background: #eee; 
}
.bj img{
     width: 200px;
     margin-top: 50px;
}
.recom{
    height: 300px;
}
.recom p{
    padding-left: 40px;
    color: #333;
}
ul{
    margin-bottom: 100px;
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
ul li .hd span:last-child{
  margin-left: 80px;
  color: #bbb;
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
  font-size: 16px;
  overflow: hidden;
  text-align: right;
}
.fot a{
    color:#777;
    background: lightblue;
    padding: 5px;
    border-radius: 10px;
}
.fot a:hover{
    background: green;
    color: #fff;
    transition: all .5s;
}
</style>
