const express = require("express");
const router = express.Router();
const blogUpdateController = require('../control/blogUpdateController')
const upload = require('../control/file-upload')

router.get("/:id",blogUpdateController.update_get );
  
router.post("/:id",upload.single('image'),blogUpdateController.update_post );

router.get('/delete/:id',blogUpdateController.image_delete)

module.exports = router;