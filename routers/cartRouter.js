const express = require('express');
const {cartController, ModifyToCartController} = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidation');

const cartRouter = express.Router();
// jo bhi user logged in rhega sirf vhi cart ko fetch kr skta hain....
// Now , overall flow would be if the new user would be created in the database then corresponding to user the cart has been created because we call the createCart repository in the userService where the userCreate repository and cartCreate repository was called then user and cart both are simultaneously created then if the user is logged in again with the same id and password then he will fetch their own cart also.....
cartRouter.get('/',isLoggedIn,cartController);

// Now jaise ki aage hmm req.user.id nikal rhe hai toh voh tbhi ayegi jb user login kr lega toh manually hmme send krne ki jarorat nhi hogi...
// also jo product ki id hai usko params mai se nikala hai , toh mtlb productId hmme send krni hogi params mai....
cartRouter.post('/:operation/:productId',isLoggedIn,ModifyToCartController);

module.exports = cartRouter;