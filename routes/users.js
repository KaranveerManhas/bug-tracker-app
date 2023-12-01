const express = require('express');
const router = express.Router();
const passport = require('passport');
// Import User controller
const usersController = require('../controller/users_controller');

// Routes for users
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.createUser);
router.post('/update/:id', passport.checkAuthentication, usersController.updateUser);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-out', usersController.destroySession);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);

module.exports = router;