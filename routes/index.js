const express = require('express');
const router = express.Router();
const homeController = require('../controller/home-controller');

router.get('/', homeController.home);
router.use('/projects', require('./project'));
router.use('/users', require('./users'));

module.exports = router;