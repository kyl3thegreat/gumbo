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
  db.Request.findAll({where:{
    UserId: req.user.id
  }})
  .then((pendingRequests) => {
    db.Request.findAll({where:{
      requestId: req.user.id
    }})
    .then((newRequests) => {      
      res.render('dashboard', {user: req.user, pendingRequests: pendingRequests, newRequests: newRequests})
    })
  })

})

// User wants to find a new Match
router.get('/newmatch', (req, res, next) => {
  res.render('questionnaire')
})

router.get('/matches', (req, res, next) => {
  console.log(req.body);
      
})

// View the current users match history
router.get('/notifications', (req, res, next) => {
  db.Request.findAll({where:{
    UserId: req.user.id
  }})
  .then((pendingRequests) => {
    db.Request.findAll({where:{
      requestId: req.user.id
    }})
    .then((newRequests) => {      
      res.render('notifications',{user: req.user, pendingRequests: pendingRequests, newRequests: newRequests})
    })
  })
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
  
  db.UserPreference.update(req.body,
  {
    where:{UserId: req.user.id}
  }).then((UserPreference) => {
    res.json(UserPreference)
  })
}) 

router.put('/profile/dinnerPreference', (req, res, next) => {
  db.DinnerPreference.update({
    cuisineType: req.body.cuisineType ,
    pricePoint: req.body.pricePoint,
    distance: req.body.distance
  },
  {
    where: {UserId: req.user.id}
  }
 )
 .then((dinnerPreference) => {
   res.json(dinnerPreference)
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

// Get the current users account
router.get('/profile/data', (req, res, next) => {
  db.User.findById(req.user.id,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(user => {
    res.json(user)
  })
})

router.get('/findmatch', (req, res, next) => {

 console.log(req.user);
 

  // find the user from the db, include 
  db.User.findById(req.user.id,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(currentUser => {
      db.User.findAll({include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
      .then(users => {
        let data = {
          currentUser: currentUser,
          users: users
        }
        res.json(data)        

      })
  })
})

router.get('/matched/with/:userid', (req, res, next) => {
  db.User.findById(req.params.userid,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(match => {
      db.User.findById(req.user.id,{include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
      .then(currentUser => {
        res.render('restaurant', {currentUser: currentUser, match: match})
      })
  })
})



router.get('/request/:userid', (req, res, next) => {
  
  db.User.findById(req.params.userid).then((match) => {
    db.Request.create({
      makingRequest: req.user.name,
      recievingRequest: match.name,
      status: false,
      requestId: match.id,
      UserId: req.user.id
    }).then(() => {
      res.redirect('/user/matched/with/' + req.params.userid)
    })
  })
})


module.exports = router;
