/**
 * Created by Administrator on 2017/11/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username:String,
    password:String,
    userEmail:String,
    orderList:Array,
    time:Object,
    cartList: {
        type: Array,
        ref:'Good'
    },
    addressList:[
        {
            name:String,
            site:String,
            pro:String,
            tel:Number,
            isDefault:{
                type:Boolean,
                default:false
            }
        }
    ],
    motto:{
        type:String,
        default:'此人很懒，什么都没有留下'
    },
    photo:{
        type:String,
        default:'rt.png'
    },
//    我的收藏
    collect:{
        type:Array,
        ref:'Good'
    }
});
UserSchema.statics = {
    getUserById:(id,callback) => {
        User.findById({'_id':id}).then((user)=>{
            callback(null,user);
        }).catch((err)=>{
            callback(err);
        })
    }
}
const User = mongoose.model('User',UserSchema);
module.exports = User;