/**
 * Created by LQG on 2017/3/31.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    unique: true,
    type: String,
  },
  password: String,
  age: {
    type: Number,
    default: 0
  },
  salt: String,
  articles: [],
  createdate: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre("save", function (next) {
  if (this.username) this.username = this.username.trim();
  var _this = this;
  if (!_this.password) {
    next();
    return;
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) next(err);
    bcrypt.hash(_this.password, salt, function (err, hash) {
      if (err) next(err);
      _this.salt = salt;
      _this.password = hash;
      next();
    });
  });
});

// UserSchema.methods.hashPassword = function (password, callback) {
//   bcrypt.hash(password, this.salt, function (err, hash) {
//       if (err) hash = "";
//       callback(hash);
//   });
// }

UserSchema.methods.verifyPassword = function (password, callback) {
  var _this = this;
  bcrypt.hash(password, _this.salt, function (err, hashPwd) {
    callback(_this.password === hashPwd);
  });
}

// UserSchema.statics.authenticate = function (username, password, callback) {
//   this.findOneByUsername(username, function (err, data) {
//     if (err || !data) {
//       callback(false);
//       return;
//     }
//     var _this = data;
//     _this.hashPassword(password, function (hash) {
//       if (_this.password === hash) {
//         callback(true, {username: _this.username, age:_this.age})
//       } else {
//         callback(false);
//       }
//     })
//   });
//   // var _this = this;
//   // this.hashPassword(password, function (hash) {
//   //   callback(_this.password === hash)
//   // });
// }
//
// UserSchema.statics.findOneByUsername = function (username, callback) {
//   this.findOne({username: username.trim()}, function (err, data) {
//     if (!err || data) {
//       callback(null, data);
//     } else {
//       callback(new Error("查询用户不存在"), null);
//     }
//   });
// }

mongoose.model("User", UserSchema);