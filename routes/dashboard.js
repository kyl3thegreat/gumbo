var express = require('express');
var router = express.Router();
var db = require('../models');

// Authentication middleware for fb logi
const authCheck = (req, res, next) => {
  if(!req.user){
      // if user is not logged in
      res.redirect('/auth/login')
  }
  else{
      // if User is logged in
    db.User.findOne({
      where: {id: req.user.id},
      include: [{model:db.UserPreference}, {model:db.DinnerPreference}] 
    }).then(user => {
      console.log(user)
      
      req.user = user
      next()
    })
  }
}

/* GET Dashboard page */
router.get('/', (req, res, next) => {
  res.send('Welcom to Gumbo dashboard')
});



// View the current users profile
router.get('/viewProfile', function(req, res, next) {
  res.redirect('users/profile/view/:name')
});


// User wants to find a new Match
router.get('/newMatch', (req, res, next) => {
    res.send('Finding your perfect match')
})

// View the current users match history
router.get('/history', (req, res, next) => {
    res.redirect('users/history')
})

module.exports = router;