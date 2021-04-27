const Blog = require("../model/blog");
const cloudinary = require("../control/cloud");
//Update Page
const update_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).select('head subHead content image')
    .then((result) => {
      res.render("blogs/update", {
        title: result.head,
        alert: `Update  ${result.head}`,
        blog: result,
      });
    })
    .catch((err) => {
      res.status(404).render("404", { title: 404 });
    });
};
//Update page submission
const update_post = async(req, res) => {
  const id = req.params.id;
  const {cloud_id} = await Blog.findById(id);
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, async(err,result)=>{
      if (result){
        await cloudinary.uploader.destroy(cloud_id);
        Blog.updateOne(
          { _id: id },
          {
            head: req.body.head,
            subHead: req.body.subHead,
            content: req.body.content,
            image: result.secure_url
          }
        )
          .then((result) => {
            res.redirect("/user");
          })
          .catch((err) => {
            res.status(404).render("404", { title: 404 });
          });

      }
      if(err){
        console.log(err)
        res.status(404).render("404", { title: 404 });
      }
    })
  } else {
    Blog.updateOne(
      { _id: id },
      {
        head: req.body.head,
        subHead: req.body.subHead,
        content: req.body.content,
      }
    )
      .then((result) => {
        res.redirect("/user");
      })
      .catch((err) => {
        res.status(404).render("404", { title: 404 });
      });
  }
};


module.exports = {
  update_get,
  update_post,
};
