<template>
    <div class="pro">
        <a class="left" href="#/"><img src="/static/back.png" alt=""> </a>
        <a class="right" @click="share" href=""><img src="/static/share.png" alt=""> </a>
        <div class="main">
            <img :src="'http://localhost:5555/uploads/'+ good.productImage" alt="">
            <div>
                <h4> {{good.productName}} </h4>
                <p class="prodet"> 
                    {{good.productDetails}}
                    <span> {{good.productDes}} </span>    
                </p>
                 <!--  -->
                <p class="price"> <span> <i v-show="(background == true) || (collect == true)" class="fa fa-star bg"></i> <i @click="fade($event)" title="false"  class="fa fa-star-o nbg"></i> </span> <span> ￥ {{good.salePrice}} </span> </p>
                <p class="sales">
                    <span>促销</span>
                    <section>
                        <p><i>赠品</i>限量送小米活塞耳机清新版</p>
                        <p><i>赠品</i>无限流浪米粉卡 含100元话费</p>
                    </section>                    
                </p>
                <p class="choose">
                    <span>已选</span>
                    {{good.productName}}
                </p>
                <p class="adress">
                    <span>送至{{address.pro}} {{address.site}}</span>
                    <i>有现货</i>    
                </p>
                <div class="com"> 
                    <p>
                        <span>用户评价（{{comments.length}}）</span>
                        <!-- <span v-show="comments.length > 0"> 满意度 {{total}}%</span> -->
                    </p>
                    <p class="pingjia">
                        <span class="good" @click="well"> 好评 </span> <span class="bad" @click="bad"> 差评 </span>
                    </p>
                    <section v-show="comments.length == 0">
                        <p>暂无评价</p>
                    </section>
                    <ul v-show="comments.length > 0">
                        <li v-for="(comment,index) in comments">
                            <section> <img :src="'http://localhost:5555/uploads/' + comment.userId.photo" alt=""><span>{{comment.userId.username}}</span></section>
                            <section> {{comment.content}} </section>
                            <section> <img :src="'http://localhost:5555/uploads/' + comment.img" alt=""></section>
                            <p> 
                                <span>觉得有用：</span>
                                <i  @click="turn(index,$event)" class="fa fa-thumbs-o-up color" title="color" ></i>
                            </p>
                       </li>
                    </ul>
                </div>
            </div>
        </div>       
        <footer>
             <!-- <x-button @click="skip2" @click.native="showPosition('top')" type="primary">Top</x-button>
             <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="购物车添加成功" :position="position"></toast> -->
            <p>
                <a href="#/"><i class="fa fa-home"></i> <span>首页</span> </a>
                <a  @click="skip1"> <i class="fa fa-stack-overflow"></i><span>购物车</span>  </a>
                
                <a  @click="skip2">加入购物车</a>
            </p>
        </footer>
    </div>
</template>

