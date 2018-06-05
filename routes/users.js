var express = require('express');
var router = express.Router();

// GET the current users match history
router.get('/history', (req, res, next) => {
  res.send('Heres your match history')
})

// Get the current users profile
router.get('/profile/view/:name', (req, res, next) => {
  res.send('Viewing ' + req.params.name + '\'s Profile')
})

// Edit the current users profile
router.get('/profile/edit', (req, res, next) => {
  res.send('Edit your profile')
})

router.post('/profile/edit', (req, res, next) => {
  res.send('Changes have been saved')
})


// Get the the current users settings
router.get('/profile/settings', (req, res, next) => {
  res.send('Viewing your profile settings')
})

// Post the changed user preferences
router.post('/profile/settings', (req, res, next) => {
  res.send('User preferences updated')
}) 

// Logout the current user
router.get('/profile/settings/logout', (req, res, next) => {
  res.send('You are now logged out')
})

// Delete the current users account
router.get('/profile/settings/delete_account', (req, res, next) => {
  res.send('Your account has been deleted')
})

module.exports = router;
