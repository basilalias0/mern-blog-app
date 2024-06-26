require('dotenv').config()
const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')


cloudinary.config({ 
    cloud_name: 'dh8crye03', 
    api_key: '719359753684953', 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});


const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpeg','jpg','png'],
    params: {
      folder: 'blog-app-v3',
      transformation:[{width:500,height:500,crop:"limit"},]
    },
  });

  module.exports=storage