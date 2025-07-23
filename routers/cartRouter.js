const express = require('express');
const cartController = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidation');

const cartRouter = express.Router();
// jo bhi user logged in rhega sirf vhi cart ko fetch kr skta hain....
// Now , overall flow would be if the new user would be created in the database then corresponding to user the cart has been created because we call the createCart repository in the userService where the userCreate repository and cartCreate repository was called then user and cart both are simultaneously created then if the user is logged in again with the same id and password then he will fetch their own cart also.....
cartRouter.get('/',isLoggedIn,cartController);

module.exports = cartRouter;