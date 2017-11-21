<template>
    <div>
        <swiper auto>
            <swiper-item :key="index" v-for="(img,index) in images" style="margin-bottom: 100px;">
            <img class="photo" :src="'/static/' + img " alt="">
            </swiper-item>
        </swiper>
        <ul class="recom">    
            <li v-for="(good,index) in goods" :key="index"> 
                <a v-if="adminname == adder" :href="'#/edit/' + good._id">修改</a>
                <a v-if="adminname == adder" @click="delet(index)">删除</a>
                <img :src="'http://localhost:5555/uploads/' + good.productImage" alt="">
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
import axios from 'axios';
// import $ from 'jquery';
const images = ['diannao1.png','dianshi1.png','shouji1.png','shzb2.png']
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
  methods: {
    //   删除商品
      delet(index){
          console.log(22222);
          var goodId =this.goods[index]._id
          console.log(goodId);
          axios.get(`/goods/del/${goodId}`).then((data)=>{
              console.log(data.data.message);
              console.log('删除');
              location.href = '/'
          }).catch((err)=>{
              console.log(err);
          })
      },
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
    //   检查商户是否登录
      adminCheckLogin(){
          axios.post('/admin/checkLogin').then((admin)=>{  
                // console.log('商户————' + admin.data.data.adminName);
            if(admin.data.error == 0){
                this.adminname = admin.data.data.adminName;
                // console.log(this.adminname);
            }
        }).catch((err)=>{
            console.log('检查登录错误');
            console.log(err);
        })
      },
    //   检查用户是否登陆
    userCheckLogin(){
        axios.post('/users/checkLogin').then((user)=>{
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
    //   加载商品
    getGoods(){
        var that = this;
       axios.get('/goods').then((data)=>{
            this.goods = data.data.result;
            this.goods.forEach((good,index)=>{
               this.adder = good.adder
            })
        }).catch((err)=>{
            console.log(err);
        }) 
        var num = 0;
        window.onscroll = function(){
                var height = document.body.clientHeight;
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var windowH = window.innerHeight;
                if(scrollTop + windowH > height - 10){
                    num ++;
                    axios.get('/goods?page=' + num).then(function(result){
                        var datas = result.data.result;
                        datas.forEach(function(data){
                            that.goods.push(data);
                        })
                        // console.log(result.data.result)
                    }).catch(function(err){
                        console.log(err);
                    })
                }
        }
    }
  },
    mounted () {
        this.adminCheckLogin(),
        this.userCheckLogin(),
        this.getGoods()
    }
       
}
</script>
<style scoped>
.photo{
    width: 100%;
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
.recom li a:hover{
    color:#fff;
    background: green;
    cursor: pointer;
}
.buy{
    float: right;
}
</style>

