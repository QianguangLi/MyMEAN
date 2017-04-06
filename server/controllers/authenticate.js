/**
 * Created by LQG on 2017/4/5.
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.session.user) {
    return res.json({code: 401, message: "请登录"});
  }
  next();
}

exports.hasAuthenticate = function (req, res, next) {
  if (req.session.user._id === req.body.author._id) {
    next();
  } else {
    res.json({code: 402, message: "没有权限"})
  }
}