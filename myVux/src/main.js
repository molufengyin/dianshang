// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/font-awesome/css/font-awesome.min.css'
import './jquery.js';
import Vue from 'vue';
import Vuex from 'vuex'
import router from './router';
import FastClick from 'fastclick'
import App from './App' 
import axios from 'axios'
import VueValidator from 'vue-validator'
// import VueResource from 'vue-resource'
Vue.prototype.$axios = axios;
FastClick.attach(document.body)
Vue.use(VueValidator);
Vue.use(Vuex);

new Vue({
  router,
  render: h => h(App),
  methods:{
      adminCheckLogin(){
        this.$axios.get('/admin/checkLogin').then((admin)=>{
        if(admin.data.error == 0){
          console.log('商户————' + admin.data.data.adminName);
          this.adminname = admin.data.data.adminName;
        }else{
          this.adminname = '';
        } 
        }).catch((err)=>{
          console.log('检查登录错误');
          console.log(err);
        })
      },
      userCheckLogin(){
        this.$axios.get('/users/checkLogin').then((user)=>{
        // console.log('用户成功');
        // console.log(user.data);
        if(user.data.error == 0){
          this.username = user.data.data.username;
        }else{
          this.username = '';
        } 
        }).catch((err)=>{
          console.log('检查登录错误');
          console.log(err);
        })
      }
  },
  mounted:function(){
  // this.userCheckLogin()
  // ,
  // this.adminCheckLogin()
}
}).$mount('#app')
