const Blog = require("../model/blog");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//New Blog Page
const newBlog_get = (req, res) => {
  res.render("blogs/create", { title: "New Blog", alert: "Create New One" });
};
//New Blog Submission
const newBlog_post = (req, res) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.redirect("/log-in");
      } else {
        const userid = decoded.id;
        const blog = new Blog({
          head: req.body.head,
          subHead: req.body.subHead,
          content: req.body.content,
          user: userid,
        });
        blog.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

module.exports = {
  newBlog_get,
  newBlog_post,
};
