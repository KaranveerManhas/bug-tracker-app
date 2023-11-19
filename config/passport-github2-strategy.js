const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/users.js');
const { builtinModules } = require('module');


passport.use(new GithubStrategy({
    clientID: 'd0af878070cef5f80df9',
    clientSecret: '00d00d47079fc3912920fcce9926be826929d73a',
    callbackURL: "http://localhost:5000/users/auth/github/callback",
    scope: 'user:email'
    },
    async function(accessToken, refreshToken, profile, done){
        try {
            let user = await User.findOne({
                email: profile.emails[0].value
            });
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
            console.log("User already exists");
            return done(null, user);
        }catch(err){
            console.log("Error in finding user in github strategy: ", err);
        }
    }
));
module.exports = passport;