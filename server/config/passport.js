/**
 * Created by LQG on 2017/4/2.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model("User");

function authenticate(username, password, done) {
  User.findOne({username: username}, {username: 1, password: 1, salt: 1, age: 1, _id: 1}, function (err, user) {
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

      return done(null, {
        _id: user._id,
        username: user.username
      });
    });
  });
}

var localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  // session: true
}, authenticate);

module.exports = function () {
  //Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(_id, done) {
    User.findOne({
      _id: _id
    }, '-salt -password', function(err, user) {
      done(err, user);
    });
  });
  passport.use("local", localStrategy);
}
