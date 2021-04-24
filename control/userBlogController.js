const Blog = require("../model/blog");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const cloudinary = require("../control/cloud");
const dotenv = require("dotenv");
dotenv.config();

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
            const userDtl = {fname:resultu.fname,lname:resultu.lname,email:resultu.email,desigination:resultu.desigination,avatar:resultu.avatar,_id:resultu._id};

            Blog.find({ user: userid })
              .select("_id head subHead content image")
              .sort({ createdAt: -1 })
              .then((result) => {
                res.render("blogs/profile", {
                  title: "Your Blogs",
                  user:userDtl,
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
  const {cloud_id} = await Blog.findById(id)
  await cloudinary.uploader.destroy(cloud_id);
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redir: "/user" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: 404 });
    });
};

const user_profile_update = async (req,res)=>{
  const id = await req.params.id;
  const fname = await req.body.fname
  const lname = await req.body.lname
  const gender= await req.body.gender
  const desc= await req.body.desc
  let usrAvatar='public/assets/avatar.png'

  if(gender=='male'){
    usrAvatar='public/assets/male.png'
  }else if(gender=='female'){
    usrAvatar='public/assets/female.png'
  }else if(gender=='human'){
    usrAvatar='public/assets/human.png'
  }

  User.updateOne(
    { _id: id },
    {
      fname:fname,
      lname:lname,
      avatar:usrAvatar,
      desigination:desc
    }
  )
    .then((result) => {
      res.redirect("/user");
    })
    .catch((err) => {
      res.status(404).render("404", { title: 404 });
    });

}

module.exports = {
  user_blog_index,
  user_blog_details,
  user_blog_delete,
  user_profile_update
};
