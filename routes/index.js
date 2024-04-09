var express = require('express');
var router = express.Router();
const userModel = require('./users');
const productModel = require('./product');
const cartModel = require('./cart');
const cartProductModel = require('./cartProduct');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/starters', function(req, res){
  res.render('starters')
})

router.get('/mainCourse', function(req, res){
  res.render('maincourse')
})

module.exports = router;
