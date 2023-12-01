const express = require('express');
const router = express.Router();
// Import home controller
const homeController = require('../controller/home-controller');

// For home routes
router.get('/', homeController.home);
// For /projects routes use projects router
router.use('/projects', require('./project'));
// For /users routes use users router file
router.use('/users', require('./users'));
// For /bugs routes use bugs router file
router.use('/bugs', require('./bugs'));

module.exports = router;