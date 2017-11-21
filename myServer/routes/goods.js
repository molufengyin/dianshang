/**
 * Created by Administrator on 2017/11/8.
 */
var express = require('express');
var router = express.Router();
var Good = require('../models/Good');
var User = require('../models/user');
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
// console.log(upload);
//添加商品 === 商品上传
// upload.array('文件名称',最大数量) 批量处理文件
router.post('/upload',upload.array('photo',6),(req,res)=>{
    // console.log(req.body);
    var arr = [];
    for(var i = 0; i < req.files.length;i ++){
        arr.push(req.files[i].filename)
    }
    req.body.time = new Date();
    // var goods = new Good(req.body);
    var adder = req.session.admin.adminName;
    console.log(adder)
    var goods = new Good ({
        productName:req.body.name,
        salePrice:req.body.price,
        productDes:req.body.des,
        productImage:arr,
        category:req.body.category,
        productDetails:req.body.productDetails,
        color:req.body.color,
        size:req.body.size,
        adder:adder,
        time:new Date(),

    });
    // console.log(123);
    goods.save(function (err) {
        if(err){
            return res.json({error:1,message:'上传失败'});
        }
        console.log('保存成功');
        // console.log(goods);
    });
    console.log('图片上传成功');

    res.json({error:0,message:'图片上传成功',photo:req.body.photo});
});

//获取全部商品
router.get('/',function(req,res){
    // console.log(req);
    Good.find().sort({'time':-1}).limit(2).skip(req.query.page * 2).then(function(goods){
        // console.log(goods);
        res.json({error:0,message:'成功了',result:goods});
    }).catch(function(err){
        console.log(err);
    })
});
//获取新品
router.get('/new',function (req,res) {
   Good.find().skip(4).limit(4).then((goods)=>{
       // console.log(goods);
       res.json({error:0,message:'成功了',result:goods});
   }).catch((err)=>{
       console.log(err);
   })
});
//获取手机
router.get('/mobile',function(req,res){
    // console.log(req.body);
    var category = '手机';
    Good.find({category:category}).then((mobile)=>{
        // console.log(mobile);
        res.json({error:0,message:'手机',data:mobile});
    }).catch((err)=>{
        console.log(err);
    })

});
//获取智能
router.get('/capacity',function(req,res){
    var category = '智能';
    Good.find({category:category}).then((capacity)=>{
        // console.log(capacity);
        res.json({error:0,message:'智能',data:capacity});
    }).catch((err)=>{
        console.log(err);
        console.log('出错了');
    })

});
//获取电视
router.get('/television',function(req,res){
    var category = '电视';
    Good.find({category:category}).then((television)=>{
        // console.log(television);
        res.json({error:0,message:'电视',data:television});
    }).catch((err)=>{
        console.log(err);
        console.log('出错了');
    })

});
//获取电脑
router.get('/computer',function(req,res){
    var category = '电脑';
    Good.find({category:category}).then((computer)=>{
        // console.log(computer);
        res.json({error:0,message:'电脑',data:computer});
    }).catch((err)=>{
        console.log(err);
        console.log('出错了');
    })

});
//获取生活周边
router.get('/lifeAround',function(req,res){
    var category = '生活';
    Good.find({category:category}).then((lifeAround)=>{
        // console.log(lifeAround);
        return res.json({error:0,message:'电脑',data:lifeAround});
    }).catch((err)=>{
        console.log(err);
    })

});
//详情页面
router.post('/prodet/:id',function (req,res) {
    // console.log(req.params.id);
    var id = req.params.id;
    console.log(id);
    Good.findOne({'_id':id}).then((good)=>{
        // console.log(good);
        res.json({error:0,message:'得到了',good:good})
    }).catch((err)=>{
        console.log(err);
    })

});
//删除商品
router.get('/del/:id',function(req,res){
    var id = req.params.id;
    Good.findByIdAndRemove({'_id':id}).then((data)=>{
        console.log('已删除');
    //     console.log(123);
        return res.json({error:0,message:'已删除'});
    }).catch((err)=>{
        console.log(err);
    })

});
//编辑页面
router.post('/edit/:id',upload.array('photo',6),(req,res)=>{
    console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    Good.findByIdAndUpdate({'_id':id}).then((good)=> {
        good.productName = req.body.name;
        good.salePrice = req.body.price;
        good.color = req.body.color;
        good.size = req.body.size;
        good.productDes = req.body.des;
        good.category = req.body.category;
        good.productImage = req.body.photo;
        good.productDetails = req.body.productDetails;
        good.time = new Date();
        good.save();
        req.session.good = good;
        // console.log(good);
        console.log('已修改');
       return res.json({error:0,message:'修改成功'});
    }).catch((err)=>{
        console.log(err);
    });
});
//搜索商品
router.post('/search',function (req,res) {
    var good = req.body.search;
    // console.log(good);
    var gal = RegExp(good,'i');
    // console.log(gal);
    Good.find({'productName':gal}).then((goods)=>{
        // console.log(goods);
        res.json({error:0,message:'找到了',goods:goods});
    }).catch((err)=>{
        console.log(err);
    })
    // res.json({error:0,message:'找到了'});
});
//价格排序-----升序
router.post('/search/up',function (req,res) {
    var good = req.body.search;
    // console.log(good);
    var gal = RegExp(good,'i');
    console.log(gal);
    Good.find({'productName':gal}).sort({'salePrice':1}).then((goods)=>{
        // console.log(goods);
        res.json({error:0,message:'找到了',goods:goods});
    }).catch((err)=>{
        console.log(err);
    })
    // res.json({error:0,message:'找到了'});
});
//价格排序-----降序
router.post('/search/down',function (req,res) {
    var good = req.body.search;
    // console.log(req.body);
    var gal = RegExp(good,'i');
    console.log(gal);
    Good.find({'productName':gal}).sort({'salePrice':-1}).then((goods)=>{
        // console.log(goods);
        res.json({error:0,message:'yyy',goods:goods});
    }).catch((err)=>{
        console.log(err)
    })

})
//商品收藏
router.post('/collect/:gid',function (req,res) {
    var gid = req.params.gid;
    var uid = req.session.user._id;
    // console.log(gid);
    // console.log(uid);
    Good.findById({'_id':gid}).then((good)=>{
        // console.log(good);
        good.likes +=1;
        good.save();
        User.findById({'_id':uid}).then((user) =>{
            var collect = user.collect;
            collect.forEach((coll,index)=>{
                if(coll._id == gid){
                    console.log('已收藏过该商品')
                    return;
                }
            })
            user.collect.push(good);
            // console.log(user.collect);
            let users = new User(user);
            users.save();
            req.session.user = users;
            // console.log(user);

        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
    res.json({error:0});
})
//取消收藏
router.post('/noCollect/:gid',function (req,res) {
    var gid = req.params.gid;
    var uid = req.session.user._id;
    // console.log(gid);
    // console.log(uid);
    Good.findById({'_id':gid}).then((good)=>{
        // console.log(good);
        good.likes --;
        good.save();
        User.findById({'_id':uid}).then((user) =>{
            var collect = user.collect;
            collect.forEach((coll,index)=>{
                if(coll._id == gid){
                    collect.splice(index,1);
                    return;
                }
            })
            console.log(user.collect.length);
            let users = new User(user);
            users.save();
            req.session.user = users;
            // console.log(user);
        }).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
    res.json({error:0});
})









module.exports = router;