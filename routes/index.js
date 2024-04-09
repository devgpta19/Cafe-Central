var express = require('express');
var router = express.Router();
const userModel = require('./users');
const productModel = require('./product');
const cartModel = require('./cart');
const cartProductModel = require('./cartProduct');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HOME' });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
})

router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
})

router.get('/starters', function(req, res){
  res.render('starters', { title: 'Starters' })
})

router.get('/mainCourse', function(req, res){
  res.render('maincourse', { title: 'Main Course' })
})



module.exports = router;
