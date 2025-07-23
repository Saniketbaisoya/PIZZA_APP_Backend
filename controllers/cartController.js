const getCart = require("../service/cartService");
const AppError = require("../utils/appError");

async function cartController(req,res){

    try {
        const response = await getCart(req.body.userId);
        return res.status(200).json({
            success : true,
            message : "Successfully fetch the cart",
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
module.exports = cartController;

