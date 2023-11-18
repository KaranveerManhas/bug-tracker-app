const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/users_controller');


router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.createUser);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-up'
}), usersController.createSession);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-out', usersController.destroySession);

module.exports = router;