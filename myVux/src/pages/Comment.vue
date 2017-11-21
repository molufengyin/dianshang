<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">评论商品 </span>  <a style="color:#888;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
        <form ref="myform" action="">
            <p class="score"> <span>请打分:</span>  <input type="text" @blur="scores()" name="score"  v-model.number.lazy="score" > </p>    
            <div class="star">
                <section class="empty">
                    <i class="fa fa-star-o fa-2x"></i>
                    <i class="fa fa-star-o fa-2x"></i>
                    <i class="fa fa-star-o fa-2x"></i>
                    <i class="fa fa-star-o fa-2x"></i>
                    <i class="fa fa-star-o fa-2x"></i>
                </section>
                <div class="fulls" id="fulls">
                    <section class="full">
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                        <i class="fa fa-star fa-2x"></i>
                    </section>
                </div>
            </div>
            <p>
                <span> 发表评论：</span> <br> <textarea v-model="comment" name="comment" id="" cols="30" rows="4"></textarea><br><br>
            </p>
            <span> 上传图片： </span>
           <!-- <img v-for="i in files" :src="i" class="" :key="i"> -->
             <input multiple @change="sctp($event)" type="file" name="photo" accept="image/*" id="file-selector"><br><br>
            <button @click.stop="upload($event)" type="submit"> 上传 </button>
        </form>
    </div>
</template>

<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                name:'',
                comment:'',
                com1:'',
                photo:'',
                id:'',
                score:''
            }
        },
        components: {
            XHeader
        },
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            scores:function(){
                if(this.score > 5 || this.score < 0 ){
                    return alert('请输入1-5之间的数字');
                }
                if(this.score.toString().length > 3){
                    return alert ('保留两位小数哦亲');
                }
                var num = this.score
                $('#fulls').width(num * 33 + 'px');
            },
            sctp:function(event){
                this.photo = event.target.files[0].name;
                console.log(this.photo);
            },
            upload(event){      
                var _this = this; 
                var uid = this.id;
                var gid = this.$route.params.id;

                event.preventDefault();
                let myform = this.$refs.myform;
                let formDate = new FormData(myform);
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }               
                this.$axios.post(`/users/upload/${uid}/${gid}`,formDate,config).then((good)=>{
                   console.log(111);
                //    console.log(good.data);
                    _this.$router.push({path:'/MyOrder'});
                }).catch((err)=>{
                    console.log(err);
                })
            },
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                    // console.log(user.data.message);
                    if(user.data.error == 0){
                    this.username = user.data.data.username;
                    this.id = user.data.data._id;
                    // console.log(this.id);
                    }
                }).catch((err)=>{
                    console.log('检查登录错误');
                    console.log(err);
                })
            },
            computed: {
                
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
    .vux-header .vux-header-back{
        color:#fff;
    }
    .left-arrow{
        color:#fff;
    }
    form{
        margin-top: 80px; 
        background: #fff;       
    }
    form > p{
        padding: 10px;
    }
    form span{
        margin-top: 20px;
        margin-left: 20px;
    }
    form textarea{
        border-radius: 10px;
        margin-left: 40px;
        margin-top: 10px;
        padding-left: 20px;
        border: solid 1px #eee;
    }
    button{
        width: 100%;
        border: none;
        background: green;
        position: fixed;
        bottom:0;
        line-height: 35px;
        font-size: 18px;
        color: #FFF;
    }
    .score{
        margin: 0;
    }
    .score span{
        font-size:16px;
        margin-right: 10px;
    }
    .score input{
        width: 220px;
        line-height: 35px;
        background: #fff;
        border: solid 1px #eee;
        border-radius: 10px;
        padding-left: 20px;
    }
    .star i{
        color: yellowgreen;
        /* margin-top: 20px; */
    }
    .star{
        margin-left: 30px;
    }
    .full > i{
         color: greenyellow;
    }
    .fulls{
        width: 0px;
        position: absolute;
        overflow: hidden;
        top:135px;
    }
    .full{
       width: 250px;
    }
</style>