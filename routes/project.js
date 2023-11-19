const express = require('express');
const passport = require('passport');
const router = express.Router();
const projectController = require('../controller/projects_controller');

router.get('/', passport.checkAuthentication, projectController.home);
router.post('/create', passport.checkAuthentication, projectController.createProject);
router.get('/:id', projectController.projectDetails);

module.exports = router;