const express = require("express");
const router = express.Router();
const blogNewBlogController = require('../control/blogNewBlogController')
const fileUp = require('../control/file-upload')


router.get("/",blogNewBlogController.newBlog_get);
  
router.post("/",fileUp,blogNewBlogController.newBlog_post);

module.exports = router;