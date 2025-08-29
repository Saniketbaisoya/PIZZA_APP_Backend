const jwt = require('jsonwebtoken');
const { Secret_Key } = require('../configuration/serverConfig');
const unauthorizedError = require('../utils/unAuthorizedError');

async function isLoggedIn(req,res,next){
    const token = req.cookies['token'];

    if(!token){
        return res.status(401).json({
            success : false,
            data : {},
            error : 'Not authenticated',
            message : 'Not Auth Token Provided'
        });
    }
    
    try { // token -> (email,_.id,role) yeah teeno property contain hai ab decoded variable main , now abb req jayegi
        const decoded = jwt.verify(token,Secret_Key);
        if(!decoded){
            throw new unauthorizedError();
        }
        // if you reached here that means the user is authenticated allow them to access the api...
        req.user = {
            email : decoded.email,
            id : decoded.id,
            role : decoded.role,
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success : false,
            data : {},
            error : "Not authenticated",
            message : "Invalid Token Provided"
            
        });
    }
}

/**
*  This function is checks if the authenticated user is 'USER' or 'ADMIN' ?
*  Because we will call isAdmin after isLoggedIn that's why we will recieve the user details
*/

function isAdmin(req,res,next){
    const loggedUser = req.user;
    if(loggedUser.role == "ADMIN"){
        next();
    }else{
        return res.status(401).json({
            success : false,
            data : {},
            message : "You are not authorized for this action",
            error : {
                statusCode : 401,
                message : "Unauthorized user for this action"
            }
        })
    }
    
}

module.exports = {
    isLoggedIn,
    isAdmin
};