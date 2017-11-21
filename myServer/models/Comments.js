const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');
const CommentSchema = new Schema({
    //用户名
    userId:{
        type:String,
        ref:'User'
    },
    //被评论商品的id
    goodId:{
        type:String,
        ref:'Good'
    },
    //评论的内容
    content:{
        type:String
    },
//    分值
    score:{
        type:Number,
        default:0
    },
//    评论时间
    evaluateTime:{
        type:Date,
        default:Date.now
    },
//    评论图片
    img:{
        type:String
    },
    // 是否帮助其他人
    isHelp:{
        type:Boolean,
        default:false
    }
});

CommentSchema.statics = {
    getCommentByGoodId:(id,callback)=>{
        console.log(88888888);
        Comment.find({'goodId':id}).populate('userId').then((comment)=>{
            callback(null,comment);
        }).catch((err)=>{
            console.log(5555555);
            callback(err);
        })
    }
}


CommentSchema.methods.create_time_ago = function () {
    let time = moment(this.create_time).fromNow();
    return time;
};

const Comment = mongoose.model('comment',CommentSchema);
module.exports = Comment;