var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Good = require('../models/Good');
const crypto = require('crypto');
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
/* GET users listing. */
//用户注册
router.post('/register',function(req,res){
    // console.log(req.body);
    var  userName = req.body.userName;
    var  userPassword = req.body.userPassword;
    var  userEmail = req.body.userEmail;
    var  error = '';
    console.log(userName);
    console.log(123);
    User.findOne({userName:userName}).then((user) => {
        //     console.log(user);
        if (user) {
            console.log('用户名已存在');
            return res.json({error:1,message:'用户名已注册'});

        }
        var md5 = crypto.createHash('md5');
        var password = md5.update(userPassword).digest('hex');
        // console.log(password);
        var user = new User({
            username:req.body.userName,
            password:password,
            userEmail:req.body.userEmail,
            time:new Date()
        });
        user.save(function(err){
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            console.log('注册成功');
            res.json({error:0,message:'注册成功',data:user});
        });

    }).catch((err) => {
        console.log(err);
    })
});
//用户登录
router.post('/login',function(req,res){
    console.log(req.body);
    var  username = req.body.username;
    var  password = req.body.password;
    // console.log(username);
    // console.log(password);
    User.findOne({username:username}).then((user) => {
        // console.log(user);
        if(!user){
            console.log('该用户不存在');
            return res.json({error:1,message:'该用户名不存在，请去注册'});
        }
        var pwd = user.password;
        // console.log(pwd);
        var md5 = crypto.createHash('md5');
        var pass = md5.update(password).digest('hex');
        // console.log(pass);
        if(pass != pwd){
            console.log('111111111');
            return res.json({error:1,message:'/用户名或密码错误'});
        }
        // // console.log(user._id);
        req.session.user = user;
        // console.log(req.session.user);
        console.log('登陆成功');
        return res.json({error:0,message:'登陆成功',data:user,user:req.session.user});
    }).catch((err)=>{
        console.log(err);
    })
});
// 用户退出
router.get('/logout',function (req,res) {
    // console.log(req.session.user);
    if(!req.session.user){
        return res.json({error:1,message:'没有管理员登录'});
    }
    // console.log(req.session.user);
    console.log('准备退出');
    req.session.user = null;
    // console.log(req.session.user);
    res.json({error:0,message:'管理员退出成功'});
});
//检查用户是否登陆
router.post('/checkLogin',function(req,res){
    // console.log(req.session.user);
    var user = req.session.user;
    if(!user){
      return  res.json({error:1,message:'没有人登录'});
    }
    res.json({error:0,message:user.username + '正在登陆',data:user})
});
//用户个人设置
router.post('/upload/:uid',upload.array('photo',6),(req,res)=>{
    // console.log(req.body);
    var uid = req.params.uid;
    // console.log(uid);
    var name = req.body.name;
    var photo = req.body.photo;
    var motto = req.body.motto;

    User.findById({'_id':uid}).then((user)=>{
        console.log(user.username);
        user.username = name;
        user.photo = photo;
        user.motto = motto;
        user.save();
        req.session.user = user;
        console.log(user);
        return  res.json({error:0,message:'修改成功',user:user});
    }).catch((err)=>{
        console.log(err);
    })





})


