const passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy,
keys = require('./keys'),
db = require('../models')

passport.serializeUser((user, done) => { done(null, user.id) })
passport.deserializeUser((id, done) => {
    db.User.findById(id).then( user => { done(null, user) })
})

passport.use(new FacebookStrategy({
    // options for the strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "https://gumbo-app.herokuapp.com/auth/facebook/redirect",
    //proxy: true
}, (accessToken, refreshToken, profile, done) => {
    
    
    // passport callback function
    // Check if user already exitsts in our db
    db.User.findOne({
            where: {fbId: profile.id},   
    })
    .then(User => {
        if(User){
            // already have the user
            done(null, User)
        }
        else {
            // if User doesnt exit we will create a new one
            db.User.create({ name: profile.displayName, fbId: profile.id })
            .then(User => {
                db.DinnerPreference.create({UserId: User.id})
                .then(DinnerPreference => {
                    db.UserPreference.create({UserId: User.id})
                    .then(UserPreference => {
                        done(null, User)
                    })
                })
            })
        }
    })

}))
