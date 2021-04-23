const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API, 
    api_secret: process.env.CLOUD_API_SEC
  });


module.exports= cloudinary;