//添加地址
router.post('/addAdress/:id',function(req,res){
    var uid = req.params.id;
    var address = req.body;
    User.findById({'_id':uid}).then((user)=>{
        console.log(user);
        var arr = user.addressList;
        user.addressList.push(address);
        user.save();
        req.session.user = user;
        console.log('地址添加成功');
        return res.json({error:0,message:'添加地址成功',user:user});
    }).then((err)=>{
        console.log(err);
    })
    res.json({error:0});
})
//删除地址
router.get('/delet/:uid/:aid',function (req,res) {
    var uid = req.params.uid;
    var aid = req.params.aid;
    User.findById({'_id':uid}).then((user)=>{
        // console.log(user);
        var addresses = user.addressList;
        addresses.forEach(function (address,index) {
            if(address._id == aid){
                addresses.splice(index,1);
                user.addressList = addresses;
                user.save();
                req.session.user = user;
                console.log('删除');
                return res.json({error:0,message:'删除成功'});
            }
        })
    })
});
//添加商品至购物车
router.get('/addCart/:gid/:uid',function (req,res) {
    var gid = req.params.gid;
    var uid = req.params.uid;
    // console.log(gid);
    // console.log(uid);
    User.getUserById(uid, (err, user) => {
        if (err) {
            return res.end(err)
        }
        // console.log(user);
        Good.getGoodById(gid, (err, good) => {
            // console.log(111);
            if (err) {
                return res.end(err)
            }
            var isCun = true;
            if(user.cartList.length > 0) {
                console.log('购物车有东西哦');
                user.cartList.forEach((cartGood, index) => {
                    if (cartGood._id == gid) {
                        cartGood.productNum += 1;
                        let users = new User(user);
                        users.save();
                        req.session.user = users;
                        isCun = false;
                        return res.json({error: 0, message: '添加到购物车里了', user: users});
                    }
                });
            }
            if (isCun) {
                console.log(1111111);
                user.cartList.push(good);
                user.save();
                req.session.user = user;
                console.log(user);
                console.log('天加成功');
                return res.json({error: 0, message: '添加到购物车里了', user: user});
            }
        })
    })
});
//删除购物车的商品
router.get('/del/:uid/:gid',function(req,res){
    var uid = req.params.uid;
    var gid = req.params.gid;
    // console.log(uid);
    // console.log(gid);
    User.findById({'_id':uid}).then((user)=>{
        // console.log(user);
        var cartList = user.cartList;
        cartList.forEach(function(good,index){
            if(good._id == gid){
                // console.log(user);
                cartList.splice(index,1);
                user.cartList = cartList;
                user.save();
                req.session.user = user;
                console.log('删除了');
                // console.log(user);
                return res.json({error:0,message:'删除成功'});
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
});
//减少个数
router.post('/reduce/:gid',function(req,res){
    var uid = req.session.user._id;
    var gid = req.params.gid;
    User.findById({'_id':uid}).then((user)=>{
        var cartList = user.cartList;
        // console.log(cartList);
        cartList.forEach(function(good,index){
            if(good._id == gid){
                console.log(good.productNum);
                if(good.productNum == 1){
                    cartList.splice(index,1);
                    let users = new User(user);
                    users.save();
                    req.session.user = users;
                    console.log('删除');
                    return res.json({error:0,message:'删除成功'});
                }
                good.productNum --;
                console.log('减一');
                console.log(good.productNum);
                let users = new User(user);
                users.save();
                req.session.user = users;
                return res.json({error:0,message:'减少成功',user:user});
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
});
//增加个数
router.post('/gain/:gid',function(req,res){
    var uid = req.session.user._id;
    var gid = req.params.gid;
    User.findById({'_id':uid}).then((user)=>{
        var cartList = user.cartList;
        // console.log(cartList);
        cartList.forEach(function(good,index){
            if(good._id == gid){
                console.log(good.productNum);
                good.productNum ++;
                console.log('加一');
                console.log(good.productNum);
                let users = new User(user);
                users.save();
                req.session.user = users;
                return res.json({error:0,message:'增加成功',user:user});
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
});
//选择购物车里所有的商品
router.post('/allchoose/:uid',function (req,res) {
    var uid = req.params.uid;
    // console.log(uid);
    User.getUserById(uid,(err,user)=>{
        if(err){
            return res.end;
        }
        var isChoose = false;
        user.cartList.forEach((good,index)=>{
            good.choose = true;
            isChoose = true;
            // console.log(isChoose);
        });
        // console.log(isChoose);
        let users = new User(user);
        users.save();
        req.session.user = users;
        // console.log(users);
        return res.json({error:0,message:'全选',data:users});
    });
});
//全部不选
router.post('/nochoose/:uid',function (req,res) {
    var uid = req.params.uid;
    // console.log(uid);
    User.getUserById(uid,(err,user)=>{
        if(err){
            return res.end;
        }
        var isChoose = false;
        user.cartList.forEach((good,index)=>{
            good.choose = false;
            isChoose = true;
        });
        // console.log(isChoose);
        let users = new User(user);
        users.save();
        req.session.user = users;
        // console.log(users);
        return res.json({error:0,message:'全不选',data:users});
    });
});
//选择购物车里的某项商品
router.post('/choose/:uid/:id',function (req,res) {
    var uid = req.params.uid;
    var gid = req.params.id;
    User.getUserById(uid,(err,user)=>{
        if(err){
            return res.end;
        }
        user.cartList.forEach((good,index)=>{
            console.log(gid);
            if(gid == good._id){
                if(good.choose == false ){
                    good.choose = true;
                }else{
                    good.choose = false;
                }
                let users = new User(user);
                users.save();
                req.session.user = users;
                return res.json({error:0,message:'成功选中',user:user});
            }
        });
    })
})
//等待付款的订单
router.post('/wait/:uid',function (req,res) {
    var uid = req.params.uid;
    var orderNum = req.body.orderNum;
    var time = new Date();
    // console.log(time);
    // console.log(orderNum);
    User.findById({'_id':uid}).then((user)=>{
        // console.log(user);
        var cartList = user.cartList;
        var orderList = user.orderList
        cartList.forEach(function (good,index) {
            if(good.choose == true){
                good.orderNum = orderNum;
                good.orderStatus = true;
                good.time = time;
                user.cartList[index] = good;
                orderList.push(user.cartList[index]);
                cartList.splice(index,1);
            }
        })
        user.cartList = cartList;
        user.orderList = orderList;
        user.save();
        req.session.user = user;
        console.log(req.session.user.orderList)
        return res.json({error:0,message:'等待付款'});
    }).catch((err)=>{
        console.log(err);
    })
});
//取消订单
router.post('/cancle/:uid/:gid',function(req,res){
    var uid = req.params.uid;
    var gid = req.params.gid;
    User.findById({'_id':uid}).then((user)=>{
        // console.log(user);
        var cartList = user.cartList;
        var orderList = user.orderList;
        orderList.forEach(function (good,index) {
            if(good._id == gid){
                orderList.splice(index,1);
            }
        });
        user.orderList = orderList;
        user.save();
        req.session.user = user;
      return  res.json({error:0,message:'删除订单'})
    }).catch((err)=>{
        console.log(err);
    });
});
//完成订单
router.post('/finish/:uid/:gid',function(req,res){
    var uid = req.params.uid;
    var gid = req.params.gid;
    User.findById({'_id':uid}).then((user)=>{
        // console.log(user);
        var cartList = user.cartList;
        var orderList = user.orderList;
        orderList.forEach(function (good,index) {
            if(good._id == gid){
                good.isJes = true;
                orderList[index] = good;
            }
        });
        user.orderList = orderList;
        let users = new User(user);
        users.save();
        req.session.user = users;
        console.log(user);
       return res.json({error:0,message:'完成订单'});
    }).catch((err)=>{
        console.log(err);
    });
});
//确认收货
router.post('/affirm/:uid/:gid',function(req,res){
    console.log(req.params.uid);
    var uid = req.params.uid;
    var gid = req.params.gid;
    User.findById({'_id':uid}).then((user)=>{
        console.log(user);
        var orderList = user.orderList;
        orderList.forEach(function (good,index) {
            if(good._id == gid){
                good.checked = 2;
                good.saleNum ++
                orderList[index] = good;
            }
        });
        // console.log(orderList);
        user.orderList = orderList;
        let users = new User(user);
        users.save();
        req.session.user = users;
        return res.json({error:0,message:'确认收货'});
    }).catch((err)=>{
        console.log(err);
    })

})
module.exports = router;
