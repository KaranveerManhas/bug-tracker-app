const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/users.js');
const { builtinModules } = require('module');

// Passport Github Strategy
passport.use(new GithubStrategy({
    // Used variables stored in environment variables
    clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_GITHUB_CALLBACK_URL,
    scope: 'user:email'
    },
    async function(accessToken, refreshToken, profile, done){
        try {
            // Check if user exists
            let user = await User.findOne({
                email: profile.emails[0].value
            });
            // If no user found create a new one
            if(!user) {
                try {
                    let newUser = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    });
                    return done(null, newUser);
                }catch(err) {
                    console.log("Error in creating user in github strategy: ", err);
                    return;
                }
            }
            // If user is found, pass the user
            console.log("User already exists");
            return done(null, user);
        }catch(err){
            console.log("Error in finding user in github strategy: ", err);
        }
    }
));

// Export the strategy
module.exports = passport;