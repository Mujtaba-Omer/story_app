
const passport = require('passport')
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    state: true,
    enableProof: true
  },
  async function(accessToken, refreshToken, profile, done) {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }
    try {
        let user = await User.findOne({googleId: profile.id})
        if (user) done(null, user);
        else {
            user = await User.create(newUser)
            done(null, user)
        }
    } catch (err) {
        console.error(err);
    }
  }
));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}

