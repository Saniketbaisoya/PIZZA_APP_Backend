const {getCart, modifyCart} = require("../service/cartService");
const AppError = require("../utils/appError");

async function cartController(req,res){

    try {
        const response = await getCart(req.user.id);
        return res.status(200).json({
            success : true,
            message : "Successfully fetched the cart",
            data : {response},
            error : {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                error : {error},
                data : {}
            })
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error,
            data : {}
        })
    }
}

async function ModifyToCartController(req,res){

    try {
        const cart = await modifyCart(req.user.id,req.params.productId,req.params.operation == "add");
        return res.status(200).json({
            success : true,
            message : "Successfully added product to the cart",
            data : {cart},
            error : {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                error : {error},
                data : {}
            })
        }
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error,
            data : {}
        })
    }
}
module.exports = {
    cartController,
    ModifyToCartController
};

