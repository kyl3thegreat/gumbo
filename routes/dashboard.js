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

// GET the dashboard of the current user
router.get('/dashboard', authCheck, (req, res, next) => {
  console.log(req.user);
  
  res.render('dashboard', {user: req.user})

})

// View the current users profile
router.get('/viewProfile', function(req, res, next) {
  res.redirect('users/profile/view/:name')
});


// User wants to find a new Match
router.get('/newMatch', (req, res, next) => {
    res.render('questionnaire')
})

router.get('/matches', (req, res, next) => {
  console.log(req.body);
  
  res.send('here are your matches')
})

// View the current users match history
router.get('/notifications', (req, res, next) => {
    res.render('notifications')
})

module.exports = router;