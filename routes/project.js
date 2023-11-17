const express = require('express');
const router = express.Router();
const projectController = require('../controller/projects_controller');

router.get('/', projectController.home);


module.exports = router;