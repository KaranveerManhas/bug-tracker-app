const User = require('../models/users');

// Sign in Page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('users_sign_in', {
        title: "Sign In || BugTracker"
    });
}

// Sign up page
module.exports.signUp = function(req, res){
    return res.render('users_sign_up', {
        title: "Sign Up || BugTracker"
    });
}
// User profile page
module.exports.profile = async function(req, res){
    try {
        let user = await User.findById(req.params.id);
        return res.render('users_profile', {
            title: `${user.name}'s Profile`,
            user: user
        });
    }catch(err){
        console.log(`Error in users profile controller: ${err}`);
    }
}

// Module for creating a user
module.exports.createUser = async function(req, res){
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if(!user){
            try {
                await User.create(req.body);
            return res.redirect('/users/sign-in');

            }catch(err) {
                console.log("Error creating a new user", err);
            }
        }
        console.log("User already exists");
        return res.redirect('back');

    }catch(err) {
        console.log("Error creating a new user", err);
    }
    
}

// Module for updating user details
module.exports.updateUser = async function(req, res) {
    try{
        let user = await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.redirect('back');
    }catch(err){
        console.log("Error in updateUser module: ",err);
    }
}

// Module for logging in
module.exports.createSession = function(req, res) {
    console.log("Logged In");
    return res.redirect(`/`);
}

// Module for destroying session cookies and logging user out
module.exports.destroySession = function(req, res) {
    req.logout(function(err){
        if(err){
            console.log("Failed to log out the session", err);
            return next(err);
        }
        return res.redirect('/users/sign-in');
    })
}