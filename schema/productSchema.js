const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true,"Product name is Required"],
        minlength :[5,"Product name atleast 5 characters"],
        trim : true,
        maxlenght : [15,"Product name atmost 15 characters long"]
    },

    description : {
        type : String,
        minlength : [5,"Product Description must be atleast 5 characters"],
        maxlenght : [150,`Product name atmost ${150} characters long`]
    },
    productImage : {
        type : String,
    },
    price :{
        type : Number,
        required : [true,"Product price is required"]
    },
    category : { // Now default value enum se phele define krni hai
        type : String,
        default : "veg",
        enum : ["veg","non-veg","drinks","sides"]
        
        
    },
    inStock : {
        type : Boolean,
        default : true,
        required : [true,"inStock status is required"]
        
    },
},{
    timestamps : true
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;


