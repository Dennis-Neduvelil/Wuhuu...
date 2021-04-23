const multer = require("multer");
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({}),
    filename: (req,file,cb) => {
        var ext = path.extname(file.originalname);
        cb(null,  file.originalname+ '-' + Date.now()+ext)
    },
    fileFilter: (req,file,cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(JSON.stringify({ "success": false, "message": "Only image allowed" }), false);
        }
        cb(null, true)
    }
});