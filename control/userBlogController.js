const Blog = require("../model/blog");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
//Landing page
const user_blog_index = async (req, res) => {
  const token = req.cookies.jwtoken;
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.redirect("/log-in");
      } else {
        const userid = decoded.id;
        User.findById(userid, (erru, resultu) => {
          if (err) {
            res.redirect("/log-in");
          } else {
            const author = `${resultu.fname} ${resultu.lname}`;

            Blog.find({ user: userid })
              .select("_id head subHead content image")
              .sort({ createdAt: -1 })
              .then((result) => {
                res.render("blogs/index", {
                  title: "Your Blogs",
                  alert: `Blogs by ${author}`,
                  blogs: result,
                  control: "More Options",
                  path: "user",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    });
  } else {
    res.redirect("/log-in");
  }
};

const user_blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id, (err, result) => {
    if (err) {
      res.status(404).render("404", { title: 404 });
    } else {
      try {
        const userid = result.user;
        User.findById(userid, (err, data) => {
          if (err) {
            res.status(404).render("404", { title: 404 });
          } else {
            const authorName = `${data.fname} ${data.lname}`;
            res.render("blogs/detail", {
              title: result.head,
              alert: `Details of blog, ${result.head} by ${authorName}`,
              blog: result,
              author: authorName,
              path: "user",
              userStatus: true,
            });
          }
        });
      } catch (err) {
        res.status(404).render("404", { title: 404 });
      }
    }
  });
};
const user_blog_delete = async (req, res) => {
  const id = req.params.id;
  const { image } = await Blog.findById(id);
  if (image) {
    fs.unlink(`uploads/${image}`, (err) => {
      if (err) throw err;
      console.log("File deleted!");
    });
  }
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redir: "/user" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: 404 });
    });
};
module.exports = {
  user_blog_index,
  user_blog_details,
  user_blog_delete,
};
