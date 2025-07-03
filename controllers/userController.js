const userRepository = require("../repository/userRepository.js");
const User = require("../schema/schema.js");
const registeredUser = require("../service/userService.js");
const UserService = require("../service/userService.js");

async function createUser(req,res){
    console.log("Create user Controller called");
    // Now req mai jo bhi hai voh print ho jayega response aate time.... 

    // Now iss userService mai new keyword ka use krke hmne ek brand new UserService ka object define kiya in userService variable mai and abb iss userService variable se sare functions ka access le skte hain jo UserService mai define hai....
    // const userService = new UserService(new userRepository()); 


    try {
        // console.log(userService);
        const response = await registeredUser(req.body);
        console.log(req.body);
        return res.status(201).json({
            message : "SuccessFully created the user...",
            success : true,
            data : response,
            error : {}
        })
    } catch (error) {
        return res.status(400).json({
            message : error.reason,
            success : false,
            data : {},
            error : error
        })
    }

}

module.exports = createUser;