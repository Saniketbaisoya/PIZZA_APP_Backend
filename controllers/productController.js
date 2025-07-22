const {createProduct,getProductById, deleteProductById} = require("../service/ProductService.js");
const AppError = require("../utils/appError.js");

async function productCreate_Controller(req,res){

    try {
        console.log("service called....");
        const product_Create_Data = await createProduct({
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
            data : {product_Create_Data},
            error : {}
        });
    }catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            });
        }
        return res.status(500).json({
            success : false,
            message : 'Something went wrong',
            data : {},
            error : error
        });
        
    }

}

async function getProductById_Controller(req,res) {
    try {
        const getProductById_data = await getProductById(req.params.id);
        return res.status(200).json({
            success : true,
            message : `Successfully fetch the product of id : ${req.params.id}`,
            data : {getProductById_data},
            error : {}
        });
    }catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error,

            });
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            data : {},
            error : error,
        });
    }
}

async function deleteProuctById_Controller(req,res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success : true,
            message : `Successfully deleted the product`,
            data : {response},
            error : {}
        });
    }catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error,

            });
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            data : {},
            error : error,
        });
    }
}
module.exports = {productCreate_Controller,getProductById_Controller,deleteProuctById_Controller}