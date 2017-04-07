/**
 * Created by LQG on 2017/4/2.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Blog = mongoose.model("Blog");
var dateformat = require('dateformat');
var config = require('../config/config.js');

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
    .update({_id: req.params.id}, {
      $set: {
        title: req.body.title,
        content: req.body.content,
        updateDate: Date.now()
      }
    })
    .exec(function (err, data) {
      if (err) {
        return res.json({code: 400, message: err.message});
      } else {
        res.json({code: 200, message: "success"});
      }
    });
};

exports.blogList = function (req, res) {
  var pageIndex = req.query.page;
  var queryObj = req.params.id ? {author: req.params.id} : {};
  Blog
    .paginate(queryObj, {
      select: '-__v',
      page: pageIndex,
      limit: config.pageSize,
      sort: {createDate: 'desc'},
      populate: {
        path: "author",
        select: {username: 1, _id: 1}
      },
      lean: true,
    }, function (err, result) {
      if (err) {
        return res.json({
          code: 400,
          message: err.message
        });
      }
      var blogs = result.docs;
      blogs.forEach(function (blog) {
        blog.createDate = dateformat(blog.createDate, "yy/mm/dd HH:MM");
        blog.updateDate = dateformat(blog.updateDate, "yy/mm/dd HH:MM");
        blog.content = blog.content.substring(0, 5) + "...";
      });
      res.json({
        code: 200,
        message: "success",
        blogs: blogs,
        pageIndex: result.page,
        totalPage: result.pages
      });
    });
  // Blog
  //   .count(queryObj, function (err, count) {
  //     //javascript /运算有小数......使用Math的ceil向上取整
  //     // var totalPage = count % config.pageSize === 0 ? count / config.pageSize : count / config.pageSize + 1;
  //     var totalPage = Math.ceil(count / config.pageSize);
  //     Blog
  //       .find(queryObj, {__v: 0})
  //       .populate({
  //         path: "author",
  //         select: {username: 1, _id: 1}
  //       })
  //       .sort({createDate: "desc"})
  //       .skip((pageIndex - 1) * config.pageSize)
  //       .limit(config.pageSize)
  //       .lean(true)
  //       .exec(function (err, blogs) {
  //         if (err) {
  //           return res.json({code: 400, message: err.message});
  //         }
  //         blogs.forEach(function (blog, i, blogs) {
  //           blog.createDate = dateformat(blog.createDate, "yy/mm/dd HH:MM");
  //           blog.updateDate = dateformat(blog.updateDate, "yy/mm/dd HH:MM");
  //           blog.content = blog.content.substring(0, 5)+"...";
  //         });
  //         res.json({code: 200, message: "success", blogs: blogs, totalPage: totalPage});
  //       });
  //   });
}