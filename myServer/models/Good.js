/**
 * Created by Administrator on 2017/11/3.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const goodSchema = new Schema({
    productName:String,
    salePrice:Number,
    productImage:String,
    checked:{
        type:Number,
        default:1
    },
    target:String,
    productNum:{
        type:Number,
        default:1
    },
    productDes:String,
    color:String,
    size:String,
    adder:String,
    //是否点击结算
    isJes:{
        type:Boolean,
        default:false
    },
    //商品详解
    productDetails:String,
    //卖出数量
    saleNum:{
        type:Number,
        default:0
    },
    category:String,
    //产品发布时间
    time:{
        type:Object,
        default:Date.now
    },
    //订单状态
    orderStatus:{
        type:Boolean,
        default:false
    },
    //是否被选中
    choose:{
        type:Boolean,
        default:false
    },
    //点赞量
    likes:{
        type:Number,
        default:0
    },
    //评论内容
    comCont:{
        type:String,
        ref:'Comment'
    },
    //评论人
    author:{
        type:String,
        ref:'user'
    },
//    是否评论
    isCom:{
        type:Boolean,
        default:false
    }

});

goodSchema.statics = {
    getGoodById:(id,callback) => {
        Good.findById({'_id':id}).then((good) =>{
            callback(null,good);
        }).catch((err) =>{
            callback(err);
        })
    },
    getGoodByCategory:(category,callback)=>{
        Good.findOne({'category':category}).then((category)=>{
            callback(null,good);
        }).catch((err)=>{
            callback(err);
        })
    }

}










const Good = mongoose.model('Good',goodSchema);
module.exports = Good;