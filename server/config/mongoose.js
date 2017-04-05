/**
 * Created by LQG on 2017/3/30.
 */
var config = require('./config.js');
var mongoose = require('mongoose');

module.exports = function () {
  mongoose.Promise = global.Promise;
  var db = mongoose.connect(config.db.url);
  require('../models/baner.server.model.js');
  require('../models/user.server.model.js');
  require('../models/blog.server.model.js');

  return db;
}
