const moongoose = require('mongoose');
//Now agr koi user order place krta hai after the login the uske order ka bhi ek schema hoga jisse uske ordered related pura data hmare database mai enter ho ske.....
// Isliye order ki bhi schema create hui.....
const orderSchema = moongoose.Schema({
    user : { // Now agr koi user order place krta hai toh uss order ke corresponding user : id (id of that User who ordered this order) voh bhi store ho jaye isliye User schema ka reference leke uski id ko store kr liya.... in the orderedSchema 
        type : moongoose.Schema.type.ObjectId,
        ref : 'User',
        required : true
    },
    items : [ // Now konse konse product order hoge voh sare products ki info and again order ke corresponding product ki id bhi store krli taki product ki info store again taking the reference of the product to store the id corresponding to the order and also quantity means kitne product store hoge voh bhi store kiya with each product in an item array....
              // Now if you see here that every product with their total quantity are stored into the items array....
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
    totalPrice : {
        type : Number,
        required : true,
    },
    status : {
        type : String,
        default : "ORDERED",
        enum : ["ORDERED","CANCELLLED","DELIVERED","PROCESSING","OUT_FOR_DELIVERY"]
    },
    address : {
        type : String,
        minLength : [0,"Address should be of atleast 10 characters"]
    },
    paymentMethod : {
        type : String,
        enum : ["ONLINE","CASH"],
        default : "CASH"
    },

},{
    timestamps : true
});

const Order = moongoose.model("Order",orderSchema);

module.exports = Order
