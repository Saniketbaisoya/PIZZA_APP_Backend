const express = require("express");
const {productCreate_Controller,getProductById_Controller,deleteProuctById_Controller} = require("../controllers/productController");
const uploader = require("../middlewares/multerMiddleware");
const { isLoggedIn, isAdmin } = require("../validation/authValidation");

const ProductRouter = express.Router();

ProductRouter.post(
    '/',
    isLoggedIn,
    isAdmin,
    uploader.single('productImage'),
    productCreate_Controller
);
ProductRouter.get('/:id',getProductById_Controller);
ProductRouter.delete('/:id',deleteProuctById_Controller);
module.exports = ProductRouter;
