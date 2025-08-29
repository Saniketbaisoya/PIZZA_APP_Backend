const  {findUser} = require('../repository/userRepository');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");
// const { Secret_Key, JWT_EXPIRY } = require("../configuration/serverConfig");

async function authService(authDetails){
    const email = authDetails.email;
    const plainPasswordToCheck = authDetails.password;

    // 1. Check if the Registered user with this given email exists or not ?

    const user = await findUser({ email });
    if(!user){
        throw{message : "No user found with the given email",statusCode : 404};
    }
    const hashedPasswordOnStorage = user.password;
    // 2. if user found with this email then....
    // We need to compare the plainIncomingPassword with hashpassword(in db)....
    const isPasswordValidated = await bcrypt.compare(plainPasswordToCheck, hashedPasswordOnStorage);

    if(!isPasswordValidated){
        throw {message : "Invalid Password, please try again", statusCode : 401};
    }
    const userRole = user.role ? user.role : "USER";
    // 3. if the password is validate then we will generate the token for user so that they can login again in the platform....
    const token = jwt.sign({email : user.email , id : user._id, role : userRole} ,Secret_Key,{expiresIn : JWT_EXPIRY});
    return token;
}

async function authServiceForAdmin(authDetails){
    const email = authDetails.email;
    const plainPasswordToCheck = authDetails.password;
    const role = authDetails.role;

    // 1. Check if the Registered user with this given email exists or not ?

    const user = await findUser({ email , role});
    if( user.role == "USER" ){
        throw{message : "The User is not an ADMIN",statusCode : 401};
    }
    const hashedPasswordOnStorage = user.password;
    // 2. if user found with this email then....
    // We need to compare the plainIncomingPassword with hashpassword(in db)....
    const isPasswordValidated = await bcrypt.compare(plainPasswordToCheck, hashedPasswordOnStorage);

    if(!isPasswordValidated){
        throw {message : "Invalid Password, please try again", statusCode : 401};
    }
    // 3. if the password is validate then we will generate the token for user so that they can login again in the platform....
    const token = jwt.sign({email : user.email , id : user._id, role : user.role} ,Secret_Key,{expiresIn : JWT_EXPIRY});
    return token;
}

module.exports = {
    authService,
    authServiceForAdmin
};