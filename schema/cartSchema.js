const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    user : { // Association....
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',
        unique : true
    },
    items : [
        {
            product: {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'Product'
            },
            quantity : {
                type : Number,
                required : true,
                default : 1,
            }
        }
    ], 

},{
    timestamps : true
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;
