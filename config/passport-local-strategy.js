const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// Configure a strategy for authentication using passort-local
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    async function (req, email, password, done) {
        try {
            let user = await User.findOne({
            email: email
            });
            if (!user || user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        }catch(err){
            console.log("Error in passport-local-strategy", err);
            return done(err);
        }

    }
));


// Serializing the user to keep user id in session cookies
passport.serializeUser((user, done)=>{
    done(null, user._id);
});

// Deserializing user from the key in the session cookie
passport.deserializeUser(
    async function(id, done){
        try{
            let user = await User.findById(id);
            return done(null, user);
        }catch(err) {
            console.log("Error in deserializeUser", err);
            return done(err);
        }
    }
);


// Function to check authentication
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect(`/users/sign-in`);
}

// Setting authenticated user and sending it to locals for frontend use
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;