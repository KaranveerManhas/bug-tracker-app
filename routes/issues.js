const express = require('express');
const router = express.Router();
const issuesController = require('../controller/issues_controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, issuesController.home);
router.post('/create/:id', passport.checkAuthentication, issuesController.createIssue);

module.exports = router;