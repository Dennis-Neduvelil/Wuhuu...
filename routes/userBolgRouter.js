const express = require('express')
const router = express.Router();
const userBlogController = require('../control/userBlogController')

router.delete('/:id', userBlogController.user_blog_delete)

router.get("/", userBlogController.user_blog_index );

router.get("/:id", userBlogController.user_blog_details );
  
module.exports = router;