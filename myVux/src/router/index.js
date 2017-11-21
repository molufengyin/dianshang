import Vue from 'vue'
import VueRouter from 'vue-router'
// 自定义路由
// import Home from '../pages/HelloFromVux'
import HomeIndex from '../pages/HomeIndex'
import mine from '../pages/mine'
import ShoppingCart from '../pages/ShoppingCart'
import classify from '../pages/classify'
import MyOrder from '../pages/MyOrder'
import UserLogin from '../pages/UserLogin'
import ExChange from '../pages/ExChange'
import UserRegister from '../pages/UserRegister'
import AddGoods from '../pages/AddGoods'
import PointSmall from '../pages/PointSmall'
import DisCount from '../pages/DisCount'
import SetTing from '../pages/SetTing'
import ShopAddress from '../pages/ShopAddress'
import AddAdress from '../pages/AddAdress'
import AdminLogin from '../pages/AdminLogin'
import AdminRegister from '../pages/AdminRegister'
import edit from '../pages/edit'
import ProductDetails from '../pages/ProductDetails'
import PayMent from '../pages/PayMent'
import ProFile from '../pages/ProFile'
import OrderFinish from '../pages/OrderFinish'
import search from '../pages/search'
import person from '../pages/person'
import WaitPay from '../pages/WaitPay'
import Comment from '../pages/Comment'
import Collect from '../pages/Collect'
import reply from '../pages/reply'
Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        component:HomeIndex
    },
    {
        path:'/classify',
        component:classify
    },
    {
        path:'/ShoppingCart',
        component:ShoppingCart
    },
    {
        path:'/mine',
        component:mine
    },
    {
        path:'/UserLogin',
        component:UserLogin
    },
    {
        path:'/MyOrder',
        component:MyOrder
    },
    {
        path:'/ExChange',
        component:ExChange
    },
    {
        path:'/UserRegister',
        component:UserRegister
    },
    {
        path:'/AddGoods',
        component:AddGoods
    },
    {
        path:'/PointSmall',
        component:PointSmall
    },
    {
        path:'/DisCount',
        component:DisCount
    },
    {
        path:'/SetTing',
        component:SetTing
    },
    {
        path:'/ShopAddress',
        component:ShopAddress
    },
    {
        path:'/AddAdress',
        component:AddAdress
    },
    {
        path:'/AdminLogin',
        component:AdminLogin
    },
    {
        path:'/AdminRegister',
        component:AdminRegister
    },
    {
        path:'/edit/:id',
        component:edit
    },
    {
        path:'/ProductDetails/:id',
        component:ProductDetails
    },
    {
        path:'/PayMent',
        component:PayMent
    },
    {
        path:'/ProFile',
        component:ProFile
    },
    {
        path:'/OrderFinish',
        component:OrderFinish
    },
    {
        path:'/search',
        component:search
    },
    {
        path:'/person',
        component:person
    },
    {
        path:'/WaitPay',
        component:WaitPay
    },
    {
        path:'/comment/:id',
        component:Comment
    },
    {
        path:'/Collect',
        component:Collect
    },
    {
        path:'/reply',
        component:reply
    }
]

export default new VueRouter({
    routes
})






