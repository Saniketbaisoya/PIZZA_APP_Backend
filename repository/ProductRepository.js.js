const Product = require("../schema/schema.js");

// repository layer ke jitne bhi functions hote hai unko try catch  mai bind krna is good practice....
// Now function ko async bhi bna diya taki completely execute ho jaye from end to end....
async function create_product(productDetails){
    const response = await Product.create(productDetails);
    return response;
}

module.exports = {
    create_product
}