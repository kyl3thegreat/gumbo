var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

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
