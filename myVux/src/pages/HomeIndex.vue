<template>
    <div>
        <header-nav></header-nav>
        <!-- <bread-nav></bread-nav> -->
        <div class="main">
            <div class="bread">
                <tab :line-width=2 active-color='green' v-model="index">
                    <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in classify" @click="demo2 = item" :key="index">{{item}}</tab-item>
                </tab>
                <mi-recommend v-if=" index === 0 "></mi-recommend>
                <mobile-phone v-if=" index === 1 "></mobile-phone>
                <mi-capacity v-if=" index === 2 "></mi-capacity>
                <mi-television v-if=" index === 3 "></mi-television>
                <mi-computer v-if=" index === 4 "></mi-computer>
                <life-around v-if=" index === 5 "></life-around>
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderNav from './../components/HeaderNav';
import FooterNav from './../components/FooterNav';
import { Tab, TabItem} from 'vux'
import MiRecommend from './../components/MiRecommend'
import MobilePhone from './../components/MobilePhone'
import MiTelevision from './../components/MiTelevision'
import MiCapacity from './../components/MiCapacity'
import LifeAround from './../components/LifeAround'
import MiComputer from './../components/MiComputer'
    export default {
        data: function () {
            return {
                userName:this.userName,
                classify:['推荐','手机','智能','电视','电脑','生活周边'],
                index:0,
                willShow:false,
                demo2:'推荐',
            }
        },
        components: {
            HeaderNav,
            FooterNav,
            Tab,
            TabItem,
            MiRecommend,
            MobilePhone,
            MiTelevision,
            MiComputer,
            LifeAround,
            MiCapacity
        },
        methods: {
            adminCheckLogin(){
                this.$axios.post('/admin/checkLogin').then((admin)=>{
                if(admin.data.error == 0){
                // console.log('商户————' + admin.data.data.adminName);
                this.adminname = admin.data.data.adminName;
                }
                }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
                })
            },
            userCheckLogin(){
                this.$axios.post('/users/checkLogin').then((user)=>{
                console.log('用户成功');
                // console.log(user.data);
                if(user.data.error == 0){
                this.username = user.data.data.username;
                }
                }).catch((err)=>{
                console.log('检查登录错误');
                console.log(err);
                })
            }
        }, 
       
    }
</script>
<style scoped>
.main{
    margin-top: 150px;
}
.head{
    position: absolute;
    top: 0;
}
</style>