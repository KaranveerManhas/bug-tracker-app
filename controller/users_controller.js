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