const { findCart } = require("../repository/cartRepository");
const AppError = require("../utils/appError");
const NotFoundError = require("../utils/notFoundError");
const { getProductById } = require("./ProductService");

async function getCart(userId){
    const cart =  await findCart(userId);
    if(!cart){
        throw new NotFoundError("Cart");
    }
    return cart;
}

async function modifyCart(userId, productId, shouldAdd = true){
    const quantityValue = (shouldAdd==true) ? 1 : -1;
    // userId ke basis pr sbse phele voh cart ko fetch krke layege then productId ka use krke uss product ko fetch krke layege and then uski quantity ko add up krege in the cart that recieve corresponding to userId....
    const cart = getCart(userId);
    const product = await getProductById(productId);
    if(!product){ 
        throw new NotFoundError("product");
    }
    if(!product.inStock && product.quantity<= 0){
        throw new AppError(["Product is not available in stock"]);
    }
    // now product database mai created hai and voh product available bhi hai stock mai 
    // product ko add krege cart mai...

    // Now may be the product is already in the cart....
    let foundProduct = false; // Now agr product already cart mai available hai toh uski quantity ko hmme bss increase krna hai +1....
    // Now cart ke items pr gya and kyuki items is a array property so in every items of product i go then jo product hmme uppr mila hai productId se kya voh vhi product hai jispe abhi hm traverse krte hue aye hai items mai (items.product==productId)
    // Then items.product ke corresponding quantity mai jakrr items.quantity ko +1 se increase kr dege...
    (await cart).items.forEach(item => {
        console.log(item);
        if(item.product._id == productId){
            if(shouldAdd){
                if(product.quantity >= item.quantity + 1){
                    item.quantity += quantityValue;
                }else{
                    throw new AppError("The quantity of the item requested is not available ",404)
                }
            }else {
                if(item.quantity > 0){
                    item.quantity += quantityValue;
                    if(item.quantity == 0){
                        cart.items = cart.items.filter(item => item.product._id != productId);
                        foundProduct = true;
                        return;
                    }
                }
                else {
                    throw new AppError("The quantity of the item requested is not available ",404)
                }
            }
            foundProduct = true; // the product is found in the items array ,also items ke sare indexes pr jakr hmm check kr rhe hai ki voh product jo productId se fetch hua hai voh present hai ki nhi hai in the items array....
        }
    });
    if(!foundProduct){
        if(shouldAdd){
            (await cart).items.push({
                product : productId,
                quantity : 1
            })
        }
        
    } 

    (await cart).save();



   return cart;
}
module.exports = {
    getCart,
    modifyCart
};
