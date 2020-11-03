const express = require("express");
const router = express.Router();
const blogNewBlogController = require('../control/blogNewBlogController')

router.get("/",blogNewBlogController.newBlog_get);
  
router.post("/",blogNewBlogController.newBlog_post);

module.exports = router;