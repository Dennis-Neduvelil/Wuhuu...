const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req,file,cb) => {
        var ext = path.extname(file.originalname);
        cb(null,  file.originalname+ '-' + Date.now()+ext)
    },
});
const upload = multer({
    storage: storage,
    fileFilter: function (req,file,cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(JSON.stringify({ "success": false, "message": "Only image allowed" }), false);
        }
        cb(null, true)
    }
}).single("image")

module.exports = upload;