// Now hmne Error jo ki ek object hai usse hmne ek class AppError mai store krdiya and then ab kyuki uss Error property mai ek message or statusCode ki property hoti hai,
// isliye class AppError ka constructor call krke hmne messsage or statusCode ko Error ke message property mai add krdiya but statusCode ko super kiya hai.... 
// And then usko exports krdiya hmne sbhi bahar ke files ke liye....

class AppError extends Error{
    constructor(message,statuCode){
        super(message);
        this.statusCode = statuCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;