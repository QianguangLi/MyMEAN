var express = require('express');
var indexController = require('../controllers/index.server.controller.js');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.index);

router.get('/getBanerUrl', indexController.getBanerURL);

router.post('/signup', indexController.signup);

router.post('/signin', indexController.signin);

router.get('/isSignin', indexController.checkLogin, indexController.isSignined);

module.exports = router;
