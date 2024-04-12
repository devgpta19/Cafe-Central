var express = require('express');
var router = express.Router();
const userModel = require('./users');
const productModel = require('./product')

const pro = require('./product')
const users = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');
const product = require('./product');
const upload = require('./multer')
passport.use(new localStrategy(users.authenticate()));

/* GET home page. */
router.get('/', async function (req, res, next) {
  const allProducts = await productModel.find()
  res.render('index', { title: 'HOME', allProducts });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
})

router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
})

router.post('/register', function (req, res) {
  console.log(req.body);
  var userData = new userModel({
    username: req.body.username,
    accountType: req.body.isSeller == 'on' ? "seller" : "buyer"
  })
  userModel
    .register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        if (registeredUser.accountType === 'seller') {
          res.redirect("/createProduct")
          return;
        }
        res.render('index')
      })
    })
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function (req, res) {
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('login');
  });
});

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect("/login")
}

function isSeller(req, res, next) {
  if (req.user.accountType === 'seller') return next();
  else res.redirect('/')
}



router.get('/createProduct', isloggedIn, isSeller, function (req, res) {
  res.render('createProduct', { title: 'Create Product' })
})


router.post('/createProduct', isloggedIn, isSeller,upload.array('image'), async function (req, res, next) {

  const username = await userModel.findOne({ username: req.session.passport.user });
  console.log(username);

  const productData = await productModel.create({
    name: req.body.name,
    price: Number(req.body.price),
    description: req.body.description,
    user: req.user._id,
    category: req.body.ismaincourse === 'on' ? "maincourse" : "starters",
    images: req.files.map(file => {
      return "/upload/" + file.filename
    })
  })
  // console.log(user);
  console.log(productData);
  await productData.save();
  res.redirect('/')
})

function ismaincourse(req, res, next) {
  console.log("object");
  if (req.pro.category === 'maincourse') return next();
  else res.redirect('/')
}

router.get('/starters', async function (req, res) {
  // const user = await userModel.findOne({ username: req.session.passport.user });
  // console.log(user);
  let product = await productModel.find();
  console.log(product);
  res.render('starters', { title: 'Starters', product })
})

router.get('/maincourse', async function (req, res) {
  // const user = await userModel.findOne({ username: req.session.passport.user });
  // console.log(user);
  let product = await productModel.find();
  console.log(product);
  res.render('maincourse', { title: 'Main Course', product })
})


router.get('/cart', function(req, res, next) {
  res.render('cart')
})


module.exports = router;
