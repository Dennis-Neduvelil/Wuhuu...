const Blog = require('../model/blog')
//Update Page
const update_get = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id).then((result) => {
      res.render("blogs/update", {
        title: result.head,
        alert: `Update  ${result.head}`,
        blog: result,
      });
    }).catch((err)=>{
      res.status(404).render('404',{title:404})
    })
}
//Update page submission
const update_post = (req,res)=>{
    const id = req.params.id;
    Blog.updateOne({ _id: id }, req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        res.status(404).render('404',{title:404})
      });
}

module.exports={
    update_get,
    update_post
}