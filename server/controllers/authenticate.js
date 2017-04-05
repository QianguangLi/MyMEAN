/**
 * Created by LQG on 2017/4/5.
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.session.user) {
    return res.json({code: 401, message: "请登录"});
  }
  next();
}