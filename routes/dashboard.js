var express = require('express');
var router = express.Router();

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