const User = require("../schema/schema.js");


    async function findUser({paramters}){ 
        console.log("findOne function called....")

        console.log("Recieved the parameters :",paramters);
        try {
            const response = await User.findOne({...paramters});
            return response;
        } catch (error) {
            console.log(error);
        }
        
    }

    async function createNewUser(userDetails){
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
        }
        
    }

module.exports = {
    findUser , createNewUser
}