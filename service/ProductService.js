const cloudinary = require("../configuration/cloudinaryConfig.js");
const fs = require('fs/promises');
const { create_product } = require('../repository/ProductRepository.js');
async function createProduct(productDetails) {
    // console.log(productDetails);
    // buisness logics :
    // 1. First we should Check if the image of an create Prouduct is coming or not..,
    // if come then we should to upload the image on cloudinary....
    var imagePath = productDetails.imagePath;
    
    if(imagePath){// if image_path is exist then we should upload it...
        
        try {// also there would be the chance for error from cloudinary so it is good practice to bind it into try-catch...
            console.log("cloudinary mai aa gye...");
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath,{folder: 'productImage'});
            // console.log(result);

            // Now var bnane ka reson hai url ko taki iska block scope sbke liye accessible ho jaye....
            var url = cloudinaryResponse.secure_url;
            console.log(url);
            // Now cloudinary pr apni image ko upload krke hmne usko immediately delete krdiya and cloudinary se secure_url nikalne ke baad yeah kaam kiya hai....
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            throw{reason : "Not able to create the product",statusCode : 500};
        }
    }
    const productDataForRepository = {
        ...productDetails,
        productImage: url
    };
    // 2. Now the secure_url is given by cloudinary , then we should create the product on dataBase through secure_url + product details....
    // also if the url of productImage is not given then also we will create the prodcut.... 
    const product =  await create_product(productDataForRepository);

    if(!product){
        throw{reason : "Not able to create product",statusCode :500}
    }
    console.log("This is product of service :",product);
    return product;
}

module.exports = createProduct;
