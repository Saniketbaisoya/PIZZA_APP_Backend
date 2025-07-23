const Cart = require("../schema/cartSchema");
const InternalServerError = require("../utils/internalServerError");

async function createCart(userId){
    try {
        const response = Cart.create({user: userId});
        return response;
    } catch (error) {
        if(error.name == 'MongooseError'){
            throw new InternalServerError();
        }else if(error.name == 'ValidationError'){
            Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError();
        }
        console.log(error);
        throw new InternalServerError();
    }
}
async function findCart(userId){
    // Now agr hmme kisi user ki cart ko fetch krna hai toh voh hmm kr skte hai by {user : userId} -> kyuki isi ko hmne store kiya tha cart create krte time yha normal userId isliye ni di kyuki puri key : value store hui thi toh pure object ke basis pe identify hoga....
    try {
        const response = Cart.findOne({user : userId}).populate('items.product');
        return response;
    } catch (error) {
        throw new InternalServerError();
    }
}
module.exports = {createCart,findCart};