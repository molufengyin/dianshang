/**
 * Created by Administrator on 2017/11/3.
 */

const mongoose = require('mongoose');
// /链接数据库
mongoose.connect('mongodb://localhost/dianshang', { useMongoClient: true });
//判断数据库是否链接成功
var db = mongoose.connection;
db.on('error',function () {
    console.log('链接数据库失败');

});
db.once('open',function () {
    console.log('数据库链接成功');
});

const Dbset = {
    addOne:function(req,res,obj,mes){
        let newObj = new obj(req.body);
        newObj.save().then((data) => {
            res.end(mes);
            console.log('开始');
        }).catch((err) => {
            res.end(err);
            console.log('错误');
        })
    }
};



module.exports = db;

