const Product = require("../schema/schema.js");
const BadRequestError = require("../utils/badRequestError.js");
const InternalServerError = require("../utils/internalServerError.js");

// repository layer ke jitne bhi functions hote hai unko try catch  mai bind krna is good practice....
// Now function ko async bhi bna diya taki completely execute ho jaye from end to end....
async function create_product(productDetails){
    try{
        const response = await Product.create(productDetails);
        return response;
    }catch(error){
        if(error.name == 'MongooseError'){
            throw new InternalServerError();
        }else if(error.name == 'ValidationError'){
            Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError();
        }
        console.log(error);
        throw new InternalServerError();
    }
    
}

async function getProductBy_Id(productId){
    try{
        const response = await Product.findById(productId);
        return response;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}

async function deleteProductBy_Id(productId){
    try{
        const response = await Product.findByIdAndDelete(productId);
        return response;
    }catch(error){
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    create_product,
    getProductBy_Id,
    deleteProductBy_Id
}