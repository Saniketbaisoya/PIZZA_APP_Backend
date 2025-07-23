const  {findUser} = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

// const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

async function authService(authDetails){
    console.log("autheServive called ")
    const email = authDetails.email;
    const plainPassword = authDetails.password;
    console.log("authService : ",email);
    console.log("authService : ",plainPassword);

    // 1. Check if the Registered user with this given email exists or not ?

    const user = await findUser({mobileNumber});
    console.log("User value that recieved from repo : ",user);
    console.log(user.email);
    console.log(user.password);

    if(!user){
        throw{message : "User Not Found with this email ",statusCode : 404};
    }
    // 2. if user found with this email then....
    // We need to compare the plainIncomingPassword with hashpassword(in db)....
    const isVaildPassword = await bcrypt.compare(plainPassword, user.password);

    console.log(isVaildPassword);
    if(!isVaildPassword){
        throw{message : "Invalid Password ,please try again later....", statusCode : 401};
    }
    

    const userRole = user.role ? user.role : "USER";
    // 3. if the password is validate then we will generate the token for user so that they can login again in the platform....
    const token = jwt.sign({email : user.email , id : user._id, role : userRole} ,Secret_Key ,{expiresIn : JWT_EXPIRY});
    
    console.log("TOKEN Generate : ",token);

    return token;
}

module.exports = authService;