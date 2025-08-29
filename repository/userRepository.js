const User = require("../schema/userSchema");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");


    async function findUser(parameters){ 
        console.log("findOne function called....")

        console.log("Recieved the parameters :",parameters);
        try {
            const response = await User.findOne({...parameters});
            console.log("findOne function response : ",response);
            return response;
        } catch (error) {
           throw new InternalServerError();
        }
        
    }

    async function createNewUser(userDetails){
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            // if(error.name == "MoongooseError"){
            //     throw new InternalServerError();
            // }else if (error.name == "ValidationError"){
            //     Object.keys(error.errors).map((property) => {
            //         return error.errors[property].message;
            //     })
            //     throw new BadRequestError();
            // }
            // console.log(error);
            // throw new InternalServerError();
            throw error;
        }
    }

module.exports = {
    findUser, 
    createNewUser
}
