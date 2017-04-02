/**
 * Created by LQG on 2017/4/2.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model("User");

function authenticate(username, password, done) {
  User.findOne({username: username}, {username: 1, password: 1, salt: 1, age: 1, _id: 0}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    user.verifyPassword(password, function (isAuthenticate) {
      if (!isAuthenticate) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}

var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  // session: true
}, authenticate);

module.exports = function () {
  passport.use("local", localStrategy);
}
