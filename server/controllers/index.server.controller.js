/**
 * Created by LQG on 2017/3/30.
 */

var mongoose = require('mongoose');
var Baner = mongoose.model('Baner');
var User = mongoose.model("User");
var passport = require('passport');

exports.index = function (req, res) {
  res.render('index');
}

exports.getBanerURL = function (req, res, next) {
  Baner.findOne({}, {banerUrl: 1, _id: 0}, function (err, data) {
    if (err) {
      console.log("err: " + err);
      next(err);
    } else {
      res.json(data);
    }
  })
}

exports.checkLogin = function (req, res, next) {
  console.log(req.session);
  if (req.session.user) {
    next();
  } else {
    //这里先返回未登录
    res.json({isLogin: false});
  }
}

exports.isSignined = function (req, res) {
  res.json({isLogin: true, user: req.session.user});
}

exports.signup = function (req, res) {
  delete req.body.confirmpassword;
  //验证数据步骤省略
  var user = new User(req.body);
  user.save(function (err, data) {
    if (err) {
      res.json(err);
    } else {
      res.json();
    }
  })
}

exports.signin = function (req, res) {
  delete req.body.confirmpassword;
  passport.authenticate('local', function (err, user) {
    if (!user) {
      res.json({errCode:300007, errmsg:"密码错误"});
      return;
    }
    delete user.salt;
    delete user.password;
    req.session.user = user;
    res.json(user);
  })(req, res);

  //验证数据步骤省略
  // User.authenticate(req.body.username, req.body.password, function (isAuthenticate, user) {
  //   if (isAuthenticate) {
  //     req.session.user = user;
  //     res.json(user);
  //   } else {
  //     res.json({errCode:300007, errmsg:"密码错误"})
  //   }
  // });
  // User.findOneByUsername(req.body.username, function (err, data) {
  //   data.authenticate(req.body.password, function (isAuthenticate) {
  //     res.json(isAuthenticate);
  //   });
  // });
}