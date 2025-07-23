const { findCart } = require("../repository/cartRepository");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId){
    const cart =  await findCart(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

module.exports = getCart;
