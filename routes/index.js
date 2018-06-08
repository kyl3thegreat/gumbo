var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render('index')
})

/* GET settings page. */
router.get('/settings', function(req, res, next) {
  res.render('settings');
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

/* GET history page. */
router.get('/notifications', function(req, res, next) {
  res.render('notifications');
});

/* GET location page. */
router.get('/location', function(req, res, next) {
  res.render('location');
});

/* GET matches page. */
router.get('/matches', function(req, res, next) {
  res.render('matches');
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile');
});

/* GET questionnaire page. */
router.get('/questionnaire', function(req, res, next) {
  res.render('questionnaire');
});

router.get('/profile/:id', (req, res, next) => {
  db.User.findById(req.params.id,
    {include: [{model:db.UserPreference}, {model:db.DinnerPreference}]})
    .then(userProfile => {
      res.json(userProfile)
  })
})

module.exports = router;