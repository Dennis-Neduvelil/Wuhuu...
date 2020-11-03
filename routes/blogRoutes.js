const express = require("express");
const router = express.Router();
const blogController = require('../control/blogController')

router.get("/", blogController.blog_index );

router.get("/:id", blogController.blog_details );
  
module.exports = router;