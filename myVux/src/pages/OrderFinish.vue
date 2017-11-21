<template>
    <div>
         <x-header>  <span style="color:#fff;font-size:16px;">购物车</span>  <a href="#/" style="color:#aaa;font-size:16px;" slot="right"><i class="fa fa-home"></i></a>   </x-header>
        <img src="/static/ok-2.png" alt="">
        <h2> 订单已完成 </h2>
    </div>
</template>

<script>
import {XHeader} from 'vux';
    export default {
        data: function () {
            return {}
        },
        components: {XHeader},
        methods: {}
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
    img{
        margin-top: 80px;
        text-align: center;
        margin-left: 50px;
    }
    h2{
        text-align: center;
    }
</style>