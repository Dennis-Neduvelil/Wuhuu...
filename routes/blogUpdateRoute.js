const express = require("express");
const router = express.Router();
const blogUpdateController = require('../control/blogUpdateController')

router.get("/:id",blogUpdateController.update_get );
  
router.post("/:id",blogUpdateController.update_post );

module.exports = router;