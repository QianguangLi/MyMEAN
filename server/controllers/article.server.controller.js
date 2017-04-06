/**
 * Created by LQG on 2017/4/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Blog = mongoose.model("Blog");
var dateformat = require('dateformat');

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

exports.getBlog = function (req, res) {
  Blog
    .findOne({_id: req.params.id})
    .populate({
      path: "author",
      select: {username: 1, _id: 1}
    })
    .lean(true)
    .exec(function (err, blog) {
      if (err) {
        return res.json({code: 400, message: err.message});
      }
      blog.createDate = dateformat(blog.createDate, "yyyy-mm-dd HH:MM:ss");
      res.json({code: 200, message: "success", blog: blog});
    });
}

exports.updateBlog = function (req, res) {
  Blog
    .update({_id: req.params.id}, {$set: {
      title: req.body.title,
      content: req.body.content,
      updateDate: Date.now()
    }})
    .exec(function (err, data) {
      if (err) {
        return res.json({code: 400, message: err.message});
      } else {
        res.json({code: 200, message: "success"});
      }
    });
};

exports.blogList = function (req, res) {
  var queryObj = req.params.id ? {author: req.params.id} : {};
  Blog
    .find(queryObj, {__v: 0})
    .populate({
      path: "author",
      select: {username: 1, _id: 1}
    })
    .sort({createDate: "desc"})
    .lean(true)
    .exec(function (err, blogs) {
      if (err) {
        return res.json({code: 400, message: err.message});
      }
      blogs.forEach(function (blog, i, blogs) {
        blog.createDate = dateformat(blog.createDate, "yyyy-mm-dd HH:MM:ss");
        blog.updateDate = dateformat(blog.updateDate, "yyyy-mm-dd HH:MM:ss");
      });
      res.json({code: 200, message: "success", blogs: blogs});
    });
}