const AppError = require("./appError");

class unauthorizedError extends AppError{
    constructor(){
        super(`User is not Authorized Properly...`,401);
    }
}
module.exports = unauthorizedError;
