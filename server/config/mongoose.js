/**
 * Created by LQG on 2017/3/30.
 */
var config = require('./config.js');
var mongoose = require('mongoose');

module.exports = function () {
  var db = mongoose.connect(config.db.url);
  require('../models/baner.server.model.js');
  require('../models/user.server.model.js');

  return db;
}
