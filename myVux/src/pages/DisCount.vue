<template>
    <div class="fenlei">
        <x-header><span style="color:#fff;font-size:16px;"> 优惠券列表 </span>  <a style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-search"></i></a>   </x-header>   
        <p>您还没有购物券哦！</p>
        <footer-nav></footer-nav>
    </div>
</template>
<script>
import FooterNav from './../components/FooterNav';
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {
            }
        },
        components: {
            FooterNav,
            XHeader
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
    .fenlei{
        position: relative;
    }
    p{
        color:#bbb;
        text-align: center;
        margin-top: 20px;
    }
</style>