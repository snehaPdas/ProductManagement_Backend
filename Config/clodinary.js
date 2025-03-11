    
    require("dotenv").config()
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,

    })

    module.exports = cloudinary


    module.exports.uploadToCloudinary=(fileBuffer,folder)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({folder},(error,result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result )
            }
        }).end(fileBuffer)
    })
    }