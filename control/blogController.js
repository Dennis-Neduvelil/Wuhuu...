const Blog = require("../model/blog");
const User = require("../model/user");
//Landing page
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", {
        title: "Home",
        alert: "All Blogs",
        blogs: result,
        control:'Read More',
        path:'blogs'
      });
    })
    .catch((err) => console.log(err));
};
//Detail Page
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id,(err,result)=>{
    if(err){
      res.status(404).render("404", { title: 404 });
    }else{
      const userid= result.user
      User.findById(userid,(err,data)=>{
        if(err){
          res.status(404).render("404", { title: 404 });
        }
        else{
            const authorName = `${data.fname} ${data.lname}`
            res.render("blogs/detail", {
            title: result.head,
            alert: `Details of blog, ${result.head} by ${authorName}`,
            blog: result,
            author:authorName,
            userStatus:false
          });
        }
      })
    }
  })
};
//Delete Button


module.exports = {
  blog_index,
  blog_details,
};
