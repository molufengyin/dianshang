/**
 * Created by Administrator on 2017/11/3.
 */
const mongoose = require('mongoose');
const db = require('./db');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    adminEmail:String,
    adminName:String,
    adminPassword:String,
    addList:{
       type: Array,
        ref:'Good'
    }
});

//封装生成session的代码
const auth = {
    create_session:(req,res,next)=>{
        if(req.session.user){
            req.session.isLogin = true;
            next();
        }else{
            let admin_token = req.signedCookies['lily'];
            console.log(admin_token);
            if(!admin_token){
                return next();
            }
            let admin = admin_token.split('$$$$');
            let  admin_id = admin[0];
            console.log(admin_id);
            Admin.getAdminById(admin_id,(err,admin) =>{
                if(err){
                    return next();
                }
                req.session.admin = admin;
                req.session.isLogin = true;
                next();
            })
        }
    }
};






const admin = mongoose.model('Admin',adminSchema);
module.exports = admin;