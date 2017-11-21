<template>
    <div>
        <ul>
            <li v-for="(integral , index) in integrals">
                <img :src="'/static/' + integral.img" alt="">                
                <h5> {{integral.title}} </h5><br>
                <i class=""> {{integral.des}} </i>
                <p>
                    <span>{{integral.con}}</span>
                    积分
                </p>
                
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                integrals:[
                    {
                        img:'yhj.jpg',
                        title:'30元现金券（满299可用）',
                        des:'双11专享!',
                        con:3
                    },
                    {
                        img:'yhj.jpg',
                        title:'50元现金券（满499可用）',
                        des:'双11专享!',
                        con:3
                    },
                    {
                        img:'yhj.jpg',
                        title:'11.11元智能配件优惠券',
                        des:'双11专享!',
                        con:1
                    },
                    {
                        img:'yhj.jpg',
                        title:'20元智能配件优惠券',
                        des:'双11专享!',
                        con:2
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
    color: green;
}
span{
    font-size: 18px; 
    font-weight: 600; 
    margin-left: 10px; 
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