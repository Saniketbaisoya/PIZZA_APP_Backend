// const User = require("../schema/productSchema.js");
const User = require("../schema/userSchema.js");
const BadRequestError = require("../utils/badRequestError.js");
const InternalServerError = require("../utils/internalServerError.js");


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
            const user = await User.create(userDetails);
            const response = await user.save(); 
            return response;
        } catch (error) {
            if(error.name == "MoongooseError"){
                throw new InternalServerError();
            }else if (error.name == "ValidationError"){
                Object.keys(error.errors).map((property) => {
                    return error.errors[property].message;
                })
                throw new BadRequestError();
            }
            console.log(error);
            throw new InternalServerError();
        }
    }

module.exports = {
    findUser , createNewUser
}
