const express = require('express')
const passport = require('passport')
const router = express.Router()

// @disc auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @disc DASHBOARD / Landing page
// @route GET /dashboard
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
})

// @disc auth with facebook
// @route GET /auth/facebook
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

// @disc logout
// @route GET /auth/logout
router.get('/logout', (reg, res) => {
    reg.logout(true, (err) => console.log('err'))
    res.redirect('/')
})


module.exports = router