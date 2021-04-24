const express = require('express')
const router = express.Router();
const userBlogController = require('../control/userBlogController')

router.delete('/:id', userBlogController.user_blog_delete)

router.get("/", userBlogController.user_blog_index );

router.get("/:id", userBlogController.user_blog_details );

router.post("/updateProfile/:id",userBlogController.user_profile_update);
  
module.exports = router;