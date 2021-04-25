const Blog = require("../model/blog");
const User = require("../model/user");
//Landing page
const blog_index = (req, res) => {
  Blog.find()
    .select("head subHead content image")
    .populate("user", "lname fname avatar")
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", {
        title: "Home",
        alert: "All Blogs",
        blogs: result,
        control: "Read More",
        path: "blogs",

      });
    })
    .catch((err) => console.log(err));
};
//Detail Page
const blog_details =  (req, res) => {
  const id = req.params.id;
  Blog.findById(id, (err, result) => {
    if (err) {
      res.status(404).render("404", { title: 404 });
    } else {
      const blogDetailFun = async () => {
        try {
          const userid = await result.user;
          const data = await User.findById(userid).sort({ createdAt: -1 });
          const authorName = `${data.fname} ${data.lname}`;
          const avatar = data.avatar;
          res.render("blogs/detail", {
            title: result.head,
            alert: `Details of blog, ${result.head} by ${authorName}`,
            blog: result,
            author: authorName,
            avatar:avatar,
            userStatus: false,
           
          });
        } catch {
          res.status(404).render("404", { title: 404 });
        }
      };
      blogDetailFun();
    }
  });
};

const user_search = async (req, res) => {
  const search = req.body.search;
  if (search === "") {
    return;
  }
  try {
    const result = await User.find({
      fname: { $regex: search, $options: "$i" },
    })
      .select("fname lname _id")
      .limit(5);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(404).render("404", { title: 404 });
  }
};
const user_profile = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
    const blogs = await Blog.find({ user: id })
      .select("head subHead content image")
      .sort({ updatedAt: -1 })
      .sort({ createdAt: -1 });
    res.render("blogs/profile", {
      user,
      blogs,
      path: "blogs",
      title: "profile",
      control: "Read More",
    });
  } catch {
    console.log(err);
    res.status(404).render("404", { title: 404 });
  }
};

module.exports = {
  blog_index,
  blog_details,
  user_search,
  user_profile,
};
