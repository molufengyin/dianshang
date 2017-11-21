/**
 * Created by Administrator on 2017/11/15.
 */
const express = require('express');
var router = express.Router();
var User = require('../models/user');
var Good = require('../models/Good');
var Comment = require('../models/Comments');
var multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/uploads',
    filename: function (req, file, cb) {
        var times = Date.now().toString();
        cb(null,times + '.jpg');
        req.body.photo = times + '.jpg'
    }
})
// 根据配置信息生成处理对象
var upload = multer({ storage: storage });
//给商品增加评论
router.post('/upload/:uid/:gid',upload.array('photo',6),(req,res)=>{
    var uid = req.params.uid;
    var gid = req.params.gid;
    console.log(req.body);
    Good.getGoodById(gid,(err,good)=>{
        if(err){
           return  res.end();
        }
        // console.log(good);
        good.saleNum += 1;
        good.save();
    });
    User.getUserById(uid,(err,user)=>{
        if(err){
            return  res.end();
        }
        var orderList = user.orderList;
        orderList.forEach((good,index)=>{
            if(good._id == gid){
                good.isCom = true;
                orderList[index].isCom = good.isCom;
            }
        })
        user.orderList = orderList;
        let users = new User(user);
        users.save();
        req.session.user = users;
    })
    let comment = new Comment();
    comment.goodId = gid;
    comment.content = req.body.comment;
    comment.score = req.body.score;
    comment.img = req.body.photo;
    comment.userId = uid;
    comment.save();
    console.log(comment);
    res.json({error:0,message:'提交评论',comment:comment});
})
//显示商品评论
router.post('/comment/:gid',function (req,res) {
    var gid = req.params.gid;
    // console.log(gid);
    Comment.getCommentByGoodId(gid,(err,comment)=>{
    //     console.log(gid);
        console.log(comment);
        if(err){
            console.log(1111);
            return res.end(err);
        }
        res.json({error:0,message:'显示评论',comment:comment})
    });
})



























module.exports = router;