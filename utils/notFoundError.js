const AppError = require("./appError");

// class NotFoundError extends AppError{

//     constructor(properties,resource){
//         let notFoundProperties = "";

//         properties.forEach(property => notFoundProperties += `${property}/n`);
//         super(`Not able to find Properties : ${notFoundProperties} for the resources ${resources}`,404);
//     }
// }
class NotFoundError extends AppError{

    constructor(resources){
        super(`Not able to find resources ${resources}`,404);
    }
}

module.exports = NotFoundError;