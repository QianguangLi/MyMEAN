/**
 * Created by LQG on 2017/4/2.
 */

var express = require('express');
var router = express.Router();
var controller = require('../controllers/article.server.controller.js');

router.get('/', controller.article);

module.exports = router;
