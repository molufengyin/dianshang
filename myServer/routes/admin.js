/**
 * Created by Administrator on 2017/11/3.
 */
const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const crypto = require('crypto');
// const Dbset = require ('../models/db');


//管理员注册

router.post('/register',function(req,res){
    console.log(req.body);
    var  adminname = req.body.adminname;
    var  password = req.body.password;
    var  Email = req.body.email;
    var  error = '';
    // console.log(adminname);
    // console.log(123);
    Admin.findOne({adminName:adminname}).then((admin) => {
        if (admin) {
            console.log('用户名已存在');
            return res.json({error:1,message:'用户名已注册'});
        }
        var md5 = crypto.createHash('md5');
        var pass = md5.update(password).digest('hex');
        console.log(pass);
        var admin = new Admin({
            adminName:adminname,
            adminPassword:pass,
            adminEmail:req.body.Email,
            time:new Date()
        });
        admin.save(function(err){
            if(err){
                console.log(147)
                return res.json({error:1,message:'系统错误'});
            }
            res.json({error:0,message:'注册成功',data:admin});
        });
        console.log(admin);
    }).catch((err) => {
        console.log(err);
    })
});
//管理员登录
router.post('/login',function(req,res){
    console.log(req.body);
    var  adminName = req.body.username;
    var  adminPassword = req.body.password;
    Admin.findOne({adminName:adminName}).then((admin) => {
        console.log(admin);
        if(!admin){
           return res.json({error:1,message:'该用户名不存在，请去注册'});
        }
        var pwd = admin.adminPassword;
        console.log(pwd);
        var md5 = crypto.createHash('md5');
        var password = md5.update(adminPassword).digest('hex');
        console.log(password);
        if(password != pwd){
            // console.log('111111111');
            return res.json({error:1,message:'/用户名或密码错误'});
        }
        // console.log(admin._id);
        req.session.admin = admin;
        console.log(req.session.admin);
        console.log('登陆成功');
        return res.json({error:0,message:'登陆成功',data:admin,admin:req.session.admin});
    }).catch((err)=>{
        console.log(err);
    })
});
// 管理员退出
router.get('/logout',function (req,res) {
    if(!req.session.admin){
      return res.json({error:1,message:'没有管理员登录'});
    }
    console.log(req.session.admin);
    console.log('准备退出');
    req.session.admin = null;
    res.json({error:0,message:'管理员退出成功'});
});

//检查是否登陆
router.post('/checkLogin',function(req,res){
// console.log(req.session.admin);
var admin = req.session.admin;
if(!admin){
  return  res.json({error:1,message:'没有人登录'});
}
res.json({error:0,message:admin.adminName + '正在登陆',data:admin});

});


router.post('/adminInfo',function(req,res){
    console.log(req.session);
});


module.exports = router;