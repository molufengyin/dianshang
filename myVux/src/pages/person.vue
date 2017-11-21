<template>
    <div>
        <x-header>  <span style="color:#fff;font-size:16px;">个人设置 </span>  <a style="color:#888;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
        <form ref="myform" action="">
           <span> 昵称： </span> <input v-model="name" name="name" type="text" placeholder="请输入昵称" required><br><br>
           <span> 个性签名： </span> <input v-model="motto" type="text" name="motto" placeholder="请设置个性签名"><br><br>
            <span> 个人头像： </span>
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
                motto:'',
                photo:'',
                id:''
            }
        },
        components: {XHeader},
        mounted () {
            this.userCheckLogin()
        },
        methods: {
            sctp:function(event){
                this.photo = event.target.files[0].name;
                console.log(this.photo);
            },
            upload(event){      
                var _this = this; 
                var uid = this.id;
                event.preventDefault();
                let myform = this.$refs.myform;
                let formDate = new FormData(myform);
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }               
                this.$axios.post('/users/upload/' + uid,formDate,config).then((good)=>{
                    console.log(good.data);
                    _this.$router.push({path:'/mine'});
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
        margin-top: 70px;
        background: #fff;
    }
    form input{
        width: 200px;
        border:none;
        background: #fff;
        line-height: 35px;
        border-radius: 10px;
        padding-left: 10px;
    }
   form span{
        margin-left: 20px;
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
</style>