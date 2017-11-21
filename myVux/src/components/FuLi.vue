<template>
    <div>
        <ul>
            <li :key="index" v-for="(fuli,index) in fulis">
                <img :src="'/static/' + fuli.img" alt="">
                <h5> {{fuli.title}} </h5><br>
                <i> {{fuli.des}} </i><br>
                <p>
                    <span class="mian">{{fuli.balrog}}</span>
                    <span class="yi">{{fuli.con}}</span>
                </p>
                
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                fulis:[
                    {
                        img:'yhj.jpg',
                        title:'10元智能配件优惠券',
                        des:'双11专享',
                        balrog:'免费领取',
                        con:'已兑完'
                    },
                    {
                        img:'sjk.jpg',
                        title:'手机壳膜10元优惠券',
                        des:'双11专享',
                        balrog:'免费领取',
                        con:'已兑完'
                    }
                ]
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped>
li{
    overflow: hidden;
    border-bottom: solid 1px #ddd;
    background: #fff;
    padding-top: 2px;
}
img{
    width: 120px;
    height:100px;
    float: left;
}
h5{
    display: inline-block;
    padding-top: 5px;
    margin-left: 10px;
    font-size: 15px;
    font-weight: 400;
}
i{
    font-style: normal;
    font-size: 14px;
    margin-left: 10px;
    color: #aaa;
}
p{
    margin-top: 10px;
}
span{
    font-size: 14px;
    
}
.mian{
    border: solid 1px green;
    padding: 3px;
    border-radius: 20px;
    margin-left: 10px;
    color: green;
    cursor: pointer;
}
.yi{
    position: relative;
    left: 120px;
    color: #aaa;
}
</style>