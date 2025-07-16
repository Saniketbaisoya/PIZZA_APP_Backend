const AppError = require("./appError.js");


class BadRequestError extends AppError{
    constructor(invalidParams){
        let message = "";

        invalidParams.forEach(params => message+= `${params}\n`);

        super(`The request has the following invalid parameters`,404);
    }
}

module.exports = BadRequestError;