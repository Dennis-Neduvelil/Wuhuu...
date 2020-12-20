const Blog = require("../model/blog");
const fs = require('fs')
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
const update_post = (req, res) => {
  console.log(req.file);
  const id = req.params.id;
  if (req.file) {
    Blog.updateOne(
      { _id: id },
      {
        head: req.body.head,
        subHead: req.body.subHead,
        content: req.body.content,
        image: req.file.filename,
      }
    )
      .then((result) => {
        res.redirect("/user");
      })
      .catch((err) => {
        res.status(404).render("404", { title: 404 });
      });
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

const image_delete = async (req,res)=>{
const id = req.params.id
const {image} = await Blog.findById({_id:id}).select('-_id image')
fs.unlink(`uploads/${image}`, (err)=> {
  if (err) throw err;
  console.log('File deleted!');
}); 
Blog.updateOne({_id: id}, {$unset:{image:''}}).then(()=>{
  res.redirect(`/update/${id}`)
}).catch((err)=>{
  res.json({id, msg: err })
  console.log(err)
})
}
module.exports = {
  update_get,
  update_post,
  image_delete
};
