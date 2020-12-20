const express = require("express");
const router = express.Router();
const blogController = require('../control/blogController')

router.get("/", blogController.blog_index );

router.get("/:id", blogController.blog_details );

router.post('/search',blogController.user_search)

router.get('/profile/:id',blogController.user_profile)
  
module.exports = router;