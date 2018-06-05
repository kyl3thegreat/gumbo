var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/login', (req, res, next) => {
  res.render('login')
})

// Authenticate with facebook
router.get('/facebook', passport.authenticate("facebook"))

// Callback route for facebook to redirect to
router.get('/facebook/redirect', passport.authenticate("facebook"), (req, res, next) => {
    // res.send(req.user)
    res.redirect('/user/dashboard')
})

router.get('/logout', (req, res, next) => {
  // handle with passport
  req.logout()
  res.redirect('/')
})

module.exports = router;