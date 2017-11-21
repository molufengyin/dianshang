<template>
    <div class="point">
        <x-header>  <span style="color:#fff;font-size:16px;">会员福利</span>  <a style="color:#bbb;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>
        <div class="header">
            <swiper auto>
                <swiper-item :key="index" v-for="(img,index) in images" style="margin-bottom: 100px;">
                <img class="photo" :src="'../static/' + img " alt="">
                </swiper-item>
            </swiper>
            <p>
                登陆之后可以查看会员积分和更多福利
                <a href="#/userLogin"> 立即登录 </a>
            </p>
        </div>
        <div class="fuli">
            <tab :line-width=2 active-color='green' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === xiangmu" v-for="(xiangmu, index) in xiangmus" @click="demo2 = xiangmu" :key="index">{{xiangmu}}</tab-item>
            </tab>
            <fu-li v-if=" index === 0"></fu-li>
            <inte-gral v-if=" index === 1"></inte-gral>
        </div>
    </div>
</template>

<script>
import FuLi from '../components/FuLi'
import InteGral from '../components/InteGral'
import { Tab, TabItem,Swiper,SwiperItem,XHeader} from 'vux'
    export default {
        data: function () {
            return {
               images:['youhuijuan.png','fuli.jpg'],
               index:0,
               demo2:0,
               xiangmus:['福利领取','积分兑换']
            }
        },
        components: {
            Tab, 
            TabItem,
            Swiper, 
            SwiperItem,
            XHeader,
            FuLi,
            InteGral
        },
        methods: {
        }
    }
</script>
<style scoped>
    .vux-header{
        background:green;
        color:#fff;
    }
    .vux-swiper-item{
        width: 100%;
    }
    .photo{
       width: 100%; 
    }
    .header p{
        padding: 10px 0;
        background: #fff;
        font-size: 14px;
        text-align: center;
    }
    .header p a{
        color:green;
    }
    .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right {
        position: absolute;
        right: 180px;
        bottom: 40px;
    }
    .vux-tab-item{
        cursor: pointer;
    }
    .fuli{
        margin-top: 20px;
    }
</style>