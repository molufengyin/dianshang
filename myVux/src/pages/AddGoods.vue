<template>
    <div class="add">
        <x-header>  <span style="color:#fff;font-size:16px;">添加商品</span>  <a href="#/" style="color:#aaa;font-size:18px;" slot="right"> <i class="fa fa-home"></i> </a></x-header>
        <form ref="myform" action="">
           <span> 商品名字： </span> <input v-model="name" name="name" type="text" placeholder="请输入商品名称" required><br><br>
           <span> 商品价格： </span> <input v-model="price" type="text" name="price" placeholder="请输入商品价格" required><br><br>
           <span>颜色：</span> <input v-model="color" name="color" placeholder="请输入商品颜色" type="text"><br><br>
           <span> 型号： </span> <input v-model="size" name="size" placeholder="请输入商品型号" type="text"><br><br>
           <span> 商品描述： </span> <input v-model="des" type="text" name="des" placeholder="请描述本产品" required><br><br>
           <span>商品分类：  </span> 
           <select v-model="category" name="category" id="" required>
               <!-- <option value="请选择">请选择</option> -->
               <option v-for="(category,index) in categorys"  :value="category">{{category}}</option>
           </select><br><br>
           <span> 商品图片： </span>
           <!-- <img v-for="i in files" :src="i" class="" :key="i"> -->
            <input multiple @change="sctp($event)" type="file" name="photo" accept="image/*" id="file-selector"><br><br>
            <span> 商品详解： </span> <br> <textarea v-model="productDetails" name="productDetails" id="" cols="30" rows="2"></textarea><br><br>
            <button @click.stop="upload($event)" type="submit"> 上传 </button>
           <span> 添加者： </span> <input type="text" v-model="adminname" :name="adminname" disabled>
        </form>
    </div>
</template>

<script>
    import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
                adminname:'',
                color:'',
                size:'',
                productDetails:'',
                admin:'',
                files:[],
                name:'',
                price:'',
                des:'',
                photo:'',
                category:'',
                categorys:['手机','电视','电脑','家电','路由','智能','电源','耳机','音箱','礼品','生活','米粉卡']
            }
        },
        components: {
            XHeader
        },
        methods: {
            sctp:function(event){
                this.photo = event.target.files[0].name;
                console.log(this.photo);
            },
            upload(event){
                var _this = this;
                if(this.name == ''){
                    alert('商品名称不能为空哦！');
                }
                if(this.price == ''){
                    alert('请给我一个价格！');
                }
                if(this.des == ''){
                    alert('描述一下我吧！');
                }
                if(this.category == ''){
                    alert('给我归下类吧！');
                }        
                event.preventDefault();
                let myform = this.$refs.myform;
                console.log(myform);
                let formDate = new FormData(myform);
                console.log(formDate);
                let config = {
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }
                this.$axios.post('/goods/upload',formDate,config).then((good)=>{
                    // console.log(111);
                    console.log(good.data.message);
                    _this.$router.push({path:'/'});
                }).catch((err)=>{
                    console.log(err);
                })
            },
            adminCheckLogin(){
                this.$axios.post('/admin/checkLogin').then((admin)=>{
                if(admin.data.error == 0){
                // console.log('商户————' + admin.data.data.adminName);
                this.adminname = admin.data.data.adminName;
                this.admin = admin.data.data;
                }
                }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
                })
            }

        },
        mounted () {              
            this.adminCheckLogin()
        }
    }
</script>
<style scoped>
.vux-header{
    background: green;
}
form{
    margin-top: 10px;
    background: #fff;
}
form span{
    margin-left: 20px;
}
form input,textarea{
    width: 230px;
    line-height: 30px;
    padding-left: 10px;
    border-radius:5px;
    border: none; 
}
textarea{
    background: #eee;
    margin-left: 20px;
}
select{
    width: 100px;
}
button{
    background: none;
    border: none;
    position: absolute;
    bottom: 0;
    background: green;
    text-align: center;
    padding: 10px 0;
    width: 100%;
    color: #fff;
    font-size: 18px;
}
</style>