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

// GET the current users match history
router.get('/history', (req, res, next) => {
  res.send('Heres your match history')
})

// Get the current users profile
router.get('/profile/view/:name', authCheck, (req, res, next) => {
  res.render('profile', {user: req.user})
})

// Edit the current users profile
router.get('/profile/edit', authCheck, (req, res, next) => {
  res.send('Edit your profile')
})

router.put('/profile/edit', (req, res, next) => {
  db.User.update(req.body, {where:{id: req.user.id}})
  .then((userData) => {
    res.json(userData)
  })


})


// Get the the current users settings
router.get('/profile/settings', authCheck, (req, res, next) => {
  db.User.findById(req.user.id,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(user => {
    res.render('settings', {user: req.user})
  })
})

// Post the changed user preferences
router.put('/profile/settings', (req, res, next) => {
  console.log(req.body);
  
  db.UserPreference.update({
    distance: req.body.distance,
    ageRangeMin: req.body.ageRangeMin,
    ageRangeMax: req.body.ageRangeMax,
    gender: req.body.gender,
    UserId: req.user.id, 
    userPreferenceId: req.user.id
  },
  {
    where:{UserId: req.user.id}
  }).then((userPreference) => {
    res.json(userPreference)
  })
}) 

// Logout the current user
router.get('/profile/settings/logout', (req, res, next) => {
  res.send('You are now logged out')
})

// Delete the current users account
router.delete('/profile/settings/delete_account', (req, res, next) => {
  res.send('Your account has been deleted')
})

// Delete the current users account
router.get('/profile/data', (req, res, next) => {
  db.User.findById(req.user.id,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(user => {
    res.json(user)
  })
})

module.exports = router;
