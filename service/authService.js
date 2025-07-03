const { findUser } = require("../repository/userRepository")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

async function authService(authDetails){
    console.log("AuthService called and the details go to findOne user....")
    emailDetails = authDetails.email,
    plainPassword = authDetails.password

    // 1. Check if the Registered user with this given email exists or not ?
    console.log(emailDetails);
    console.log(plainPassword);
    const user = await findUser(emailDetails);

    if(!user){
        throw{reason : "User Not Found with this email ",statusCode : 404};
    }
    // 2. if user found with this email then....
    // We need to compare the plainIncomingPassword with hashpassword(in db)....
    const isVaildPassword = bcrypt.compare(plainPassword,user.password);

    if(!isVaildPassword){
        throw{reason : "Invalid Password ,please try again later....", statusCode : 401};
    }
    // 3. if the password is validate then we will generate the token for user so that they can login again in the platform....
    const token = jwt.sign({
        email : user.email , id : user._id 
    },Secret_Key ,{expiresIn : JWT_EXPIRY});
    
    return token;
}

module.exports = authService;