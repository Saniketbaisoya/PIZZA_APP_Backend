const { registeredUser } = require("../service/userService");

async function createUser(req,res){
    // Now req mai jo bhi hai voh print ho jayega response aate time.... 

    // Now iss userService mai new keyword ka use krke hmne ek brand new UserService ka object define kiya in userService variable mai and abb iss userService variable se sare functions ka access le skte hain jo UserService mai define hai....
    // const userService = new UserService(new userRepository()); 


    try {
        const response = await registeredUser(req.body);
        return res.status(201).json({
            message : "SuccessFully created the user...",
            success : true,
            data : {response},
            error : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ // 400 -> bad request....
            message : error.reason,
            success : false,
            data : {},
            error : error
        })
    }

}

module.exports = {
    createUser
}