<script>
// import { Actionsheet,TransferDom} from 'vux'
// import {XHeader, XButton,Toast} from 'vux';
    export default {
        data: function () {
            return {
                // showPositionValue: false,
                // position: 'default',
                background:false,
                color:false,
                good:'',
                username:this.username,
                adminname:this.adminName,
                id:this.id,
                address:{},
                comments:[],
                commented:[],
                arr:[],
                arr1:[],
                arr2:[],
                totals:0,
                collect:false
            }
        },
        // components: {XButton,Toast},
        created () {
                this.show()
                this.comment()
            },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'show',
            '$route':'comment'
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            fade:function(ev){
                
                 if(ev.target.title == 'true'){
                    $(ev.target).attr('title',false);
                    this.background = false;
                    var gid = this.$route.params.id;
                    this.$axios.post('/goods/noCollect/' + gid).then((good)=>{
                        // console.log(good);
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                     $(ev.target).attr('title',true);
                     this.background = true;
                    //  console.log(66666);
                    var gid = this.$route.params.id;
                    // console.log(gid);
                    this.$axios.post('/goods/collect/' + gid).then((good)=>{
                        // console.log(good);
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
               
                // console.log(this.background);
            },
            turn(index,ev){
                if(ev.target.title == 'true'){
                    $(ev.target).attr('title',false);
                    $(ev.target).removeClass('active');
                }else{
                     $(ev.target).attr('title',true);
                     $(ev.target).addClass('active');
                }
            },
            share(){
                alert('敬请期待！！');
            },           
            show(){
                var id = this.$route.params.id;
                this.$axios.post('/goods/prodet/'+id).then((data)=>{
                    this.good = data.data.good;
                }).catch((err)=>{
                    console.log(err);
                })
            },
            skip1(){
                var _this = this;
                if(!this.username){
                   return alert('登陆后才可以去往购物车哦！');
                }
                if(this.username){
                     setTimeout(function () {
                        _this.$router.push({path:'/ShoppingCart'});
                    },500)
                }
            },
            //   检查用户是否登陆
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                // console.log('用户成功');
                    // console.log(user.data);
                     var gid = this.$route.params.id;
                    if(user.data.error == 0){
                        this.id = user.data.data._id;
                        // console.log('------------');
                        // console.log(user.data.data);
                        // console.log('------------');
                        this.username = user.data.data.username;
                        this.address =  user.data.data.addressList[0];
                        var coll = user.data.data.collect;
                        // console.log(user.data.data);
                        coll.forEach((good,index)=>{
                            if(good._id == gid){
                                this.collect = true;
                            }
                        })
                        // console.log(this.collect);
                    }
                }).catch((err)=>{
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            skip2(){
                console.log(this.id);
                if(this.username){
                    var _this = this;
                    var gid = this.$route.params.id;
                    var uid = this.id;
                    console.log(gid);
                    console.log(uid);
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
            comment(){
                var gid = this.$route.params.id;
                this.$axios.post(`/users/comment/${gid}`).then((comment)=>{
                    console.log(123);
                    console.log(comment.data.comment);
                    var comments = comment.data.comment;
                    this.comments = comments;
                    var commented = comment.data.comment;
                    this.commented = commented;
                }).catch((err)=>{
                    console.log(789);
                    console.log(err);
                })
            }, 
            well(){
                var that = this;
                // console.log(this.commented);
                this.commented.forEach((wellCom)=>{
                    // console.log(wellCom.score);
                    if(wellCom.score > 4 || wellCom.score == 4){
                        that.arr1.push(wellCom);
                    }
                })
                this.comments = this.arr1;
            },
            bad(){
                var that = this;
                this.commented.forEach((wellCom,index)=>{
                    if(wellCom.score < 4){
                        that.arr2.push(wellCom);
                    }
                })
                this.comments = this.arr2;
            }
        },
        computed: {
            total(){
                var that = this;
                var commentss = this.comments;
                commentss.forEach((comment,index)=>{
                    that.arr.push((comment.score * 20));
                })
                var num = 0
               for(var i = 0; i < this.arr.length;i++){
                   num += this.arr[i];
                }
                var well = (num / this.comments.length ).toFixed(1);
                this.totals = well
                return this.totals;
            }
        }
    }
</script>
<style scoped>
.pro{
    background: #eee;
}
div > a{
    width: 20px;    
    position: relative;
    z-index: 2;
}
div > a > img{
    width: 20px;
}
div > .left{
    top: 20px;
    left: 15px;
}
div > .right{
    top: 20px;
    left: 315px;
}
div > a > i{
    padding:0px 5px;
    font-size: 18px;
    color: #fff;
}
.main{
    position: relative;
    top: -30px;
    margin-bottom: 50px;
}
.main > img{
width: 100%;
}
.main > div{
margin: 0;
position: relative;
top: -5px;
}
h4,.prodet,.price,.sales,.choose,.adress{
        background: #fff;
        padding: 10px;
        margin: 0;
}
.prodet{
    color: green;
    font-size: 12px;
}
.prodet > span{
    color:#aaa;
}
.price{
    overflow: hidden;
    border-bottom: solid 1px #ddd;
    color: green;
}
.price i{
    font-size: 25px;
}
.price > span:first-child .nbg{
    z-index: 10;
    position: relative;
}
.price > span:first-child .bg{
    position: absolute;
}
.price > span:last-child {
    
    font-style: normal;
    font-size: 18px;
    float: right;
    padding-right: 10px;
    padding-bottom: 10px;
    font-weight: 600;
    margin: 0;
}
.sales{
    border-bottom:solid 1px #ddd; 
    overflow: hidden;
    font-size: 12px;
}
.sales > span{
    width: 30px;
    float: left;
}
.sales > section{
    width: 300px;
    float: right;
    font-size: 12px;
}
.sales > section > p{
margin:0 0 10px;
}
.sales > section > p i{
font-style: normal;
color: green;
padding: 2px 5px;
border: solid 1px green;
margin-right: 5px;
}
.choose{
margin-top: 7px;
font-size: 12px;
color: green;
border-bottom: solid 1px #ddd;
}
.choose span{
    color: #000;
    margin-right: 27px;
}
.adress{
    border-bottom: solid 1px #ddd;
    font-size: 12px;

}
.adress span{
    margin-right: 27px;
    
}
.adress i{
    color: green;
    font-style: normal;
}
.com{
    font-size: 14px;
    padding: 0;
    margin-top: 10px;
}
.com p:first-child{
    border-bottom: solid 1px #ddd;
    padding: 10px;
    background: #fff;
    overflow: hidden;
}
.com p:first-child span:nth-child(2){
    float: right;
    color: green;
}
footer{
    position: fixed;
    bottom: 0;
    background: #fff;
}
footer p{
overflow: hidden;
border-top: solid 1px #ddd;
}
footer p a{
    display: block;
    padding:5px 20px 0;
    float: left;
    color: #666;
    text-align: center;
}
footer p a i{
    display:block;
    font-size: 25px;
}
footer p a:first-child{
border-right: solid 1px #ddd;
}
footer p a:last-child {
width: 219px;
background: green;
color: #fff;
padding: 15px 0;
}
li{
    margin-bottom: 20px;
    border-bottom: solid 1px #ddd;
    padding: 20px 20px 10px;
    background: #fff;
    margin-top: 10px;
}
li section:first-child img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
li section:first-child span{
    font-size: 18px;
    font-weight: 500;
    position: relative;
    top: -20px;
    left: 10px;
}
li section:nth-child(2){
    margin: 10px 0;
}
li section:nth-child(3) img{
width: 100px;
}
li > p{
    overflow: hidden;
}
li > p span{
    float: left;
}
li > p i{
    float: right;
    font-size: 25px;
}
li > p i.active{
    color: green;
}
.pingjia{
    margin-top: 10px;
    text-align: center;
    background: #fff;
    border-bottom: solid 1px #ddd;
    padding: 10px;
}
.pingjia span{
    background: green;
    padding: 5px;
    border-radius:5px; 
    cursor: pointer;
}
.pingjia span:hover{
    color:#fff;
}
.good{
margin-right: 10px;
background: green;
padding: 5px;
}
.bad{
    margin-left: 10px;
}
</style>