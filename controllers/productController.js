const createProduct = require("../service/ProductService.js");

async function productController(req,res){

    try {
        console.log("service called....");
        const productData = await createProduct({
            productName : req.body.productName,
            description : req.body.description,
            imagePath : req.file.path,
            price : req.body.price,
            category : req.body.category,
            inStock : req.body.inStock
        })

        return res.status(200).json({
            success : true,
            message : "Successfully created the product...",
            data : productData,
            error : {}
        })
    }catch (error) {
        
        return res.status(404).json({
            success : false,
            message : error.reason,
            data : {},
            error : {error}
        })
    }

}
module.exports = productController;