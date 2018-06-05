var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* GET settings page. */
router.get('/settings', function(req, res, next) {
  res.render('settings');
});

module.exports = router;

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;

/* GET history page. */
router.get('/history', function(req, res, next) {
  res.render('history');
});

module.exports = router;


/* GET location page. */
router.get('/location', function(req, res, next) {
  res.render('location');
});

module.exports = router;

/* GET matches page. */
router.get('/matches', function(req, res, next) {
  res.render('matches');
});

module.exports = router;

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile');
});

module.exports = router;

/* GET questionnaire page. */
router.get('/questionnaire', function(req, res, next) {
  res.render('questionnaire');
});

module.exports = router;