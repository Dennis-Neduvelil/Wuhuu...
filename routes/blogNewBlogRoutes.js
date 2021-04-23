const express = require("express");
const router = express.Router();
const blogNewBlogController = require('../control/blogNewBlogController')
const upload = require('../control/file-upload')


router.get("/",blogNewBlogController.newBlog_get);
  
router.post("/",upload.single('image'),blogNewBlogController.newBlog_post);

module.exports = router;