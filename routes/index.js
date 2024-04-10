var express = require('express');
var router = express.Router();
const userModel = require('./users');
const productModel = require('./product')

const users = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');
const product = require('./product');
const upload = require('./multer')
passport.use(new localStrategy(users.authenticate()));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'HOME' });
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


router.post('/createProduct', upload.single('image'), isloggedIn, isSeller, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const productData = await productModel.create({
    name: req.body.name,
    price: req.body.price,
    user: user.id,
    description: req.body.description,
    category: req.body.ismaincourse == 'on' ? "maincourse" : "starters",
    images: req.files,
  })
  await productData.save();
  res.redirect('/createProduct')
})

router.get('/starters', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(user);
  let product = await productModel.find().populate("username");
  res.render('starters', { title: 'Starters', user, product })
})

router.get('/maincourse', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  console.log(user);
  let product = await productModel.find().populate("username");
  res.render('maincourse', { title: 'Main Course', user, product })
})

module.exports = router;
