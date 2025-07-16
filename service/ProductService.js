const cloudinary = require("../configuration/cloudinaryConfig.js");
const fs = require('fs/promises');
const { create_product, getProductBy_Id, deleteProductBy_Id } = require('../repository/ProductRepository.js');
const InternalServerError = require("../utils/internalServerError.js");
const NotFoundError = require("../utils/notFoundError.js");
//Now createProduct service layer mai ek alg function hai , and jaise repository mai maine sare function ko seperately create kiya hai 
// aise hi sare different functions like update , delete , create inn sbko bhi seperately hi create krege and sbme seperately buisness logic add hoga...
// Note : Repository function's or service ke function's dono ke naam different hone chahiye vrna voh import hone ke liye suggest nhi honge....

async function createProduct(productDetails) {
    // console.log(productDetails);
    // buisness logics :
    // 1. First we should Check if the image of an create Prouduct is coming or not..,
    // if come then we should to upload the image on cloudinary....
    var imagePath = productDetails.imagePath;
    let url=""
    if(imagePath){// if image_path is exist then we should upload it...
        
        try {// also there would be the chance for error from cloudinary so it is good practice to bind it into try-catch...
            console.log("cloudinary mai aa gye...");
            const result = await cloudinary.uploader.upload(imagePath,{folder: 'productImage'});
            // console.log(result);

            // Now var bnane ka reson hai url ko taki iska block scope sbke liye accessible ho jaye....
            url = result.secure_url;
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

    // Note : If the product does'nt have the response from the repository ,a and recieves some error then the error will go to the controller layer and then controller of productController will handle it....
    const product =  await create_product(productDataForRepository);
    
    if(!product){
        throw new InternalServerError();
    }
    console.log("This is product of service :",product);

    return product;
};

// getProductById vala function now agr isme bhi error recieve hua toh ,fetch_product contain krlega and voh chle jayega iske controller fucntion ke pass.... and then inki bhi proper handdling hogi means error ki proper handling hogi...
async function getProductById(productId){
    const fetch_Product = await getProductBy_Id(productId);

    if(!fetch_Product){
        throw new NotFoundError('product');
    }
    return fetch_Product;

};

// deleteProductById vala function now agr isme bhi error recieve hua toh ,deleted_Response contain krlega and voh chle jayega iske controller fucntion ke pass.... and then inki bhi proper handdling hogi means error ki proper handling hogi... 
async function deleteProductById(product_Id){

    const deleted_Response= await deleteProductBy_Id(product_Id);
    if(!deleted_Response){ // delete == false
        throw new NotFoundError('product');
    }
    return deleted_Response;
};
module.exports = {createProduct,getProductById,deleteProductById};
