const express = require("express");
const {productCreate_Controller,getProductById_Controller,deleteProuctById_Controller} = require("../controllers/productController.js");
const uploader = require("../middlewares/multerMiddleware");

const ProductRouter = express.Router();

ProductRouter.post('/',uploader.single('productImage'),productCreate_Controller);
ProductRouter.get('/:id',getProductById_Controller);
ProductRouter.delete('/:id',deleteProuctById_Controller);
module.exports = ProductRouter;
