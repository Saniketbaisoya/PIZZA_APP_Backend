const  {findUser} = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

// const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

async function authService(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. Check if the Registered user with this given email exists or not ?

    const user = await findUser({email});
    if(!user){
        throw{message : "User Not Found with this email ",statusCode : 404};
    }
    // 2. if user found with this email then....
    // We need to compare the plainIncomingPassword with hashpassword(in db)....
    const isPasswordValidated = async function (plainPassword) {
        try {
            return await bcrypt.compare(plainPassword,user.password);
        } catch (error) {
            throw new Error('Password comparison failed');
        }
    }
    if(!isPasswordValidated){
        throw{message : "Invalid Password ,please try again later....", statusCode : 401};
    }
    const userRole = user.role || 'USER';
    // 3. if the password is validate then we will generate the token for user so that they can login again in the platform....
    const token = jwt.sign({email : user.email , id : user._id, role : userRole} ,Secret_Key,{expiresIn : JWT_EXPIRY});
    return token;
}

module.exports = authService;