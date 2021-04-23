const Blog = require("../model/blog");
const jwt = require("jsonwebtoken");
const cloudinary = require("../control/cloud");
const dotenv = require("dotenv");
const { json } = require("body-parser");
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
        if (req.file) {
          const userid = decoded.id;
            cloudinary.uploader.upload(req.file.path,(err,result)=>{
              if (result) {
                console.log(result.secure_url);
                const blog = new Blog({
                  head: req.body.head,
                  subHead: req.body.subHead,
                  content: req.body.content,
                  user: userid,
                  image: result.secure_url,
                  cloud_id: result.public_id
                });
                blog.save((err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.redirect("/user");
                  }
                });
            }else if(err)
            {
              console.log(err)
              res.status(404).render("404", { title: 404 });
            }
          });  
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
              res.redirect("/user");
            }
          });
        }
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
