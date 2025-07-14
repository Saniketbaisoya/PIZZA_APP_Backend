const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    ProductName : {
        type : String,
        required : [true,"Product name is Required"],
        minlength :[5,"Product name atleast 5 characters"],
        trim : true,
        maxlenght : [15,"Product name atmost 15 characters long"]
    },

    Description : {
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
    category : {
        type : String,
        enum : ["veg","non-veg","drinks","sides"],
        default : "veg"
    },
    inStock : {
        type : Boolean,
        required : [true,"inStock status is required"]
    },
},{
    timestamps : true
});



