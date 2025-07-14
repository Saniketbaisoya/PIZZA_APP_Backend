const mongoose = require("mongoose");
const { DB_URL } = require("./serverConfig.js");

async function  connectDB() {
    
        try {
                await mongoose.connect(DB_URL);
                console.log("Successfully connected to the db server....");  
        } catch (error) {
                console.log("Failed to connect to MongoDB");
                console.log(error); // log error ko print krke pta krege ki kyu ni connect ho rha....
        }

};

module.exports = connectDB;