const express = require("express");
const productController = require("../controllers/productController");
const uploader = require("../middlewares/multerMiddleware");

const ProductRouter = express.Router();

ProductRouter.post('/',uploader.single('productImage'),productController);

module.exports = ProductRouter;
