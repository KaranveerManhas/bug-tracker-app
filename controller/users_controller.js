const User = require('../models/users');

module.exports.signIn = function(req, res){
    return res.render('users_sign_in', {
        title: "Sign In || Testify"
    });
}

module.exports.signUp = function(req, res){
    return res.render('users_sign_up', {
        title: "Sign Up || Testify"
    });
}

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

module.exports.createSession = function(req, res) {
    console.log("Logged In");
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err){
        if(err){
            console.log("Failed to log out the session", err);
            return next(err);
        }
        return res.redirect('/users/sign-in');
    })
}