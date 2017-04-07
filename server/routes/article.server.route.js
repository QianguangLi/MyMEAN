/**
 * Created by LQG on 2017/4/2.
 */

var express = require('express');
var router = express.Router();
var controller = require('../controllers/article.server.controller.js');
var auth = require('../controllers/authenticate.js');

router.post("/add", auth.requiresLogin, controller.addBlog);
router.get("/edit/:id", controller.getBlog);
router.post("/edit/:id", auth.requiresLogin, auth.hasAuthenticate, controller.updateBlog);

router.get("/list", controller.blogList);
router.get("/list/:id", controller.blogList);

module.exports = router;
