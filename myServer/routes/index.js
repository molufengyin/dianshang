var express = require('express');
var router = express.Router();
var Goods = require('../models/Good');
/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(req.body);
    Goods.find().then(function(goods){
        console.log(goods);
        res.render('index', {
            title: '147' ,
            goods:goods
        });
    }).catch(function(err){
        console.log(err);
    })
});

router.get('/add',function(req,res,next){
    res.render('add', { title: '123' });
})
module.exports = router;
