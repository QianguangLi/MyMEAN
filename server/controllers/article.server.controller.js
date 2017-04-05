/**
 * Created by LQG on 2017/4/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var Blog = mongoose.model("Blog");

exports.addBlog = function (req, res) {
  var authorId = req.session.user._id;
  var blog = new Blog(req.body);
  blog.author = authorId;
  console.log(blog);
  blog.save(function (err, data) {
    if (err) {
      return res.json({code: 400, message: "服务器错误"});
    }
    res.json({code: 200, message: "success"})
  });
}

exports.blogList = function (req, res) {
  var obj = req.params.id ? {author: ObjectId(req.params.id)} : {};
  Blog.find(obj, {__v: 0}).populate({
    path: "author",
    select: {username: 1, age: 1, _id: 1},
  }).sort({createDate: "desc"}).exec(function (err, data) {
    if (err) {
      return res.json({code: 400, message: "服务器错误"});
    }
    res.json({code: 200, message: "success", blogs: data});
  });
}