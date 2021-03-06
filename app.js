var express = require('express');
var config = require('./server/config/config.js');
var mongoose = require('mongoose');
var db = require('./server/config/mongoose.js')();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var passport = require('passport');

var index = require('./server/routes/index');
var article = require('./server/routes/article.server.route.js');
var users = require('./server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//session
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cookie-parser
app.use(cookieParser());
//passport
app.use(passport.initialize());
app.use(passport.session());
//加载passport配置
require('./server/config/passport.js')();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use(function (req, res, next) {
  next();
});

app.use(function (req, res, next) {
  if (req.path.indexOf("/api") >= 0) {
    next();
  } else {
    res.render("index");
  }
})
app.use('/api/', index);
app.use('/api/article', article);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
