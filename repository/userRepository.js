const User = require("../schema/productSchema.js");


    async function findUser(parameters){ 
        console.log("findOne function called....")

        console.log("Recieved the parameters :",parameters);
        try {
            const response = await User.findOne({...parameters});
    
            return response;
        } catch (error) {
            console.log(error);
        }
        
    }

    async function createNewUser(userDetails){
        try {
            const user = await User.create(userDetails);
            const response = await user.save(); 
            return response;
        } catch (error) {
            console.log(error);
        }
        
    }

module.exports = {
    findUser , createNewUser
}