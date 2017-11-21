<template>
    <div>
        <!-- <swiper auto>
            <swiper-item :key="index" v-for="(img,index) in images" style="margin-bottom: 100px;">
            <img class="photo" :src="'/static/' + img " alt="">
            </swiper-item>
        </swiper> -->
        <img class="photo" src="/static/diannao1.png" alt="">
        <img class="bpzm" src="/static/diannao2.png" alt="">
        <ul class="recom">    
            <li v-for="(good,index) in goods" :key="index"> 
                <a v-if="adminname == adder" :href="'#/edit/' + good._id">修改</a>
                <a v-if="adminname == adder" @click="delet(index)">删除</a>
                <img :src="'http://localhost:5555/uploads/'+ good.productImage" alt="">
               <h4> {{good.productName}} </h4>  
               <p>  {{good.productDes}} </p> 
               <i>￥  {{good.salePrice}} </i>
               <a class="buy" @click="skip(index)"> 立即购买 </a>
            </li>                        
        </ul>
    </div>
</template>
<script>
import { Swiper , SwiperItem} from 'vux'
const images = ['zhineng2.png','zhineng3.png']
export default {
  data (){
      return {
          goods:'',
          images,
          adminname:'',
          username:'',
          adder:''
      }
  },
  components: {
      Swiper, 
      SwiperItem
  },
   mounted () {
        this.adminCheckLogin() ,
        this.userCheckLogin(),
        this.getGood() 
    },
    methods: {
        //   跳转
        skip(index){
            var _this = this;
            console.log(this.goods[index]._id);
            var id = this.goods[index]._id
            console.log(this.username);
            if(this.username || this.adminname){
                setTimeout(function () {
                    _this.$router.push({path:'/ProductDetails/'+ id})
                },500)

            }else{
                alert('登录后才可以购买哦！！');
            }
        },
        delet(index){
            console.log(22222);
            var goodId =this.goods[index]._id
            console.log(goodId);
            this.$axios.get(`/goods/del/${goodId}`).then((data)=>{
                console.log(data.data.message);
                console.log('删除');
                location.href = '/'
            }).catch((err)=>{
                console.log(err);
            })
        },
        getGood:function(){
            this.$axios.get('/goods/computer').then((data)=>{
            this.goods = data.data.data;
            this.goods.forEach((good,index)=>{
               this.adder = good.adder
            })
                
            }).catch((err)=>{
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
        }
    }
}
</script>
<style scoped>
.photo{
    display: block;
    width: 100%;
    height: 180px;
}
.bpzm{
    display: block;
    width: 100%;
    border-top:solid 2px #CC1B27; 
}
.recom{
    margin-top: 20px;
    background:lightblue;
    margin-bottom: 60px;
    /* overflow: hidden; */
}
.recom li{
   background: #fff;
   padding:20px 10px;
   margin-bottom: 10px;
   overflow: hidden;
}
.recom li img{
    width: 100%;
    height: 200px;
    margin-top: 10px;
}
.recom li a{
    text-align: center;
    color: #666;
    margin-right: 20px;
    background: lightskyblue;
    padding: 5px;
    border-radius: 10px;
    transition: all .5s;
}
.recom li a:hover{
    background: green;
    color:#fff;
}
.recom li p{
    font-size: 14px;
}
.recom li i{
    color: green;
    font-style: normal;
    float: left;
}
.recom li span{
    float: right;
    background: lightskyblue;
    padding: 5px;
    border-radius:10px;
}
.recom li span:hover{
    color:#fff;
    background: green;
    cursor: pointer;
}
.buy{
    float: right;
}
</style>

