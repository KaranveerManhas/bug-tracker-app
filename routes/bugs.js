const express = require('express');
const router = express.Router();
// Export bug controller
const bugController = require('../controller/bug-controller');
const passport = require('passport');

// Routes
router.get('/', passport.checkAuthentication, bugController.home);
router.post('/create/:id', passport.checkAuthentication, bugController.createBug);
router.get('/delete/:id', passport.checkAuthentication, bugController.deleteBug);
router.get('/search', bugController.searchBySearchTerm);
router.get('/filter/label/:id', bugController.searchByFilterLabel);
router.get('/filter/author/:id', bugController.searchByFilterAuthor);

module.exports = router;