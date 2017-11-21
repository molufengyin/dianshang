<template>
    <div>
        <div class="bread">
            <tab :line-width=2 active-color='green' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in classify" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
            <span></span>
            <mi-recommend v-if=" index === 0 ">
            </mi-recommend>
            <mobile-phone v-if=" index === 1 ">
            </mobile-phone>
            <mi-capacity v-if=" index === 2 ">    
            </mi-capacity>
            <mi-television v-if=" index === 3 ">
               
            </mi-television>
            <mi-computer v-if=" index === 4 ">
               
            </mi-computer>
            <life-around v-if=" index === 5 ">
                
            </life-around>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem} from 'vux'
import MiRecommend from './MiRecommend'
import MobilePhone from './MobilePhone'
import MiTelevision from './MiTelevision'
import MiCapacity from './MiCapacity'
import LifeAround from './LifeAround'
import MiComputer from './MiComputer'
    export default {
        data: function () {
            return {
                classify:['推荐','手机','智能','电视','电脑','生活周边']
            }
        },
        components: {
            index:0,
            demo2:'推荐',
            Tab,
            TabItem,
            MiRecommend,
            MobilePhone,
            MiTelevision,
            MiComputer,
            LifeAround,
            MiCapacity
        },
        methods: {}
    }
</script>
<style scoped>

</style>