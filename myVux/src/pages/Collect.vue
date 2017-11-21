<template>
  <div>
      <x-header>  <span style="color:#fff;font-size:16px;">我的收藏</span>  <a href="#/" style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-home"></i></a>   </x-header> 
      <div class="body">
        <ul>
            <li v-for="(order,index) in collect">
              <!-- <p class="hd">
                <span>订单编号：{{order.orderNum}} </span>
                <span> 等待付款 </span>
              </p> -->
              <p class="main">
                <img :src="'http://localhost:5555/uploads/' + order.productImage " alt="">
                <span>
                  <span> {{order.productName}} </span>
                  <span> {{order.color}} {{order.size}} </span>
                </span>
              </p>
              <p class="jia">
                <span> 单价: <i> {{order.salePrice}} </i>  元 </span>
              </p>
              <p class="fot">
                <span @click="skip2(index)">加入购物车</span>
                <span @click="onco(index)">取消收藏</span>              
              </p>
          </li>
        </ul>
      </div>  
  </div>
</template>
<script>
import {XHeader} from 'vux';
export default {
  data:function(){
      return{
        collect:[],
        arr:[],
        orderNum:'',
        time:'',
        id:'',
        orderList:[]
      }
  },
  components: {
    XHeader
  },
  mounted () {
    this.userCheckLogin()
  },
   methods: {
        skip2(index){
                console.log(this.id);
                if(this.username){
                    var _this = this;
                    var gid = this.collect[index]._id;
                    var uid = this.id;
                    // console.log(gid);
                    // console.log(uid);
                    this.$axios.get(`/users/addCart/${gid}/${uid}`).then((good)=>{
                        // console.log('okokokoko');
                        // console.log(good);
                        setTimeout(function () {
                            _this.$router.push({path:'/ShoppingCart'})
                        },500)
                    }).catch((err)=>{
                        console.log(123);
                        console.log(err);
                    })
                }else{
                    alert('登陆后才可以添加到购物车哦！');
                }
                
            },
        userCheckLogin(){
            this.$axios.post('/users/checkLogin').then((user)=>{
            var gid = this.$route.params.id;
            if(user.data.error == 0){
                this.id = user.data.data._id;
                this.username = user.data.data.username;
                this.collect = user.data.data.collect;
                }
            }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
            })
        },
        onco(index){
            var gid = this.collect[index]._id;
            this.$axios.post('/goods/noCollect/' + gid).then((good)=>{
                console.log('取消了');
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
  margin-left:70px;
  color: green;
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

